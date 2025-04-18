
const yearSpan = document.getElementById('year');
const lastModifiedSpan = document.getElementById('lastModified');

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// Update menu toggle logic
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector("#menu-btn");
    const navLinks = document.querySelector(".nav-links");

    menuBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        navLinks.classList.toggle("show");
        menuBtn.textContent = navLinks.classList.contains("show") ? "✖" : "☰";
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
        if (!e.target.closest("#menu")) {
            navLinks.classList.remove("show");
            menuBtn.textContent = "☰";
        }
    });

    // Reset on window resize
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) {
            navLinks.classList.remove("show");
            menuBtn.textContent = "☰";
        }
    });
});


const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");
const sections = document.querySelectorAll("section");

modeButton.addEventListener("click", () => {
    const isDarkMode = modeButton.textContent.includes("🕶️");

    // Toggle colors for main
    main.style.background = isDarkMode ? "#000" : "#eee";
    main.style.color = isDarkMode ? "#fff" : "#000";

    // Toggle colors for all sections
    sections.forEach(section => {
        section.style.background = isDarkMode ? "#929292" : "#fff"; 
        section.style.color = isDarkMode ? "#fff" : "#000";
    });

    // Toggle icon
    modeButton.textContent = isDarkMode ? "🔆" : "🕶️";
});

// Visit tracking
window.addEventListener('load', () => {
    // Track visits with localStorage
const visitDisplay = document.querySelector('#visit-message');
let lastVisit = localStorage.getItem('lastVisit');
const currentDate = Date.now();

if (!lastVisit) {
    visitDisplay.textContent = "Welcome! Let us know if you have questions.";
} else {
    const daysBetween = Math.floor((currentDate - lastVisit) / 86400000);
    visitDisplay.textContent = daysBetween === 0 
        ? "Back so soon! Awesome!" 
        : `You last visited ${daysBetween} day${daysBetween === 1 ? "" : "s"} ago.`;
}

localStorage.setItem('lastVisit', currentDate);
});

// Add this to your existing chamber.js
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#memberDirectory')) {
        let membersData = [];

        // Load member data
        fetch('data/members.json')
            .then(response => response.json())
            .then(data => {
                membersData = data.members;
                displayMembers(membersData);
            })
            .catch(error => console.error('Error loading members:', error));

        // View toggle functionality
        const gridViewButton = document.getElementById('gridView');
        const listViewButton = document.getElementById('listView');
        const directory = document.getElementById('memberDirectory');

        gridViewButton.addEventListener('click', () => toggleView('grid'));
        listViewButton.addEventListener('click', () => toggleView('list'));

        function toggleView(viewType) {
            directory.innerHTML = '';
            if (viewType === 'grid') {
                directory.classList.remove('list-view');
                directory.classList.add('grid-view');
                gridViewButton.classList.add('active');
                listViewButton.classList.remove('active');
            } else {
                directory.classList.remove('grid-view');
                directory.classList.add('list-view');
                listViewButton.classList.add('active');
                gridViewButton.classList.remove('active');
            }
            displayMembers(membersData);
        }

        function displayMembers(members) {
            const directory = document.getElementById('memberDirectory');
            directory.innerHTML = ''; // Clear existing content
        
            members.forEach(member => {
                const card = document.createElement('div');
                card.className = 'member-card';
                
                card.innerHTML = `
                    <picture>
                        <source media="(max-width: 768px)" 
                                srcset="images/${member.image}">
                        <img src="images/${member.image}" 
                             alt="${member.name}" 
                             loading="lazy">
                    </picture>
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <p>📌 ${member.address}</p>
                        <p>📞 ${member.phone}</p>
                        <p>⭐ ${member.membership} Member</p>
                        <a href="${member.website}" class="member-website" target="_blank">
                            Visit Website
                        </a>
                    </div>
                `;
        
                directory.appendChild(card);
            });
        }
    }
});