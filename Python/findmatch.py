import pyodbc
import time

class FindMatch():

    def __init__(self):
        pass

    def find_match(self):
        # Establish a connection to a SQL Server database
        conn = pyodbc.connect("DRIVER={SQL Server Native Client 11.0};SERVER=DEVORAH\SQLEXPRESS;DATABASE=SongFingerprinting;Trusted_Connection=yes;")

        # Create a cursor object to execute SQL queries
        cursor = conn.cursor()

        # Call a stored procedure to find a match in the database
        cursor.execute("{CALL get_match()}")
        # Commit the transaction
        conn.commit()

        # Call a stored procedure to get the result of the matching process
        cursor.execute("{CALL results()}")
        # Fetch the first row of the result set
        row = cursor.fetchone()

        # rows = cursor.fetchall()
        # for r in rows:
        #     print(r[0])

        # Initialize variables to hold the result data
        song_id = 0
        song_name = "No matching songs found."

        # If the result set is not empty, extract the song ID, start time difference, and song name
        if row is not None:
            song_id = row[0]
            start_time_diff = row[1]
            cursor.execute("{CALL get_name()}")
            song = cursor.fetchone()
            song_name = song[0]
            print("song_id:", song_id, "\nstart_time_diff:", start_time_diff, "\nsong name:", song_name)
        else:
            # If the result set is empty, set the song name to a default value
            print(song_name)

        # Call a stored procedure to delete the result data from the database
        cursor.execute("{CALL delete_results()}")
        # Commit the transaction
        conn.commit()

        # Close the cursor object
        cursor.close()
        # Close the database connection
        conn.close()

        # Return the name of the matching song, or the default value if no match was found
        return song_name
