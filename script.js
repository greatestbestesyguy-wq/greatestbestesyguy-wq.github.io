/**
 * Global JavaScript for Recycle STL
 * Handles the sliding navigation indicator and popup logic
 */

window.addEventListener('load', () => {
    initNavigation();
    initPopup();
});

/**
 * Logic for the sliding navigation bar
 */
function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Create the indicator element if it doesn't exist
    let indicator = document.getElementById('nav-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'nav-indicator';
        nav.appendChild(indicator);
    }

    const links = nav.querySelectorAll('a');
    
    // Find active link by checking the URL path
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "" || currentPath === "/") currentPath = "index.html";

    let activeLink = Array.from(links).find(link => 
        link.getAttribute('href') === currentPath
    );

    // Fallback to Home if no match found
    if (!activeLink) activeLink = links[0];

    // Function to move the bar and update link colors
    function updateIndicator(el) {
        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
        
        // Reset all links to dim, then highlight the "active" one
        links.forEach(l => l.style.color = 'var(--text-dim)');
        el.style.color = 'var(--text)';
    }

    // Set initial position
    setTimeout(() => updateIndicator(activeLink), 100);

    // HOVER LOGIC: Slides to the hovered link, returns to active on leave
    links.forEach(link => {
        link.addEventListener('mouseenter', () => updateIndicator(link));
        link.addEventListener('mouseleave', () => updateIndicator(activeLink));
    });

    // Handle window resizing
    window.addEventListener('resize', () => updateIndicator(activeLink));
}

/**
 * Logic for the notification popup
 */
function initPopup() {
    const popup = document.getElementById('popup-notif');
    if (popup) {
        setTimeout(() => {
            popup.style.display = 'block';
        }, 1500);
    }
}

/**
 * Close function called by the 'X' button in HTML
 */
function closePopup() {
    const popup = document.getElementById('popup-notif');
    if (popup) popup.style.display = 'none';
}
