import sys
sys.path.insert(0, '../deepfake_models/aasist/')
import inference
# from deepfake_models.aasist import inference
f = "/Users/user/capstone/deepfake_models/aasist/LA_E_1000147.flac"

def run_aasist(file_path):
    return inference.run_aasist(file_path=f)
