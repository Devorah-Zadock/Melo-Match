from pydub import AudioSegment
import numpy as np
import os

class LoadFile():

    def __init__(self):
        pass

    # Loading a file
    def load_file(self, str):
        """
        Load an audio file and split it into channels.

        :param str: string representing the path to the audio file
        :return: list of channels
        """
        # Get the full file path
        file_name = os.getcwd() + str
        # print(file_name)

        # Load the audio file using pydub and convert it to a numpy array
        audio_file = AudioSegment.from_file(file_name)
        audio_data = np.fromstring(audio_file.raw_data, np.int16)

        # Split the audio into channels
        channels = []
        for chn in range(audio_file.channels):
            channels.append(audio_data[chn::audio_file.channels])

        # Return the list of channels
        return channels