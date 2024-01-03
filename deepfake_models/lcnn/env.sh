#!/bin/bash
# if necessary, load conda environment
# eval "$(conda shell.bash hook)"
# conda activate pytorch-1.7-lcnn

# when running in ./projects/*/*, add this top directory to python path

export PYTHONPATH=/d/Documents/capstone/deepfake_models/lcnn/:\
/d/Documents/capstone/deepfake_models/lcnn/project/:\
/d/Documents/capstone/deepfake_models/lcnn/core_scripts/:\
/d/Documents/capstone/deepfake_models/lcnn/project/03-asvspoof-mega/lfcc-lcnn-lstmsum-p2s/01/:\
/d/Documents/capstone/deepfake_models/lcnn/project/03-asvspoof-mega/lfcc-lcnn-lstmsum-p2s/01/__pretrained/:$PYTHONPATH



# If attempting relative paths, use this instead:

# echo $PWD 

# export PYTHONPATH=$PWD/../../../:\
#     $PWD/../../:\
#     $PWD/../lfcc-lcnn-lstmsum-p2s/01/:\
#     $PWD/../../../core_scripts/:\
#     $PWD/../lfcc-lcnn-lstmsum-p2s/01/__pretrained/$PYTHONPATH
