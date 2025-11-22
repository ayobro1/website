// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

    // Initialize everything immediately
    initCursor();
    initScrollAnimations();

    // Initialize Barba.js
    barba.init({
        sync: true,
        debug: true,
        timeout: 5000,
        transitions: [{
            name: 'curtain-transition',
            async leave(data) {
                const done = this.async();

                // Create a timeline for the curtain effect
                const tl = gsap.timeline({
                    onComplete: done
                });

                tl.to('.transition-overlay', {
                    y: '0%',
                    duration: 0.6,
                    ease: 'power4.inOut'
                });

                return tl;
            },
            async enter(data) {
                // Scroll to top immediately
                window.scrollTo(0, 0);

                const tl = gsap.timeline();

                tl.to('.transition-overlay', {
                    y: '-100%',
                    duration: 0.6,
                    ease: 'power4.inOut',
                    delay: 0.2
                }).set('.transition-overlay', {
                    y: '100%'
                });

                // Re-initialize scripts
                initScrollAnimations();
                initCursor();
                playVideos();
            }
        }]
    });

    // Hooks to ensure stability
    barba.hooks.after(() => {
        initScrollAnimations();
        playVideos();
        initFluidInteractions();
    });

    // Initialize fluid interactions
    initFluidInteractions();
});

// Fluid morphing interactions
function initFluidInteractions() {
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('button, a[class*="btn"], .bento-card');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Add ripple effect on click
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        document.body.appendChild(ripple);

        // Animate ripple
        ripple.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }).onfinish = () => ripple.remove();
    });

    // Blob mouse follow effect
    const blobs = document.querySelectorAll('.blob');
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * 50 * speed;
            const y = (mouseY - 0.5) * 50 * speed;
            
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    // Remove old listeners to prevent duplicates
    const newCursor = cursor.cloneNode(true);
    cursor.parentNode.replaceChild(newCursor, cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Smooth cursor follow with easing
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        newCursor.style.left = cursorX + 'px';
        newCursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const hoverElements = document.querySelectorAll('a, button, .bento-card, input, textarea, select');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => newCursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => newCursor.classList.remove('hovered'));
    });
}

function initScrollAnimations() {
    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        const scrolled = window.pageYOffset;

        parallaxLayers.forEach(layer => {
            const speed = layer.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Mouse parallax on hero
    document.addEventListener('mousemove', (e) => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroTitle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // Reveal on Scroll with stagger
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;

            // If element is visible or we are at the bottom of page
            if (elementTop < window.innerHeight - elementVisible || (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 50); // Stagger effect
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger immediately to show above-fold content
    setTimeout(revealOnScroll, 100);
    revealOnScroll();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function playVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.play().catch(e => console.log("Autoplay prevented:", e));
    });
}
