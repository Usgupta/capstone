## How to run

### Create venv

1. Navigate into this folder 
`cd capstone/deepfake_models/lcnn`

2. Create virtual environment
`conda env create -f env.yml`

3. Load environment
`conda activate pytorch-1.7-lcnn`

### Changing filepath in PYTHONPATH

1. Navigate to env.sh
`cd capstone/deepfake_models/lcnn/env.sh`

2. Replace this part of lines 8-12 with the local path
`/d/Documents/`

### Replacing the audio file

1. Navigate to the audio file in this folder and replace it with the file for inference
`cd capstone\deepfake_models\lcnn\project\03-asvspoof-mega\DATA\asvspoof2019_LA\eval`

### Running the model

1. Navigate to 03-asvspoof-mega folder
`cd capstone/deepfake_models/lcnn/03-asvspoof-mega`

2. Run the model and observe the inference score
   `python inference.py`

3. You can call that output value from other python files using this code
`from inference import lcnn_inference`
`output_value = lcnn_inference()`