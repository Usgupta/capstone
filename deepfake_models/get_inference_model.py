#Add Inference Models here
from deepfake_models.inference_model import InferenceModel
import deepfake_models.aasist.inference as inference

inference_models = {}
aasist_model = InferenceModel("aasist", inference.run_aasist)
inference_models["aasist"] = aasist_model

def get_inference_model(name):
    if name in inference_models:
        return inference_models[name]