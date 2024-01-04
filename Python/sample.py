import pandas as pd
from loadfile import LoadFile
from fingerprinting import Createfingerprinting
from findmatch import FindMatch
from insertdata import InsertData
from melomatch import MeloMatch
import csv
import pyodbc
import sqlalchemy as db

class Sample():

    def __init__(self):
        pass

    def create_sample(self, audio_file_path):
        file = LoadFile()
        fingerprint = Createfingerprinting()
        insertdata = InsertData()
        findmatch = FindMatch()
        melomatch = MeloMatch()

        sample_channels = file.load_file(audio_file_path)
        sample_hash_df = pd.DataFrame(columns=['freq1', 'time1', 'freq2', 'time2', 'offset', 'hash_code'])

        # Create fingerprints for each channel of the audio file
        for channel in sample_channels:
            sample_hashes = fingerprint.create_fingerprinting(channel)
            sample_hash_df = sample_hash_df.append(sample_hashes)

        # Drop columns that aren't needed and remove duplicate entries
        sample_hash_df = sample_hash_df.drop(columns=['freq1', 'freq2', 'time2', 'offset'])
        sample_hash_df = sample_hash_df.drop_duplicates(subset=['time1', 'hash_code'])
        sample_hash_df.reset_index(drop=True, inplace=True)

        sample_hash_df.to_csv('sample_hash_df.csv')

        song_name = melomatch.melo_match()

        # insertdata.insert_sample(sample_hash_df)

        # Search for matches in the database
        # song_name = findmatch.find_match()
        return song_name
