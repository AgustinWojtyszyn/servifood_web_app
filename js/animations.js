// GSAP animations for ServiFood homepage
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    var run = function () {
        gsap.from('.hero-title', {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.from('.hero-subtitle', {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: 0.4
        });

        gsap.from('.hero-badges', {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: 0.6
        });

        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });

        gsap.from('.stat-item', {
            scrollTrigger: {
                trigger: '.stats-grid',
                start: 'top 80%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
