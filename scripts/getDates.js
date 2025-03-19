
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');

    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    
    document.addEventListener("DOMContentLoaded", function () {
        const menuBtn = document.querySelector("#menu-btn");
        const menu = document.querySelector("#menu");
    
        menuBtn.addEventListener("click", function () {
            menu.classList.toggle("show"); // Toggle menu visibility
            menuBtn.textContent = menu.classList.contains("show") ? "✖" : "☰"; // Change icon
        });
    
        // Reset menu when resizing to larger screens
        window.addEventListener("resize", function () {
            if (window.innerWidth >= 500) {
                menu.classList.remove("show"); // Remove .show on large screens
                menuBtn.textContent = "☰"; // Reset icon to default
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
    
