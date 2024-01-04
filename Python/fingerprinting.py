from spectrogram import Spectrogram
from peaks import Peaks
from hash import Hashes
from operator import itemgetter

class Createfingerprinting():
    spectrogram = Spectrogram()
    peaks = Peaks()
    hash = Hashes()

    def __init__(self):
        pass

    # Creates fingerprints
    def create_fingerprinting(self, channel):
        # Creates a spectrogram of the audio channel
        spectrogram = self.spectrogram.plot_spectrogram(channel)

        # Finds the peaks in the spectrogram
        peaks = self.peaks.get_peaks(spectrogram)

        # Generates hashes for the pairs of frequencies and time offsets in the peaks
        hashes = self.hash.get_hashes(peaks)

        # Sorts the peaks by time
        peaks.sort(key=itemgetter(1))

        # Returns the generated hashes
        return hashes