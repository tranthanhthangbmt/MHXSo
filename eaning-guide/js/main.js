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

    // Inject AI Chat Widget
    const aiWidget = document.createElement('a');
    aiWidget.href = "https://notebooklm.google.com/notebook/f2401ad6-f86f-4027-b073-1c4a43d5ae6c?authuser=9";
    aiWidget.target = "_blank";
    aiWidget.className = "ai-chat-widget";
    aiWidget.innerHTML = `
        <div class="ai-chat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 5.92 2 10.75C2 13.5 3.35 16 5.5 17.5V22L9 19.5C9.95 19.8 10.95 20 12 20C17.52 20 22 16.08 22 11.25C22 6.42 17.52 2 12 2Z" fill="white"/>
                <circle cx="8" cy="11" r="1.5" fill="#10b981"/>
                <circle cx="12" cy="11" r="1.5" fill="#10b981"/>
                <circle cx="16" cy="11" r="1.5" fill="#10b981"/>
            </svg>
        </div>
        <div class="ai-chat-text">Hỏi AI Tutor</div>
    `;
    document.body.appendChild(aiWidget);
});
