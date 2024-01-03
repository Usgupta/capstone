import os
import soundfile as sf
import torch
from torch import Tensor
from torch.utils.data import DataLoader
import numpy as np
import joblib
import yaml
from model import RawGAT_ST

# Set the device to CPU
device = torch.device("cpu")

# Load model configuration from YAML file
model_config_path = os.path.splitext('model_config_RawGAT_ST')[0] + '.yaml'
with open(model_config_path, 'r') as yaml_file:
    model_config = yaml.safe_load(yaml_file)

# Initialize and load the RawGAT-ST model
model_rawgat = RawGAT_ST(model_config['model'], device)
model_rawgat = model_rawgat.to(device)

pretrained_model_path = "Pre_trained_models/RawGAT_ST_mul/Best_epoch.pth"
model_rawgat.load_state_dict(torch.load(pretrained_model_path, map_location=device))

# Load logistic regression model for probability calculation
calc_prob_model = joblib.load('logistic_regression_aasist_calc_prob_model.joblib')

# Constants
MAX_AUDIO_LENGTH = 64600
THRESHOLD = -5.680051

def pad_audio(x, max_len=MAX_AUDIO_LENGTH):
    """Pad audio sequence to a specified length."""
    x_len = len(x)
    if x_len >= max_len:
        return x[:max_len]
    else:
        num_repeats = int(max_len / x_len) + 1
        padded_x = np.tile(x, (1, num_repeats))[:, :max_len][0]
        return padded_x

def get_confidence(score):
    """Calculate confidence level based on the prediction score."""
    prob = calc_prob_model.predict_proba(score.reshape(-1, 1))[:, 1][0]
    norm_threshold = 0.3888572108980983
    true_confidence = prob if prob >= norm_threshold else (1 - prob)
    return true_confidence * 100

def preprocess_file(file_path):
    """Preprocess audio file."""
    X, _ = sf.read(file_path)
    X_pad = pad_audio(X)
    x_inp = Tensor(X_pad)
    single_audio_sample = np.expand_dims(x_inp, axis=0)
    return single_audio_sample

def run_rawgatst(file_path):
    """Run RawGAT-ST model on the given audio file."""
    single_audio_sample = preprocess_file(file_path)
    
    eval_loader = DataLoader(single_audio_sample,
                             batch_size=8,
                             shuffle=False,
                             drop_last=False,
                             pin_memory=True)
    
    for batch_x in eval_loader:
        batch_x = batch_x.to(device)
        with torch.no_grad():
            batch_out = model_rawgat(batch_x)
            batch_score = batch_out[:, 1].data.cpu().numpy().ravel()
            confidence = get_confidence(batch_score)
            
            if batch_score > THRESHOLD:
                return "Fake", confidence
            else:
                return "Real", confidence

# Example usage
file_path = '/Users/usg1103/Downloads/capstone/deepfake_models/rawgat-st/LA_E_2431656.flac'
result, confidence = run_rawgatst(file_path)
print(f"Prediction: {result}, Confidence: {confidence}%")
