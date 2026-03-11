/* Recycle STL - Project Script
   Metro Academic & Classical High School
*/

// 1. CONTENT DATABASE
const pages = {
    home: `
        <div class="card" style="grid-column: span 2;">
            <span class="badge">Mission Statement</span>
            <h2>Our Goal</h2>
            <p>We are students at <strong>Metro Academic and Classical High School</strong>. Our goal is to bring awareness to the declining state of recycling in St. Louis. With contamination rates rising, many items in our blue bins end up in landfills. We're here to change that through data and education.</p>
        </div>
        <div class="card">
            <h3>Did You Know?</h3>
            <p>Contamination over 3% can cause an entire recycling truck to be rejected in St. Louis City. One greasy pizza box can ruin hundreds of pounds of clean paper.</p>
        </div>
        <div class="card">
            <h3>Blue Bin Basics</h3>
            <p>Stick to the "Big 6": Paper, Cardboard, Plastic Bottles/Containers, Glass Bottles/Jars, Metal Food/Beverage Cans, and Food/Beverage Cartons.</p>
        </div>
    `,
    interviews: `
        <div class="card" style="grid-column: span 2;">
            <h2>Community Interviews</h2>
            <p>We are currently speaking with local waste management experts and Metro faculty to gather insights on how St. Louis handles its waste.</p>
        </div>
        <div class="card">
            <h3>Refusal Trends</h3>
            <p>Insights into why certain neighborhoods have higher recycling rejection rates than others.</p>
        </div>
    `,
    map: `
        <div class="card" style="grid-column: span 2;">
            <h2>STL Recycling Hotspots</h2>
            <p>St. Louis City has specific drop-off locations for items that can't go in your blue bin, like electronics and household chemicals.</p>
            <div style="height:200px; background:#1a1a1a; border:1px dashed #333; display:flex; align-items:center; justify-content:center; border-radius:12px; margin-top:15px;">
                [Interactive Map Placeholder]
            </div>
        </div>
    `,
    about: `
        <div class="card">
            <h2>The Metro Team</h2>
            <p>This website was built as part of a school research project to analyze urban sustainability in the 314.</p>
        </div>
        <div class="card">
            <h2>Contact</h2>
            <p>Reach out through the Metro High School science department for more info on our findings.</p>
        </div>
    `
};

// 2. CORE FUNCTIONS
function loadPage(pageKey) {
    const contentDiv = document.getElementById('content');
    
    // Update the HTML inside the bento grid
    contentDiv.innerHTML = pages[pageKey] || `
        <div class="card">
            <h2>Error</h2>
            <p>Page not found. Return to <a href="#" data-page="home">Home</a>.</p>
        </div>
    `;

    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    
    // Handle Nav Clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = e.target.getAttribute('data-page');
            if (targetPage) loadPage(targetPage);
        });
    });

    // 4. 404 REDIRECT POPUP LOGIC
    // This checks if the user was sent here from your 404.html page
    if (sessionStorage.getItem('showRedirectPopup') === 'true') {
        alert("Oops! That page isn't ready yet. Returning you to the home page.");
        sessionStorage.removeItem('showRedirectPopup'); // Clear the flag
    }

    // Load home by default on first visit
    loadPage('home');
});
