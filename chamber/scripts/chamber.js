
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