// Mock Data to simulate Consumet / AniList API response
const mockAnimeData = [
    {
        id: "jujutsu-kaisen",
        title: "Jujutsu Kaisen",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
        rating: "9.8"
    },
    {
        id: "frieren",
        title: "Frieren: Beyond Journey's End",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n142B4X2ZtqO.jpg",
        rating: "9.9"
    },
    {
        id: "one-piece",
        title: "One Piece",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDignzjclQl.jpg",
        rating: "9.5"
    },
    {
        id: "demon-slayer",
        title: "Demon Slayer",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93DQl.jpg",
        rating: "9.6"
    },
    {
        id: "attack-on-titan",
        title: "Attack on Titan",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx104578-laZZFvvXEphe.jpg",
        rating: "9.8"
    },
    {
        id: "chainsaw-man",
        title: "Chainsaw Man",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-NuFVXwOQuA2x.jpg",
        rating: "9.4"
    }
];

// Function to generate Anime Cards dynamically
function populateTrendingCarousel() {
    const carousel = document.getElementById('trending-carousel');
    
    mockAnimeData.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="card-overlay">
                <h4>${anime.title}</h4>
                <div style="display:flex; justify-content:space-between; margin-top: 5px;">
                    <span style="color: gold;"><i class="fas fa-star"></i> ${anime.rating}</span>
                    <i class="fas fa-play-circle" style="color: var(--accent); font-size: 1.2rem;"></i>
                </div>
            </div>
        `;
        
        // Simulating Next.js router push
        card.addEventListener('click', () => {
            console.log(`Navigating to /anime/${anime.id}`);
            alert(`In the React app, this would route to /anime/${anime.id}`);
        });

        carousel.appendChild(card);
    });
}

// Navbar Scroll Effect (Glassmorphism transition)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(11, 11, 15, 0.9)';
        nav.style.borderBottom = '1px solid var(--glass-border)';
    } else {
        nav.style.background = 'var(--glass-bg)';
        nav.style.borderBottom = '1px solid transparent';
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    populateTrendingCarousel();
});

// Note on Video Integration: 
// In the Next.js version, you will pass the .m3u8 streaming link fetched from Consumet 
// into a Video.js component on the /watch/[episodeId] page.
