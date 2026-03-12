// GSAP animations for ServiFood homepage
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var run = function () {
        var hero = document.querySelector('.hero');
        var heroContent = document.querySelector('.hero-content');

        if (hero) {
            gsap.set(
                ['.hero-eyebrow', '.hero-title', '.hero-subtitle', '.hero-badge', '.hero-buttons .btn'],
                { willChange: 'transform, opacity' }
            );

            var heroTl = gsap.timeline({
                defaults: { ease: 'power3.out' }
            });

            heroTl
                .from('.hero-eyebrow', { y: -20, opacity: 0, duration: 0.6 })
                .from('.hero-title', { y: 50, opacity: 0, duration: 1.0 }, '-=0.2')
                .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.9 }, '-=0.3')
                .from('.hero-badge', { y: 16, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.2')
                .from('.hero-buttons .btn', { scale: 0.96, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.2');
        }

        if (hero && heroContent) {
            gsap.to(heroContent, {
                y: -24,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.6
                }
            });
        }

        var featureCards = gsap.utils.toArray('.feature-card');
        if (featureCards.length) {
            gsap.from(featureCards, {
                scrollTrigger: {
                    trigger: '.features-section',
                    start: 'top 78%',
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 0.95,
                stagger: 0.2,
                ease: 'power3.out'
            });

            featureCards.forEach(function (card) {
                var icon = card.querySelector('.feature-icon');
                if (!icon) return;

                gsap.from(icon, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 78%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    scale: 0.92,
                    rotate: -4,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            });
        }

        var statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            gsap.from('.stat-item', {
                scrollTrigger: {
                    trigger: statsSection,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });

            ScrollTrigger.create({
                trigger: statsSection,
                start: 'top 80%',
                once: true,
                onEnter: function () {
                    gsap.utils.toArray('.stat-number').forEach(function (el) {
                        var raw = (el.textContent || '').trim();
                        var percentMatch = raw.match(/^(\d+)\s*%$/);
                        var numberMatch = raw.match(/^\d+$/);

                        if (percentMatch) {
                            var percentTarget = parseInt(percentMatch[1], 10);
                            var percentObj = { val: 0 };

                            gsap.to(percentObj, {
                                val: percentTarget,
                                duration: 1.2,
                                ease: 'power3.out',
                                snap: { val: 1 },
                                onUpdate: function () {
                                    el.textContent = Math.round(percentObj.val) + '%';
                                },
                                onComplete: function () {
                                    el.textContent = raw;
                                }
                            });
                            return;
                        }

                        if (numberMatch) {
                            var numberTarget = parseInt(raw, 10);
                            var numberObj = { val: 0 };

                            gsap.to(numberObj, {
                                val: numberTarget,
                                duration: 1.2,
                                ease: 'power3.out',
                                snap: { val: 1 },
                                onUpdate: function () {
                                    el.textContent = Math.round(numberObj.val).toString();
                                },
                                onComplete: function () {
                                    el.textContent = raw;
                                }
                            });
                        }
                    });
                }
            });
        }

        var ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            gsap.from('.cta-content', {
                scrollTrigger: {
                    trigger: ctaSection,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out'
            });
        }

        var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (canHover) {
            gsap.utils.toArray('.feature-card').forEach(function (card) {
                var icon = card.querySelector('.feature-icon');

                card.addEventListener('mouseenter', function () {
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1.04,
                            rotate: 2,
                            duration: 0.25,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        });
                    }
                });

                card.addEventListener('mouseleave', function () {
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1,
                            rotate: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        });
                    }
                });
            });

            gsap.utils.toArray('.btn-primary, .btn-outline').forEach(function (btn) {
                btn.addEventListener('mouseenter', function () {
                    var isPrimary = btn.classList.contains('btn-primary');
                    gsap.to(btn, {
                        y: isPrimary ? -4 : -2,
                        scale: isPrimary ? 1.02 : 1.01,
                        duration: 0.2,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });

                btn.addEventListener('mouseleave', function () {
                    gsap.to(btn, {
                        y: 0,
                        scale: 1,
                        duration: 0.25,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
