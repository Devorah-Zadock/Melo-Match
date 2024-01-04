import pandas as pd
import hashlib

class Hashes():

    def __init__(self):
        pass

    hash_func = lambda freq1, freq2, offset: hashlib.sha1(
        f"{str(freq1)}|{str(freq2)}|{str(offset)}".encode('utf-8')).hexdigest()[:25]
    """
    A lambda function that returns a hash of the concatenated frequencies and offset.
    The hash function returns the first 25 characters of the SHA-1 hash of the concatenated frequencies and offset, encoded in UTF-8.
    The returned hash is used to identify the unique pairs of frequencies and offsets.
    """

    # Extracts peaks and creates a frequency table
    def get_hashes(self, peaks, peak_combination = 5):
        """
        Generates a table of frequency links between the given list of peaks.

        :param peaks: list of peaks
        :param peak_combination: number of peak pairs to combine
        :return: table of frequency links
        """
        freq_links = []

        # Iterate through pairs of peaks
        for i in range(len(peaks)):
            # Iterate 5 times
            for j in range(1, peak_combination):
                if (i + j) < len(peaks):
                    # Add the frequency for each pair
                    freq1 = peaks[i][0]
                    # Add the frequency for pairs that appear after it up to 5 pairs ahead
                    freq2 = peaks[i + j][0]
                    # Add the time for each pair
                    t1 = peaks[i][1]
                    # Add the time for pairs that appear after it up to 5 pairs ahead
                    t2 = peaks[i + j][1]
                    # Calculate the time difference
                    t_delta = t2 - t1
                    freq_links.append((freq1, t1, freq2, t2, t_delta))
        # Create a table for the generated list
        freq_links = pd.DataFrame(freq_links, columns=['freq1', 'time1', 'freq2', 'time2', 'offset'])
        # Check validity
        freq_links = freq_links[(freq_links.offset >= 0) & (freq_links.offset < 100)].reset_index(drop=True)
        freq_links['hash_code'] = freq_links.apply(lambda x: Hashes.hash_func(x['freq1'], x['freq2'], x['offset']), axis=1)
        return freq_links
