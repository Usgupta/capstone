import soundfile as sf
f = "/Users/usg1103/Downloads/capstone/deepfake_models/aasist/LA_E_1000147.flac"
f1 = "sample3.flac"
sound_info = sf.info(f)
# if((sound_info.duration)>4):
# import soundfile as sf


import numpy as np

def chop_audio(input_file, output_dir):
    # Read the audio file
    data, sr = sf.read(input_file)
    print(sf.info(input_file).name)

    # Check if the audio file is less than or equal to 4 seconds
    if len(data) / sr <= 4:
        print("Audio file is less than or equal to 4 seconds. Skipping...")
        return

    # Calculate the maximum number of slices
    max_slices = 10

    # Calculate the minimum and maximum slice duration
    min_slice_duration = 4  # Minimum slice duration in seconds
    max_slice_duration = 8  # Maximum slice duration in seconds (unless audio is longer than 70 seconds)

    # Calculate the total duration of the audio
    total_duration = len(data) / sr

    # Determine the actual slice duration based on the audio duration
    if total_duration <= 70:
        slice_duration = max_slice_duration
    else:
        slice_duration = total_duration / max_slices

    # Calculate the number of slices
    num_slices = int(np.ceil(total_duration / slice_duration))
    num_slices = min(num_slices, max_slices)  # Limit the number of slices to 10

    # Calculate the start and end indices of each slice
    start_indices = np.linspace(0, len(data), num_slices + 1, dtype=int)

    # Chop the audio file into slices
    for i in range(num_slices):
        start = start_indices[i]
        end = start_indices[i + 1]

        slice = data[start:end]

        # Ensure the slice duration is within the acceptable range
        if len(slice) / sr < min_slice_duration:
            # Merge the current slice with the next slice
            next_slice = data[end:start_indices[i + 2]]
            slice = np.concatenate((slice, next_slice))

            # Update the end index
            end = start_indices[i + 2]

        # Save the slice to a FLAC file
        output_file = f"{output_dir}/slice_{i + 1}.flac"
        sf.write(output_file, slice, sr, format='flac')

# if __name__ == '__main__':
#     input_file = "input.flac"  # Path to the input audio file
#     output_dir = "output"  # Output directory for sliced audio files

#     chop_audio(input_file, output_dir)

input_file = "your_input_audio.wav"
output_directory = "output_slices"
# chop_audio(input_file, output_directory)
chop_audio("output_slices/slice_1.flac",output_directory)
