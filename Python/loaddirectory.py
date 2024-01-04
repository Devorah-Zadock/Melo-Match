import os
import shutil

import pandas as pd
from loadfile import LoadFile
from fingerprinting import Createfingerprinting
from song import Song
from insertdata import InsertData
from mutagen.mp3 import MP3
from flask import request

class LoadDirectory():

    def __init__(self):
        pass
    # Function to load all the mp3 files in a directory and generate their hashes
    def load_directory(self, path):
        flag = True
        hash_df = pd.DataFrame(columns=['song_id', 'freq1', 'time1', 'freq2', 'time2', 'offset', 'hash_code'])
        file = LoadFile()
        fingerprint = Createfingerprinting()
        insertdata = InsertData()

        for file_name in os.listdir(path):

            if file_name.endswith('.mp3'):
                mp3 = './mp3/'
                os.makedirs(mp3, exist_ok=True)
                file_path = os.path.join(path, file_name)
                destination_path = os.path.join(mp3, file_name)
                shutil.copyfile(file_path, destination_path)

                song_name = file_name[:-4]
                audio = MP3(os.path.join(path, file_name))
                artist_name = audio['TPE1'].text[0] if 'TPE1' in audio else ''
                album_name = audio['TALB'].text[0] if 'TALB' in audio else ''
                genre = audio['TCON'].text[0] if 'TCON' in audio else ''
                duration = audio.info.length if audio.info.length is not None else 0.0
                year_of_publication_str = audio['TDRC'].text[0] if 'TDRC' in audio else ''
                year_of_publication = int(str(year_of_publication_str)) if str(year_of_publication_str).isdigit() else 0
                song = Song(song_name=song_name, artist_name=artist_name, album_name=album_name, genre=genre, duration=duration, year_of_publication=year_of_publication)
                song_id = insertdata.insert_song(song)
                print(f'Started reading file: {song_name} ...')
                channels = file.load_file(os.path.join(path, file_name))
                for channel in channels:
                    hashes = fingerprint.create_fingerprinting(channel)
                    hashes.loc[:, 'song_id'] = song_id
                    hash_df = hash_df.append(hashes)
                insertdata.insert_fingerprintings(hash_df)
                print(f'Completed reading file: {song_name} ...\n')
            else:
                flag = False
                return flag
        hash_df = hash_df.drop_duplicates(subset=['song_id', 'time1', 'hash_code'])
        hash_df.reset_index(drop=True, inplace=True)
        hash_df = hash_df[['song_id', 'freq1', 'time1', 'freq2', 'time2', 'offset', 'hash_code']]
        # hash_df.to_csv('hash_df.csv')
        hash_df.to_csv('hash_df.csv', mode='a', header=False)
        return flag
