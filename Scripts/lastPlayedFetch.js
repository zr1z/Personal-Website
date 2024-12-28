document.addEventListener("DOMContentLoaded", function() {

function fetchTrackData() {
fetch(`lastfm-api-url`)
    .then(response => response.json())
    .then(data => {
        const tracks = data.recenttracks.track;
        const trackListContainer = document.getElementById('track-list');
        trackListContainer.innerHTML = ''; 

        tracks.forEach(track => {

            // Track Item, New Box
            const trackItem = document.createElement('div');
            trackItem.className = 'track-item';

            // Track Art Image
            const trackArt = document.createElement('img');
            trackArt.src = track.image[2]['#text'];
            trackArt.alt = 'Album Art';
            trackItem.appendChild(trackArt);

            // Track Details
            const trackDetails = document.createElement('div');
            trackDetails.className = 'details';

            // Track Title
            const trackTitle = document.createElement('p');
            trackTitle.className = 'track-title';
            trackTitle.textContent = track.name;

            // Track Artist
            const trackArtist = document.createElement('p');
            trackArtist.className = 'track-artist';
            trackArtist.textContent = track.artist['#text'];

            // Set/Append The Child
            trackDetails.appendChild(trackTitle);
            trackDetails.appendChild(trackArtist);
            trackItem.appendChild(trackDetails);
            trackListContainer.appendChild(trackItem);
        });
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
        document.getElementById('track-list').innerHTML = '<p>Error Loading Track Info</p>';
    });
    }

    fetchTrackData();

    setInterval(fetchTrackData, 20000); // 20 Seconds
});
