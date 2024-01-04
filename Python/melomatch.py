import pyodbc
import csv
import pandas as pd
import asyncio

class MeloMatch():
    def __init__(self):
        self.conn = pyodbc.connect("DRIVER={SQL Server Native Client 11.0};SERVER=DEVORAH\SQLEXPRESS;DATABASE=SongFingerprinting;Trusted_Connection=yes;")
        pass

    # def read_sql_async(self, stmt, con):
    #     loop = asyncio.get_event_loop()
    #     return loop.run_in_executor(None, pd.read_sql, stmt, con)

    def melo_match(self):
        try:
            cursor = self.conn.cursor()

            hash_df = pd.read_csv("hash_df.csv")
            sample_hash_df = pd.read_csv("sample_hash_df.csv")

            matches = []

            # Iterate over unique song IDs in hash DataFrame
            for sid in hash_df.song_id.unique():

                # Filter hash DataFrame for the current song ID
                temp_hash_df = hash_df[hash_df.song_id == sid]

                # Merge hash DataFrame and sample hash DataFrame based on "hash_code" column
                merge_df = temp_hash_df.merge(sample_hash_df, on='hash_code', suffixes=('_o', '_s'))

                # Compute the difference in start times between matched hashes and add it as a new column
                merge_df['start_time_diff'] = merge_df.apply(lambda x: x['time1_o'] - x['time1_s'], axis=1)

                # Count the number of hashes matched between hash DataFrame and sample hash DataFrame
                hashes_matched = temp_hash_df[temp_hash_df.hash_code.isin(sample_hash_df.hash_code.unique())].shape[0]
                try:
                    # Find the most common start time difference among matched hashes
                    match_time = merge_df['start_time_diff'].value_counts().index[0]

                    # Count the number of matches at the most common start time difference
                    matches_at_match_time = merge_df['start_time_diff'].value_counts().iloc[0]
                except KeyError:
                    # Handle the case where no start time difference values are present
                    match_time = 'Error 404'
                    matches_at_match_time = 'Error 404'

                # Append song ID, number of matches, match time, and matches at match time to matches list
                matches.append((sid, hashes_matched, match_time, matches_at_match_time))

            song_id = sorted(matches, key=lambda x: x[1], reverse=True)[0][0]

            query = "SELECT song_name FROM song WHERE song_id = ?"
            song_id = int(song_id)
            cursor.execute(query, (song_id,))

            song_name = cursor.fetchone()[0]

            return song_name

        except Exception as e:
            print("Error retrieving song_name from the database:", e)
            return None
