







let term = '';
const updateTerm = () => {
    term = document.getElementById('searchTerm').value;
    // check term exist
    if (!term || term === '') {
        alert('Please enter a search term');
    } else {
        fetchSongs(term);
    }
}

const fetchSongs = (term) => {
    const url = `https://itunes.apple.com/search?term=${term}&entity=song`;
    const songContainer = document.getElementById('songs');
    while (songContainer.firstChild) {
        songContainer.removeChild(songContainer.firstChild);
    }
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const songs = data.results;
            if (songs.length === 0) {
                songContainer.textContent = 'No songs found';
                return;
            }
            songs.forEach(song => {
                const article = document.createElement('article');
                const artist = document.createElement('p');
                const songTitle = document.createElement('h4');
                const img = document.createElement('img');
                const audio = document.createElement('audio');
                const audioSource = document.createElement('source');

                artist.textContent = song.artistName;
                songTitle.textContent = song.trackName;
                img.src = song.artworkUrl100;
                audioSource.src = song.previewUrl;
                audio.controls = true;

                article.appendChild(img);
                article.appendChild(artist);
                article.appendChild(songTitle);
                article.appendChild(audio);
                audio.appendChild(audioSource);

                songContainer.appendChild(article);
            });
        })
        .catch(error => console.log('Request failed:', error))
}

const searchBtn = document.getElementById('searchTermBtn');
searchBtn.addEventListener('click', updateTerm);

document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] != event.target) {
            audio[i].pause();
        }
    }
}, true);

document.addEventListener('DOMContentLoaded', function () {
    const artistContainers = document.querySelectorAll('.artist');

    artistContainers.forEach(artist => {
        artist.addEventListener('click', function () {
            const artistName = this.querySelector('h3').textContent; // Get artist name from the <h3> element inside the artist container
            document.getElementById('searchTerm').value = artistName; // Set search term to the clicked artist's name
            document.getElementById('searchTermBtn').click(); // Trigger click event on the search button
        });
    });

    
});
