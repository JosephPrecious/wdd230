const baseURL = "https://josephprecious.github.io/wdd230/";
const linksURL = "data/links.json";
const activitiesList = document.getElementById('learning-activities');

async function getLinks() {
  try {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.weeks);
  } catch (error) {
    console.error('Error loading links:', error);
  }
}

function displayLinks(weeks) {
  weeks.forEach(week => {
    const li = document.createElement('li');
    li.innerHTML = `${week.week}: `;
    
    week.links.forEach((link, index) => {
      const a = document.createElement('a');
      a.href = link.url.startsWith('http') ? link.url : baseURL + link.url;
      a.textContent = link.title;
      li.appendChild(a);
      
      if (index < week.links.length - 1) {
        li.appendChild(document.createTextNode(' | '));
      }
    });
    
    activitiesList.appendChild(li);
  });
}

getLinks();
  