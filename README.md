# Personal Website Template

This repository provides a stripped-down version of my personal website, allowing you to create your own customized version with features like:
- **Last.fm Integration**: Displays the last 10 songs you listened to.
- **GitHub Repositories Fetcher**: Lists repositories from a specified GitHub user.
- **Discord Status Panel**: Uses the Lanyard API to fetch your live Discord status.
- **Discord Bio Panel**: Fetches your Discord bio from [DSTN](https://dcdn.dstn.to/).

# Features Overview:
### Last.fm Recent Tracks
Fetches and displays your last 10 played tracks from Last.fm.
### GitHub Repository Fetcher
Displays a list of repositories for a specified GitHub user.
### Lanyard API for Discord Status
Displays your live Discord status, including activity and presence.
### Discord Bio Panel
Fetches your Discord bio data from `https://dcdn.dstn.to/profile/{user_id}`.

# Setup Instructions:
### 1. Clone the Repository
```bash
git clone https://github.com/zr1z/Personal-Website.git
cd Personal-Website
```
### 2. Update User IDs
Update the required files with your own User ID:

#### **`bio.js`** and **`lanyard.js`**:
Replace the placeholders with your Discord User ID:
```javascript
fetch('https://dcdn.dstn.to/profile/discordId') // Your Discord User ID
```
```javascript
const fetchId = "discordId"; // Your Discord User ID
```

#### **Fetch URLs**:
Edit the fetch URLs for Last.fm, GitHub repos, and Discord bio:
- **Last.fm API**: Replace the placeholder with your Last.fm API key and username.
- **GitHub Fetch**: Update the fetch URL to point to your GitHub username.
- **Discord Bio**: Replace `user_id` in `https://dcdn.dstn.to/profile/user_id` with your Discord User ID.

### 3. Edit CSS
Update the background images in the CSS file:
- Open the CSS file and edit the following lines:
  - Line **96**, **473**, and **617**:
    ```css
    background-image: url('https://dcdn.dstn.to/banners/discordId.png');
    ```
### 4. Run Locally
To preview the website locally, use any static server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Deployment

You can deploy your customized website using GitHub Pages, Vercel, Netlify, Cloudflare Pages, or any hosting service of your choice.

## Copy-and-Paste Code Snippet
Use this box to provide users with an easy-to-use starting template:

```javascript
// Example Fetch URLs to customize
const lastFmApiUrl = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=YOUR_LASTFM_USERNAME&api_key=YOUR_API_KEY&format=json";
const githubApiUrl = "https://api.github.com/users/YOUR_GITHUB_USERNAME/repos";
const lanyardApiUrl = "https://api.lanyard.rest/v1/users/YOUR_DISCORD_USER_ID";
const discordBioUrl = "https://dcdn.dstn.to/profile/YOUR_DISCORD_USER_ID";

// Replace the above with your IDs and API keys.
```

## Contributing
Feel free to fork this repository and submit pull requests for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
