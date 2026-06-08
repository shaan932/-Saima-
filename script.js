document.addEventListener("DOMContentLoaded", () => {
    
    // Elements
    const introScene = document.getElementById('scene1-intro');
    const mainContent = document.getElementById('main-content');
    const audioUI = document.getElementById('audio-ui');
    const bgMusic = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const startBtn = document.getElementById('start-btn');
    
    const introTexts = [
        document.getElementById('intro-text-1'),
        document.getElementById('intro-text-2'),
        document.getElementById('intro-text-3')
    ];

    // --- SCENE 1: Intro Sequence ---
    // Generate Stars for the intro background
    const starContainer = document.getElementById('star-container');
    for(let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starContainer.appendChild(star);
    }

    // Play text sequence
    let currentTextIndex = 0;
    
    function playIntroSequence() {
        if (currentTextIndex < introTexts.length) {
            const currentEl = introTexts[currentTextIndex];
            currentEl.style.opacity = '1';
            
            setTimeout(() => {
                currentEl.style.opacity = '0';
                currentTextIndex++;
                setTimeout(playIntroSequence, 1000); // Wait before next text
            }, 3000); // How long text stays on screen
        } else {
            // Show start button
            startBtn.style.opacity = '1';
            startBtn.style.pointerEvents = 'auto';
        }
    }

    // Start sequence slightly after load
    setTimeout(playIntroSequence, 1000);

    // --- TRANSITION: Intro to Main Content ---
    startBtn.addEventListener('click', () => {
        // Handle Audio Start
        bgMusic.volume = volumeSlider.value;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide Intro
        introScene.style.opacity = '0';
        setTimeout(() => {
            introScene.style.display = 'none';
            // Show Main Content
            mainContent.classList.remove('hidden-initial');
            audioUI.classList.remove('hidden-initial');
            // Trigger environment generation
            generateEnvironment();
        }, 2000); // Matches CSS transition
    });


    // --- AUDIO CONTROLS ---
    playPauseBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            playPauseBtn.innerText = '⏸️';
        } else {
            bgMusic.pause();
            playPauseBtn.innerText = '▶️';
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        bgMusic.volume = e.target.value;
    });


    // --- SCROLL ANIMATIONS (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));


    // --- FLOATING ENVIRONMENT (Clouds, Butterflies, Sparkles) ---
    function generateEnvironment() {
        const envContainer = document.getElementById('environment-container');
        const elements = ['🦋', '☁️', '✨', '🌸', '❤️'];
        const numElements = 40; // Adjust for density

        for(let i=0; i < numElements; i++) {
            const el = document.createElement('div');
            el.classList.add('env-item');
            
            // Randomly pick an emoji
            el.innerText = elements[Math.floor(Math.random() * elements.length)];
            
            // Randomize position, size, animation duration
            const startPosX = Math.random() * 100; // vw
            const duration = Math.random() * 20 + 15; // 15s to 35s
            const delay = Math.random() * 15; // 0s to 15s
            const size = Math.random() * 1.5 + 0.8; // rem
            
            el.style.left = `${startPosX}vw`;
            el.style.fontSize = `${size}rem`;
            el.style.animationDuration = `${duration}s`;
            el.style.animationDelay = `-${delay}s`; // Negative delay so they are on screen immediately
            
            envContainer.appendChild(el);
        }
    }
});
