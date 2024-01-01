'''
Call the output value from other Python scripts as such:

from inference2 import lcnn_inference
output_value = lcnn_inference()

'''

import subprocess
import sys
import os

def get_eval_filename():
    eval_path = os.path.join('DATA', 'asvspoof2019_LA', 'eval')
    filenames = [os.path.splitext(file)[0] for file in os.listdir(eval_path) if file.endswith('.flac')]

    if not filenames:
        print("No audio files found in the eval folder.")
        return None

    # Assuming there's only one file in the eval folder
    return filenames[0]

def update_test_lst(filename):
    test_lst_path = os.path.join('DATA', 'asvspoof2019_LA', 'scp', 'test.lst')

    with open(test_lst_path, 'w') as test_lst:
        test_lst.write(f'{filename}\n')

def update_protocol_txt(filename):
    protocol_txt_path = os.path.join('DATA', 'asvspoof2019_LA', 'protocol.txt')

    with open(protocol_txt_path, 'r') as protocol_txt:
        lines = protocol_txt.readlines()

    # Check if the filename is already present in protocol.txt
    if any(filename in line for line in lines):
        print(f'{filename} already exists in protocol.txt. Skipping.')
        return

    # Append a new line with the required information
    with open(protocol_txt_path, 'a') as protocol_txt:
        protocol_txt.write(f'LA_0000 {filename} - A00 spoof\n')

if __name__ == "__main__":
    filename = get_eval_filename()

    if filename:
        update_test_lst(filename)
        update_protocol_txt(filename)
        # print("Files updated successfully.")


def lcnn_inference():
    cwd = r"D:\Documents\capstone\deepfake_models\lcnn\project\03-asvspoof-mega"

    # clear screen
    # if os.name == 'posix':
    #     # For UNIX-like systems (Linux, macOS)
    #     os.system('clear')
    # elif os.name == 'nt':
    #     # For Windows
    #     os.system('cls')

    # Run the shell script with Bash
    result = subprocess.run(['bash', 'inference.sh'], capture_output=True, text=True, cwd=cwd)

    # Check the return code to see if the command was successful
    if result.returncode == 0:
        output = result.stdout
        print(output)
        return output
    else:
        print("Error:", result.stderr)
        return None

## Not sure if the below is needed

if __name__ == "__main__":
    # Call the function
    output_value = lcnn_inference()

    # Now you can use the output_value as needed
    print("Output Value:", output_value)
