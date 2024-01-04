from matplotlib import mlab
from matplotlib import pyplot as plt
import numpy as np

class Spectrogram():

    def __init__(self):
        pass


    def plot_spectrogram(self, channel):
        """
        Plots the spectrogram of the given audio channel.

        :param channel: audio channel data
        :return: spectrogram data
        """
        window_size = 2**12
        window_overlap = int(window_size*0.5)
        dfreq = 44100

        # Generate the spectrogram
        spectrogram = mlab.specgram(channel,
                                    NFFT=window_size,
                                    Fs=dfreq,
                                    noverlap=window_overlap
                                    )

        # Convert the amplitude values to decibels
        spec = spectrogram[0]
        spec = 10 * np.log10(spec, out=np.zeros_like(spec), where=(spec != 0))

        # Display the spectrogram plot
        self.view_spectrogram(spec)

        # Return the spectrogram data
        return spec


    def view_spectrogram(self, spec):
        """
        Displays the given spectrogram data as an image.

        :param spec: spectrogram data
        """
        # Create a new figure and display the spectrogram using imshow
        fig, axes = plt.subplots()
        axes.imshow(spec)

        # Set the x-axis label, y-axis label, and plot title
        axes.set_xlabel('time')
        axes.set_ylabel('freq')
        axes.set_title('spec')

        # Invert the y-axis to match the standard spectrogram orientation
        plt.gca().invert_yaxis()
        # plt.show()