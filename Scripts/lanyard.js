const fetchId = "discordId"; // Your Discord User ID
const apiUrl = `https://api.lanyard.rest/v1/users/${fetchId}`;

let updateInterval;

const statusText = {
   online: 'Online',
   offline: 'Offline',
   idle: 'Idle',
   dnd: 'Do Not Disturb'
};

const statusColors = {
   online: '#57F287',
   offline: '#808080',
   idle: '#F0B232',
   dnd: '#ED4245'
};

function fetchAndUpdateStatus() {
   fetch(apiUrl)
   .then(response => response.json())
   .then(data => {
         if (data.success) {
            const discordData = data.data.discord_user;
            const discordUsername = discordData.username;
            const discordAvatar = discordData.avatar;

            const status = data.data.discord_status;
            const discordActivityText = statusText[status];
            const discordActivityColor = statusColors[status] || '#808080';
            const discordUsernameStatus = '#fff';

            // Set username, status, and avatar
            document.getElementById('discordUsernameStatus').innerHTML = `<b>${discordUsername}</b>`;
            document.getElementById('discordUsernameStatus').style.color = discordUsernameStatus;
            document.getElementById('discordStatusIndicator').style.backgroundColor = discordActivityColor;
            document.getElementById('discordStatusIndicator').setAttribute('data-status-text', discordActivityText);
            document.getElementById('discordAvatar').src = `https://cdn.discordapp.com/avatars/${fetchId}/${discordAvatar}.png`;

            const discordActivities = data.data.activities;
            // Find Activity 4
            const customStatusActivity = discordActivities.find(activity => activity.type === 4);

            if (customStatusActivity) {
               const customEmoji = customStatusActivity.emoji;
               const customEmojiHtml = customEmoji ? 
               `<div style="display: flex; align-items: center;">
                  <img src="https://cdn.discordapp.com/emojis/${customEmoji.id}.png" alt="${customEmoji.name}" style="width: 25px; height: 25px; margin-right: 5px;">
                  <span style="font-size: 14px; font-weight: bold; color: #888;">${customEmoji.name}</span>
               </div>` : '';

               const customText = customStatusActivity.state || 'No Current Status';

               document.getElementById('customStatus').innerHTML = `${customEmojiHtml} ${customText}`;
               document.getElementById('customStatusBox').style.display = 'block';

               // Hide the default activity box if custom status is shown
               document.getElementById('activityInfo').style.display = 'none';
            } else {
               // If there's no custom status, check if other activities exist
               const discordActivityData = discordActivities[0];

               if (discordActivityData) {
                  const activityName = discordActivityData.name;
                  const activityState = discordActivityData.state;
                  const activityDetails = discordActivityData.details;
                  const activityAssets = discordActivityData.assets;

                  // Only show non-Spotify activities
                  if (activityName !== 'Spotify') {
                     let largeImageSrc = '';

                     const largeImageElement = document.getElementById('largeImage');
                     const activityNameElement = document.getElementById('activityName');
                     const activityStateElement = document.getElementById('activityState');
                     const activityDetailsElement = document.getElementById('activityDetails');

                     if (activityAssets && activityAssets.large_image) {
                        if (activityAssets.large_image.startsWith('mp:external')) {
                           largeImageSrc = `https://media.discordapp.net/${activityAssets.large_image.replace("mp:", "")}`;
                        } else {
                           largeImageSrc = `https://cdn.discordapp.com/app-assets/${discordActivityData.application_id}/${activityAssets.large_image}.png`;
                        }
                        largeImageElement.src = largeImageSrc;
                        largeImageElement.style.display = '';
                     } else {
                        largeImageElement.style.display = 'none';
                     }

                     activityNameElement.innerText = activityName || '';
                     activityStateElement.innerText = activityState || '';
                     activityDetailsElement.innerText = activityDetails || '';

                     document.getElementById('activityInfo').style.display = 'block';
                  } else {
                     document.getElementById('activityInfo').style.display = 'none';
                  }
               } else {
                  document.getElementById('activityInfo').style.display = 'none';
               }

               // Hide the custom status box if there's no custom status
               document.getElementById('customStatusBox').style.display = 'none';
            }

            if (data.data?.listening_to_spotify) {
               const spotifyData = data.data.spotify;
               const songName = spotifyData.song;
               const songArtist = spotifyData.artist;
               const songAlbum = spotifyData.album;
               const songCover = spotifyData.album_art_url;
               const startTimestamp = spotifyData.timestamps.start;
               const endTimestamp = spotifyData.timestamps.end;
               const totalDuration = endTimestamp - startTimestamp;
               const currentTimestamp = new Date().getTime();
               const elapsedDuration = currentTimestamp - startTimestamp;
               const remainingDuration = endTimestamp - currentTimestamp;
               const progress = (elapsedDuration / totalDuration) * 100;
               const totalMinutes = Math.floor(totalDuration / 60000);
               const totalSeconds = Math.floor((totalDuration % 60000) / 1000);
               const totalTime = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
               const elapsedMinutes = Math.floor(elapsedDuration / 60000);
               const elapsedSeconds = Math.floor((elapsedDuration % 60000) / 1000);
               const remainingTime = `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`;

               document.getElementById('largeImage').style.display = 'none';
               document.getElementById('activityName').style.display = 'none';
               document.getElementById('activityState').style.display = 'none';
               document.getElementById('activityDetails').style.display = 'none';
               document.getElementById('largeText').style.display = 'none';
               document.getElementById('activityInfo').style.display = 'none';

               const spotifyBox = document.getElementById('spotifyBox');

               spotifyBox.style.display = 'block';
               document.getElementById("listeningText").innerHTML = `<b style="color: #fff; font-weight: bold; font-size: 14px; margin-left: -55%;">Listening to Spotify</b>`;
               document.getElementById("songName").innerHTML = `${songName} <br> By: <b>${songArtist}</b> <br></b>`;
               document.getElementById("songCover").src = songCover;
               document.getElementById('progressBar').style.width = progress + '%';
               document.getElementById('remainingTime').innerText = totalTime;
               document.getElementById('totalTime').innerText = remainingTime;

               if (updateInterval) {
                  clearInterval(updateInterval);
               }

               function updateSpotifyTooltip() {
                  const songAlbum = spotifyData.album;
                  const songCoverDiv = document.querySelector('.songCover');
                  songCoverDiv.setAttribute('data-spotify-text', songAlbum);
               }

               updateSpotifyTooltip();

               updateInterval = setInterval(() => {
                  const currentTimestamp = new Date().getTime();
                  const elapsedDuration = currentTimestamp - startTimestamp;
                  const progress = (elapsedDuration / totalDuration) * 100;
                  const elapsedMinutes = Math.floor(elapsedDuration / 60000);
                  const elapsedSeconds = Math.floor((elapsedDuration % 60000) / 1000);
                  const remainingTime = `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`;

                  document.getElementById('progressBar').style.width = progress + '%';
                  document.getElementById('totalTime').innerText = remainingTime;

                  if (currentTimestamp >= endTimestamp) {
                     clearInterval(updateInterval);
                     fetchAndUpdateStatus();
                  }
               }, 1000);
            } else {
               document.getElementById('spotifyBox').style.display = 'none';

               if (updateInterval) {
                  clearInterval(updateInterval);
               }

               setTimeout(fetchAndUpdateStatus, 10000);
            }
         } else {
            console.error('API Error:', data.error);
         }
      })
      .catch(error => {
         console.error('Error Fetching API Data:', error.message);
         setTimeout(fetchAndUpdateStatus, 10000);
      });
}

fetchAndUpdateStatus();
