
import argparse
import json
import os
import sys
import warnings
from importlib import import_module
from pathlib import Path
from shutil import copy
from typing import Dict, List, Union
import soundfile as sf
import torch
from torch import Tensor
import torch.nn as nn
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter
from torchcontrib.optim import SWA
import numpy as np
import sys
import numpy as np
from deepfake_models.aasist import models
import deepfake_models.aasist.models.AASIST as aasist
device = torch.device("cpu")

model_path= "../../deepfake_models/aasist/models/weights/AASIST.pth"

# model.load_state_dict(
            # torch.load(config["model_path"], map_location=device))

def get_model(model_config: Dict, device: torch.device):
    """Define DNN model architecture"""
    module = aasist
    # module = import_module("models.{}".format(model_config["architecture"]))
    _model = getattr(module, "Model")
    model = _model(model_config).to(device)
    model.load_state_dict(torch.load(model_path, map_location=device))
    nb_params = sum([param.view(-1).size()[0] for param in model.parameters()])
    print("no. model params:{}".format(nb_params))

    return model

config = { "database_path": "./LA/",
    "asv_score_path": "ASVspoof2019_LA_asv_scores/ASVspoof2019.LA.asv.eval.gi.trl.scores.txt",
    "model_path": "./models/weights/AASIST.pth",
    "batch_size": 24,
    "num_epochs": 100,
    "loss": "CCE",
    "track": "LA",
    "eval_all_best": "True",
    "eval_output": "eval_scores_using_best_dev_model.txt",
    "cudnn_deterministic_toggle": "True",
    "cudnn_benchmark_toggle": "False",
    "model_config": {
        "architecture": "AASIST",
        "nb_samp": 64600,
        "first_conv": 128,
        "filts": [70, [1, 32], [32, 32], [32, 64], [64, 64]],
        "gat_dims": [64, 32],
        "pool_ratios": [0.5, 0.7, 0.5, 0.5],
        "temperatures": [2.0, 2.0, 100.0, 100.0]
        }
        }

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


def get_confidence(score, threshold, k=1):
    diff = score - threshold
    confidence = 1 / (1 + np.exp(-k * diff))

    # Assign a confidence percentage to each category
    if score >= threshold:
        true_confidence = confidence
    else:
        true_confidence = 1 - confidence

    return true_confidence*100
    

def preprocess_file(file_path):
    X, _ = sf.read(file_path)
    X_pad = pad(X)
    x_inp = Tensor(X_pad)
    single_audio_sample = np.expand_dims(x_inp, axis=0)
    return single_audio_sample

def run_aasist(file_path):
    print(file_path)
    model = get_model(config["model_config"], device)
    model.eval()
    single_audio_sample = preprocess_file(file_path)
    eval_loader = DataLoader(single_audio_sample,
                             batch_size=config["batch_size"],
                             shuffle=False,
                             drop_last=False,
                             pin_memory=True)
    for batch_x in eval_loader:
        batch_x = batch_x.to(device)
        with torch.no_grad():
            _, batch_out = model(batch_x)
            batch_score = (batch_out[:, 1]).data.cpu().numpy().ravel()
            print("the score is", batch_score.tolist())
            print("the score is", batch_score[0])
            confidence = get_confidence(batch_score[0], threshold)
            if batch_score > threshold:
                return "Fake", confidence
            else:
                return "Real", confidence
            
# run_aasist('LA_E_243156.flac')