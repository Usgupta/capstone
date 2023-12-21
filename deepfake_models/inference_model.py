class InferenceModel:
    def __init__(self, name, inference_function):
        self.name = name
        self.inference_function = inference_function

    def run(self, file_path):
        return self.inference_function(file_path)
