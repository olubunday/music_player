document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = new Audio();
    let currentSongIndex = 0;
    let isPlaying = false;
    let currentPressedButton = null;

    const playlistElement = document.getElementById('playlist');
    const nowPlayingElement = document.getElementById('nowPlaying');
    const playButton = document.getElementById('playButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const pauseButton = document.getElementById('pauseButton');
    const playbackButton = document.getElementById('playbackButton');
    const stopButton = document.getElementById('stopButton');
    const volumeControl = document.getElementById('volumeControl');

    volumeControl.addEventListener('input', function () {
        audioPlayer.volume = parseFloat(this.value);
    });

    function updatePlaylist(playlist) {
        playlistElement.innerHTML = '';
        playlist.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('playlist-item');
            listItem.textContent = song;
            listItem.addEventListener('click', () => playSong(index, playlist));
            playlistElement.appendChild(listItem);
        });
    }

    function playSong(index, playlist) {
        if (currentPressedButton) {
            currentPressedButton.classList.remove('pressed');
        }

        currentSongIndex = index;
        nowPlayingElement.textContent = playlist[index];
        audioPlayer.src = playlist[index];
        audioPlayer.play();
        isPlaying = true;

        currentPressedButton = playButton;
        currentPressedButton.classList.add('pressed');
    }

    playButton.addEventListener('click', () => {
        if (!isPlaying) {
            playSong(currentSongIndex, playlist);
        }
    });

    pauseButton.addEventListener('click', () => {
        audioPlayer.pause();
        isPlaying = false;
        removePressedClass();
        pauseButton.classList.add('pressed');
    });

    playbackButton.addEventListener('click', () => {
        audioPlayer.play();
        isPlaying = true;
        removePressedClass();
        playbackButton.classList.add('pressed');
    });

    stopButton.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        isPlaying = false;
        removePressedClass();
        stopButton.classList.add('pressed');
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        playSong(currentSongIndex, playlist);
        removePressedClass();
        prevButton.classList.add('pressed');
    });

    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        playSong(currentSongIndex, playlist);
        removePressedClass();
        nextButton.classList.add('pressed');
    });

    function removePressedClass() {
        const controlButtons = [playButton, prevButton, nextButton, pauseButton, playbackButton, stopButton];
        controlButtons.forEach(button => button.classList.remove('pressed'));
    }

    // Sample playlist data
    const playlist = [
        '/static/music/song1.mp3',
        '/static/music/song2.mp3',
        '/static/music/song3.mp3',
        '/static/music/song4.mp3',
        '/static/music/song5.mp3'
    ];

    updatePlaylist(playlist);
});
