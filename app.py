from flask import Flask, render_template, send_from_directory
from api import api_bp

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/music/<path:filename>')
def download_file(filename):
    return send_from_directory('static/music', filename, as_attachment=True)

if __name__ == '__main__':
    app.register_blueprint(api_bp)
    app.run(debug=True)
