import sqlalchemy as db
import urllib
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker
import pandas as pd


class InsertData():
    # Creating a basic engine and connecting to a database
    quoted = urllib.parse.quote_plus("DRIVER={SQL Server Native Client 11.0};SERVER=DEVORAH\SQLEXPRESS;DATABASE=SongFingerprinting;Trusted_Connection=yes;")
    engine = db.create_engine('mssql+pyodbc:///?odbc_connect={}'.format(quoted))
    conn = engine.connect().execution_options(isolation_level='READ UNCOMMITTED')

    # Create a session with the database
    Session = sessionmaker(bind=engine)
    session = Session()

    def __init__(self):
        pass

    # Function for inserting fingerprints into SQL
    def insert_fingerprintings(self, df):
        df.to_sql('fingerprinting', schema='dbo', con=self.engine, chunksize=200, method='multi', index=False, if_exists='append')

    # Function for inserting a song object into SQL and returning its id
    def insert_song(self, song):
        # Saving the object to the database
        self.session.add(song)
        self.session.commit()
        self.session.refresh(song)
        return song.song_id

    # Function for finding a match in the database based on a sample's fingerprints
    def insert_sample(self, sample_hash_df):
        sample_hash_df.to_sql('sample_hash_temp', self.engine, if_exists='replace', index=False)

    # def get_fingerprintings(self):
    #     sql = "SELECT * FROM fingerprinting"
    #     df = pd.read_sql(sql, con=self.engine)
    #     return df
    #
    # def get_sample_fingerprint(self):
    #     sql = "SELECT * FROM sample_hash_temp"
    #     df = pd.read_sql(sql, con=self.engine)
    #     return df
