document.addEventListener('DOMContentLoaded', () => {
  const reposContainer = document.getElementById('repos-container');

  fetch('https://api.github.com/users/username/repos')
    .then(response => response.json())
    .then(repos => {
      if (!Array.isArray(repos)) {
        throw new Error('Unexpected response format');
      }

      if (repos.length === 0) {
        reposContainer.innerHTML = '<p>No repositories found for this user.</p>';
        return;
      }

      repos.forEach(repo => {
        const repoBox = document.createElement('div');
        repoBox.className = 'repo-box';

        const repoName = document.createElement('h3');
        repoName.textContent = repo.name;

        const repoDescription = document.createElement('p');
        repoDescription.textContent = repo.description || 'No description available';

        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = 'View on GitHub';
        repoLink.target = '_blank';

        repoBox.appendChild(repoName);
        repoBox.appendChild(repoDescription);
        repoBox.appendChild(repoLink);

        reposContainer.appendChild(repoBox);
      });
    })
    .catch(error => {
      console.error('Error fetching repositories:', error);
      reposContainer.innerHTML = '<p>Failed to load repositories. Please try again later.</p>';
    });
});
