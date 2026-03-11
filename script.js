const pages = {
    home: `<h1>St. Louis Recycling</h1><p>Welcome to the STL green initiative. Explore our research below.</p>`,
    interviews: `<h1>Expert Interviews</h1><p>Loading interviews with local STL waste managers...</p>`,
    map: `<h1>Recycling Map</h1><div style="height:300px; background:#eee; border-radius:8px; display:flex; align-items:center; justify-content:center;">Map loading...</div>`,
    about: `<h1>About This Project</h1><p>Created for my 2026 school research project.</p>`
};

function loadPage(pageKey) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = pages[pageKey] || "<h1>404</h1><p>Page not found.</p>";
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Listen for clicks on the nav links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        loadPage(page);
    });
});

// Load home by default
loadPage('home');
