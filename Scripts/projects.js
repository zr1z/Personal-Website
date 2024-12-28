document.addEventListener('DOMContentLoaded', () => {
  const projects = [
    {
      "name": "",
      "image": "",
      "description": "",
      "discordLink": ""
    }

    //Json Object
  ];

  const projectsContainer = document.getElementById('projects-container');

  projects.forEach(project => {
    const projectBox = document.createElement('div');
    projectBox.className = 'about-box';

    const img = document.createElement('img');
    img.src = project.image;
    img.style.width = '135px';
    img.style.height = '120px';
    img.style.borderRadius = '10px'
    img.alt = project.name;

    const heading = document.createElement('h3');
    heading.textContent = project.name;

    const paragraph = document.createElement('p');
    paragraph.innerHTML = `${project.description}<br><a href="${project.discordLink}" target="_blank">Discord Link</a>`;

    projectBox.appendChild(img);
    projectBox.appendChild(heading);
    projectBox.appendChild(paragraph);
    projectsContainer.appendChild(projectBox);
  });
});
