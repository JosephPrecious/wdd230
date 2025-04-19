
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('timestamp').value = new Date().toISOString();
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

 // Enhanced chamber.js
        // Weather API Implementation
        const apiKey = 'e204c804febcedeab100739eda6c5404';
        const lat = 5.530244754131395;
        const lon = 7.493441135878276;
        const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        async function fetchWeather() {
            try {
                const response = await fetch(weatherURL);
                const data = await response.json();
                updateWeatherUI(data);
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        }

        function updateWeatherUI(data) {
            // Current weather
            document.querySelector('.temp').textContent = Math.round(data.list[0].main.temp);
            document.querySelector('.condition').textContent = data.list[0].weather[0].description;

            // 3-day forecast
            const forecast = data.list.filter(item => 
                item.dt_txt.includes('12:00:00')
            ).slice(0, 3);

            const forecastHTML = forecast.map(day => `
                <div class="forecast-day">
                    <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', {weekday: 'short'})}</p>
                    <p>${Math.round(day.main.temp)}°C</p>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
                        alt="${day.weather[0].description}">
                </div>
            `).join('');

            document.querySelector('.weather-forecast').innerHTML = forecastHTML;
        }

        // Member Spotlights
        // Update the displaySpotlights function in chamber.js
        async function displaySpotlights() {
            try {
                const response = await fetch('data/members.json');
                const data = await response.json();
                const qualified = data.members.filter(m => 
                    ['gold', 'silver'].includes(m.membership.toLowerCase())
                );

                // Improved random selection
                const getRandomMembers = (array, count) => {
                    const shuffled = [...array].sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, count);
                };

                const spotlights = getRandomMembers(qualified, 3);
                
                const container = document.getElementById('spotlightContainer');
                container.innerHTML = spotlights.map(member => `
                    <section class="spotlight">
                        <h3>${member.name}</h3>
                        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                        <p>${member.description}</p>
                        <p class="membership-tier">${member.membership} Member</p>
                        <a href="${member.website}" target="_blank" class="spotlight-link">Visit Website</a>
                    </section>
                `).join('');
                
            } catch (error) {
                console.error('Error loading members:', error);
                container.innerHTML = '<p>Member spotlights currently unavailable</p>';
            }
        }

        // Event Banner
        // Banner Control
        function checkBannerDay() {
            const today = new Date().getDay(); // Sunday = 0, Wednesday = 3
            const banner = document.getElementById('chamberBanner');
            
            // Show only Mon(1), Tue(2), Wed(3)
            if ([1, 2, 3].includes(today)) {
                const isClosed = localStorage.getItem('bannerClosed');
                if (!isClosed) {
                    banner.style.display = 'block';
                }
            }
        }

        function closeBanner() {
            document.getElementById('chamberBanner').style.display = 'none';
            localStorage.setItem('bannerClosed', 'true');
        }

        // Initialize banner
        document.addEventListener('DOMContentLoaded', () => {
            // Attach close button handler
            document.querySelector('.close-banner').addEventListener('click', closeBanner);
            checkBannerDay();
        });

        // Initialize
        window.addEventListener('load', () => {
            fetchWeather();
            displaySpotlights();
            checkBannerDay();
        });