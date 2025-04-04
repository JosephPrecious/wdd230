
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
    
    const visitsDisplay = document.querySelector(".visits");

    // 2️⃣ Get the stored VALUE for the numVisits-ls KEY in localStorage if it exists. If the numVisits KEY is missing, then assign 0 to the numVisits variable.
    let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
    
    // 3️⃣ Determine if this is the first visit or display the number of visits. We wrote this example backwards in order for you to think deeply about the logic.
    if (numVisits !== 0) {
        visitsDisplay.textContent = numVisits;
    } else {
        visitsDisplay.textContent = `This is your first visit. 🥳 Welcome!`;
    }
    
    // 4️⃣ increment the number of visits by one.
    numVisits++;
    
    // 5️⃣ store the new visit total into localStorage, key=numVisits-ls
    localStorage.setItem("numVisits-ls", numVisits);
    
    // 💡A client can view the localStorage data using the Applications panel in the browsers's DevTools - check it out on any major site.
    
    function updateRating(value) {
        document.getElementById('ratingValue').textContent = value;
    }

    document.getElementById('membershipForm').addEventListener('submit', function(e) {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
            document.getElementById('password').focus();
            e.preventDefault();
        }
    });