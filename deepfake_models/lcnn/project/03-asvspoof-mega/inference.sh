#!/bin/bash
######################################################

#
# Usage:
#   $: bash inference.sh
#
# You may also run this script in background
#   $: bash 00_demo.sh lfcc-lcnn-lstmsum-p2s/01 > log_batch 2>$1 &
#   Then you can quit the terminal ($: exit) and let the job run
#   You will find the results in file log_batch
#
# This script will
#  2. run pre-trained model on ASVspoof2019 LA evalset,
#     calculate EER

######################################################

RED='\033[0;32m'
NC='\033[0m'

##############
# Configurations
#  environment config file in github repo
#  You may need to load conda environment in this env.sh
ENVFILE=$PWD/../../env.sh

# a wrapper to run EER and min-tDCF, given scores by the model
# EVALSCRIPT=$PWD/02_evaluate.py

# script of main.py (used by all the models)
# MAINSCRIPT=$PWD/01_main.py
# MAINSCRIPT_RAWNET=$PWD/01_main_rawnet.py
# # configuration to run the model (shared by all the models)
# CONFIGSCRIPT=$PWD/01_config.py
# CONFIGSCRIPT_RAWNET=$PWD/01_config_rawnet.py

# download link for pre-trained models
#  don't change these
# MODELNAME=project-03-asvspoof-mega-pretrained.tar.gz
# MODELLINK=https://zenodo.org/record/6456692/files/${MODELNAME}
# MD5SUMVAL=ff1ce800fb14b3ed0f5af170925dfbbc
########

#############
# setup PYTHONPATH and conda
#  this ENVFILE must be accessed inside a folder
mkdir __tmp
cd __tmp
source ${ENVFILE}
cd ..
rm -r __tmp

# go to the model directory
# MODEL=$1
MODEL=lfcc-lcnn-lstmsum-p2s/01
cd ${MODEL}

#############
# Run pre-trained model, compute EER
# echo -e "\n${RED}=======================================================${NC}"
# echo -e "${RED}Step2. run pre-trained ${MODEL} on eval set using your GPU server${NC}"
# echo -e "The job will run in background for ~20 minutes. Please wait."
# echo -e "(Model ${MODEL} was trained on NII's server.)"

# # Extract the desired value AND save a log file
# LOGFILE=log_inference
# python inference_wrapper.py --inference --model-forward-with-file-name --trained-model __pretrained/trained_network.pt > ${LOGFILE} 2>${LOGFILE}_err
# VALUE=$(grep 'Output,' ${LOGFILE} | awk -F ', ' '{print $4}')

# # Extract the desired value without saving a log file
VALUE=$(python inference_wrapper.py --inference --model-forward-with-file-name \
--trained-model __pretrained/trained_network.pt | grep 'Output,' | awk -F ', ' '{print $4}')

# Print the extracted value
echo "Extracted Score: ${VALUE}"


#############
# echo -e "\n${RED}This is the result using pre-trained model on your GPU ${NC}"
# python ${EVALSCRIPT} ${LOGFILE}

exit 
