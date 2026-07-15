document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const procedureGrid = document.getElementById('procedureGrid');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Basic search functionality for the procedure cards
    if(searchInput && searchBtn && procedureGrid) {
        const cards = procedureGrid.querySelectorAll('.card');

        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            cards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const desc = card.querySelector('.card-desc').textContent.toLowerCase();
                
                if(title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = 'flex';
                    // Add a small animation effect
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                performSearch();
            } else {
                // Live search on typing
                performSearch();
            }
        });
    }

    // Add keyframes for the fadeIn animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
