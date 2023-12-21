from flask import Blueprint, jsonify
import os

api_bp = Blueprint('api', __name__)

def get_songs_data(directory='static/music'):
    songs = []
    try:
        # Join the current working directory with the specified directory
        path = os.path.join(os.getcwd(), directory)
        # List all files in the directory
        files = os.listdir(path)
        # Filter out non-MP3 files
        songs = [file for file in files if file.endswith('.mp3')]
    except Exception as e:
        print(f"Error while getting songs: {str(e)}")
    return songs


@api_bp.route('/songs', methods=['GET'])
def get_songs():
    directory = 'static/music'
    songs = get_songs_data(directory)
    return jsonify({'songs': songs})

