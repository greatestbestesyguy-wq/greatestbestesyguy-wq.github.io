/* Recycle STL - Modern Script with Custom Modal */

const pages = {
    home: `
        <div class="card" style="grid-column: span 2;">
            <span class="badge">Metro High School</span>
            <h2>Our Mission</h2>
            <p>We are students at <strong>Metro Academic and Classical High School</strong>. Our goal is to bring awareness to the state of recycling in St. Louis. Many items in our blue bins end up in landfills due to contamination. We're here to change that.</p>
        </div>
        <div class="card">
            <h3>STL Fact</h3>
            <p>Contamination over 3% can cause an entire truck to be rejected. One greasy pizza box can ruin hundreds of pounds of clean paper.</p>
        </div>
    `,
    interviews: `<div class="card"><h2>Expert Interviews</h2><p>Coming soon: Insights from STL waste managers.</p></div>`,
    map: `<div class="card"><h2>STL Recycling Map</h2><p>Drop-off locations for glass and electronics.</p></div>`,
    about: `<div class="card"><h2>About the Team</h2><p>A student-led initiative for a greener 314.</p></div>`
};

// Function to close the custom popup
function closePopup() {
    document.getElementById('custom-popup').style.display = 'none';
}

function loadPage(pageKey) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = pages[pageKey] || "<h2>Page not found.</h2>";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    // Nav Click Logic
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(e.target.getAttribute('data-page'));
        });
    });

    // Check for 404 Redirect Flag
    if (sessionStorage.getItem('showRedirectPopup') === 'true') {
        // Show our custom HTML modal instead of alert()
        document.getElementById('custom-popup').style.display = 'flex';
        sessionStorage.removeItem('showRedirectPopup');
    }

    loadPage('home');
});
