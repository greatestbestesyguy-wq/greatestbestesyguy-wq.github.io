const pages = {
    home: `
        <div class="card" style="grid-column: span 2;">
            <h2>Our Mission</h2>
            <p>We are students at <strong>Metro Academic and Classical High School</strong>. Our goal is to bring awareness to the declining state of recycling in St. Louis. With contamination rates rising, many items in our blue bins end up in landfills. We're here to change that.</p>
        </div>
        <div class="card">
            <h3>STL Fact #1</h3>
            <p>Contamination over 3% can cause an entire recycling truck to be rejected in St. Louis City.</p>
        </div>
    `,
    interviews: `
        <div class="card">
            <h2>Student Voices</h2>
            <p>Placeholder for interviews with Metro faculty and STL waste management experts.</p>
        </div>
    `,
    map: `
        <div class="card" style="grid-column: span 2;">
            <h2>Recycling Hotspots</h2>
            <p>A dynamic map showing where Metro students can drop off specialized glass and electronics.</p>
        </div>
    `,
    about: `
        <div class="card">
            <h2>About the Team</h2>
            <p>This is a Metro High School initiative focused on local sustainability and data-driven environmentalism.</p>
        </div>
    `
};

function loadPage(pageKey) {
    document.getElementById('content').innerHTML = pages[pageKey] || "<h2>404</h2>";
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        loadPage(e.target.getAttribute('data-page'));
    });
});

loadPage('home');
// Check if the user was just redirected from a 404 page
window.onload = function() {
    if (sessionStorage.getItem('showRedirectPopup') === 'true') {
        
        // Create a simple popup alert
        alert("Oops! That page isn't ready yet. Returning you to the home page.");
        
        // Remove the flag so the popup doesn't keep appearing
        sessionStorage.removeItem('showRedirectPopup');
    }
};
