#!/bin/bash
# if necessary, load conda environment
eval "$(conda shell.bash hook)"
conda activate pytorch-1.7

# when running in ./projects/*/*, add this top directory
# to python path
export PYTHONPATH=/d/Documents/capstone-lcnn/project-NN-Pytorch-scripts/:\
/d/Documents/capstone-lcnn/project-NN-Pytorch-scripts/project/:\
/d/Documents/capstone-lcnn/project-NN-Pytorch-scripts/project/03-asvspoof-mega/lfcc-lcnn-lstmsum-p2s/01/:\
/d/Documents/capstone-lcnn/project-NN-Pytorch-scripts/project/03-asvspoof-mega/lfcc-lcnn-lstmsum-p2s/01/__pretrained/$PYTHONPATH

