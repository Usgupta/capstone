import argparse
import numpy as np
from tqdm import tqdm
import torch
from torch.nn import functional as F
from models.model import Network
from utils.utils import Genotype
import numpy as np
import torch.utils.data as data
import librosa

# Class to read and convert audio data
class AudioFile(data.Dataset):
    """
    Class to read and convert audio data for the model to process.

    Params:
        filepath: path to the single audio file 
        is_rand: start at a random point in the audio file
    """
    def __init__(self, filepath, is_rand=False):
        super(AudioFile, self).__init__()
        self.is_rand = is_rand
        self.filepath = [filepath]
        
    # Read the audio data 
    def load_feature(self, feature_path):
        """
        Read the audio file using librosa and convert it to a numpy array
        """
        feature, sr = librosa.load(feature_path, sr=16000)
        fix_len = sr*4
        REPEATED = False
        while feature.shape[0] < fix_len:
            feature = np.concatenate((feature, feature))
            REPEATED = True
        if self.is_rand and not REPEATED:
            total_length = feature.shape[0]
            start = np.random.randint(0, total_length - fix_len + 1)
            feature = feature[start:start+fix_len]
        else:
            feature = feature[:fix_len]

        return feature

    def __getitem__(self, index):
        feature = self.load_feature(self.filepath[0])
        return feature
    
    def __len__(self):
        return len(self.filepath)

if __name__ == '__main__':
    parser = argparse.ArgumentParser('ASVSpoof2019 model')
    parser.add_argument('filename', type=str,
                    help='location of the audio file')
    parser.add_argument('--data', type=str, default='/path/to/your/data', 
                    help='location of the data corpus')   
    parser.add_argument('--model', type=str, default='./pretrained/fix_mel.pth')
    parser.add_argument('--layers', type=int, default=8)
    parser.add_argument('--init_channels', type=int, default=64)
    parser.add_argument('--gru_hsize', type=int, default=1024)
    parser.add_argument('--gru_layers', type=int, default=3)
    parser.add_argument('--sinc_scale', type=str, default='mel', help='the ytpe of sinc layer')
    parser.add_argument('--sinc_kernel', type=int, default=128)
    parser.add_argument('--batch_size', type=int, default=64)
    parser.add_argument('--sr', type=int, default=16000, help='default sampling rate')
    parser.add_argument('--arch', type=str, help='the searched architecture', default="Genotype(normal=[('dil_conv_5', 1), ('dil_conv_3', 0), ('dil_conv_5', 1), ('dil_conv_5', 2), ('std_conv_5', 2), ('skip_connect', 3), ('std_conv_5', 2), ('skip_connect', 4)], normal_concat=range(2, 6), reduce=[('max_pool_3', 0), ('std_conv_3', 1), ('dil_conv_3', 0), ('dil_conv_3', 2), ('skip_connect', 0), ('dil_conv_5', 2), ('dil_conv_3', 0), ('avg_pool_3', 1)], reduce_concat=range(2, 6))")
    parser.add_argument('--comment', type=str, default='rawpc')
    parser.add_argument('--eval', type=str, default='e', help='to use eval or dev')
    parser.set_defaults(is_mask=False)
    parser.set_defaults(is_trainable=False)

    # Check if CUDA is available, otherwise use CPU
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    
    # Get the command line arguments
    args = parser.parse_args()
    
    # Load and setup the pretrained model for inference
    checkpoint = torch.load(args.model, map_location=device)  # Map the model to CPU
    genotype = eval(args.arch)
    OUTPUT_CLASSES = 2
    model = Network(args.init_channels, args.layers, args, OUTPUT_CLASSES, genotype)
    model.drop_path_prob = 0.0
    # model = model.cuda()  # Remove this line as we are using CPU
    model.load_state_dict(checkpoint)

    
    # Convert single audio clip to AudioFile object
    audiofile = AudioFile(args.filename)
    
    eval_loader = torch.utils.data.DataLoader(
        dataset=audiofile,
        batch_size=args.batch_size,
        num_workers=0,
        pin_memory=True,
        shuffle=False,
        drop_last=False,
    )
    
    model.eval()
    
    # Feed the audio data into the model and perform inference
    with torch.no_grad():
        for step, input in tqdm(enumerate(eval_loader)):
            input = input.to(device).float()
            # input = input.cuda(non_blocking=True).float()
            output = model(input)
            output = model.forward_classifier(output)
            prediction = F.relu(output) 
            classification = prediction[0].argmax().item()
            if classification == 0:
                print(f"Audio file is spoofed with a probability of {round(prediction[0][0].item()*100, 2)}%")
            else:
                print(f"Audio file is bonafide with a probability of {round(prediction[0][1].item()*100, 2)}%")