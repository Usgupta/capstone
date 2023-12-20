import os
import soundfile as sf
import torch
from torch import Tensor
from torch.utils.data import DataLoader
import numpy as np
import joblib


import yaml
from model import RawGAT_ST  # In main model script we used our best RawGAT-ST-mul model. To use other models you need to call revelant model scripts from RawGAT_models folder

device = torch.device("cpu")

#model 
dir_yaml = os.path.splitext('model_config_RawGAT_ST')[0] + '.yaml'

with open(dir_yaml, 'r') as f_yaml:
        parser1 = yaml.safe_load(f_yaml)

model_rawgat = RawGAT_ST(parser1['model'], device)
model_rawgat =(model_rawgat).to(device)

model_p = "Pre_trained_models/RawGAT_ST_mul/Best_epoch.pth"

model_rawgat.load_state_dict(torch.load(model_p,map_location=device))

calc_prob_model = joblib.load('logistic_regression_aasist_calc_prob_model.joblib')


def pad(x, max_len=64600):
    x_len = x.shape[0]
    if x_len >= max_len:
        return x[:max_len]
    # need to pad
    num_repeats = int(max_len / x_len) + 1
    padded_x = np.tile(x, (1, num_repeats))[:, :max_len][0]
    return padded_x

f_path = "LA_E_1000147.flac"
#obtained by running evaluation
threshold = -5.680051 


def get_confidence(score):
    print("scoe is",score)
    prob = calc_prob_model.predict_proba(score.reshape(-1, 1))[:, 1]
    print("prob is",prob)
    prob = prob[0]
    norm_threshold = 0.3888572108980983
    if prob >= norm_threshold:
        true_confidence = prob
    else:
        true_confidence = (1 - prob) 

    return true_confidence*100
    

def preprocess_file(file_path):
    X, _ = sf.read(file_path)
    X_pad = pad(X)
    x_inp = Tensor(X_pad)
    single_audio_sample = np.expand_dims(x_inp, axis=0)
    return single_audio_sample

def run_rawgatst(file_path):
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
            batch_score = (batch_out[:, 1]).data.cpu().numpy().ravel()
            # print("the score is", batch_score.tolist())
            # print("the score is", batch_score[0])
            confidence = get_confidence(batch_score[0])
            if batch_score > threshold:
                return "Fake", confidence
            else:
                return "Real", confidence
            

p = '/Users/usg1103/Downloads/capstone/deepfake_models/rawgat-st/LA_E_2431656.flac'
        
run_rawgatst(p)
