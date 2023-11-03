
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

from data_utils import (Dataset_ASVspoof2019_train,
                        Dataset_ASVspoof2019_devNeval, genSpoof_list)
from evaluation import calculate_tDCF_EER
from utils import create_optimizer, seed_worker, set_seed, str_to_bool
import numpy as np

device = torch.device("cpu")
# device = "cuda" if torch.cuda.is_available() else "cpu"
# print("Device: {}".format(device))
# if device == "cpu":
#     raise ValueError("GPU not detected!")

def get_model(model_config: Dict, device: torch.device):
    """Define DNN model architecture"""
    module = import_module("models.{}".format(model_config["architecture"]))
    _model = getattr(module, "Model")
    model = _model(model_config).to(device)
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


# fother = "26.-Boruto-OST-2-Virtue-_Growth-of-a-Child_.flac"
f_path = "LA_E_1000147.flac"
# model = get_model(config["model_config"], device)

def preprocess_file(file_path):
    X, _ = sf.read(file_path)
        # print(sf.info(str(self.base_dir / f"flac/{key}.flac")))
    X_pad = pad(X)
    x_inp = Tensor(X_pad)
    
# eval_set = Dataset_A SVspoof2019_devNeval(list_IDs=file_eval, base_dir=eval_database_path)
    single_audio_sample = np.expand_dims(x_inp, axis=0)
    return single_audio_sample





# print(sf.info(f_path))
# print(info.channels, info.samplerate, info.format, info.subtype, info.endian)
# print("x is shape iss",X.shape)
# X_pad = pad(X, 64600)
# print("padded",X_pad.shape)
# print(x_inp.shape)



# batch_score = (batch_out[:, 1]).data.cpu().numpy().ravel()

def run_aasist(file_path):
    model = get_model(config["model_config"], device)
    model.eval()
    single_audio_sample = preprocess_file(file_path)
    eval_loader = DataLoader(single_audio_sample,
                             batch_size=config["batch_size"],
                             shuffle=False,
                             drop_last=False,
                             pin_memory=True)
    for batch_x in eval_loader:
# # x_inp = x_inp.to(device)
        batch_x = batch_x.to(device)
        with torch.no_grad():
            print("i caleed")
            _, batch_out = model(batch_x)
            print(batch_out)
            batch_score = (batch_out[:, 1]).data.cpu().numpy().ravel()
            print(batch_score)
            return batch_score

print(run_aasist(f_path))



inference.py
Displaying inference.py.