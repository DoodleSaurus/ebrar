const Portfolio = (() => {

    // Initialize Skills Section
    const initSkillsSection = () => {
        const skills = [
            { name: "Customer Service", icon: "assets/icons/customer-service.png" },
            { name: "Safety Procedures", icon: "assets/icons/safety.png" },
            { name: "Communication", icon: "assets/icons/communication.png" },
            { name: "First Aid & CPR", icon: "assets/icons/first-aid.png" },
            { name: "Teamwork", icon: "assets/icons/teamwork.png" },
            { name: "Problem Solving", icon: "assets/icons/problem-solving.png" },
            { name: "Crisis Management", icon: "assets/icons/crisis-management.png" },
            { name: "Cultural Awareness", icon: "assets/icons/cultural-awareness.png" }
        ];

        const skillsContainer = document.getElementById('skills-container');
        if (!skillsContainer) return; 

        skills.forEach(skill => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-6', 'col-md-4', 'col-lg-3'); 

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('skill-card');

            const img = document.createElement('img');
            img.src = skill.icon;
            img.alt = `${skill.name} Icon`;
            img.loading = 'lazy'; 

            const title = document.createElement('h4');
            title.textContent = skill.name;

            cardDiv.appendChild(img);
            cardDiv.appendChild(title);
            colDiv.appendChild(cardDiv);
            skillsContainer.appendChild(colDiv);
        });
    };

    // Initialize Languages Section
    const initLanguagesSection = () => {
        const languages = [
            { name: "Turkish", icon: "assets/flags/turkish.png", proficiency: "Native" },
            { name: "English", icon: "assets/flags/english.png", proficiency: "B2" },
            { name: "Italian", icon: "assets/flags/italian.png", proficiency: "A2" },
            { name: "German", icon: "assets/flags/german.png", proficiency: "A2" }
        ];
        const languagesContainer = document.getElementById('languages-container');
        if (!languagesContainer) return; 
        languages.forEach(lang => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-6', 'col-md-4', 'col-lg-3'); 
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('language-card'); 
            const img = document.createElement('img');
            img.src = lang.icon;
            img.alt = `${lang.name} Flag`;
            img.loading = 'lazy'; 
            const title = document.createElement('h4');
            title.textContent = lang.name;

            const proficiency = document.createElement('p');
            proficiency.textContent = lang.proficiency;
            cardDiv.appendChild(img);
            cardDiv.appendChild(title);
            cardDiv.appendChild(proficiency); 
            colDiv.appendChild(cardDiv);
            languagesContainer.appendChild(colDiv);
        });
    };

    // Typing animation configuration
    const typingConfig = {
        textArray: ["Flight Attendant", "Safety Professional", "Customer Service Expert", "Global Traveler"],
        typingDelay: 150,
        erasingDelay: 50,
        newTextDelay: 2000
    };

    // Initialize typing animation
    const initTypingAnimation = () => {
        const typedTextSpan = document.querySelector(".typed-text");
        const cursorSpan = document.querySelector(".cursor");

        if (!typedTextSpan || !cursorSpan) return;

        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        const type = () => {
            if (isPaused) return;

            const currentText = typingConfig.textArray[textArrayIndex];

            if (!isDeleting) {
                // Typing
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                cursorSpan.classList.add("typing");

                if (charIndex < currentText.length) {
                    setTimeout(type, typingConfig.typingDelay);
                } else {
                    cursorSpan.classList.remove("typing");
                    isPaused = true;
                    setTimeout(() => {
                        isPaused = false;
                        isDeleting = true;
                        type();
                    }, typingConfig.newTextDelay);
                }
            } else {
                // Deleting
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                cursorSpan.classList.add("typing");

                if (charIndex > 0) {
                    setTimeout(type, typingConfig.erasingDelay);
                } else {
                    cursorSpan.classList.remove("typing");
                    isDeleting = false;
                    textArrayIndex = (textArrayIndex + 1) % typingConfig.textArray.length;
                    setTimeout(type, typingConfig.typingDelay);
                }
            }
        };

        // Start animation
        type();

        // Pause animation when tab is not visible
        document.addEventListener("visibilitychange", () => {
            isPaused = document.hidden;
            if (!isPaused && !isDeleting) type();
        });
    };

    // Initialize theme toggle functionality
    const initThemeToggle = () => {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (!themeToggle) return;

        // Set initial theme based on preference
        const setInitialTheme = () => {
            const currentTheme = localStorage.getItem('theme') ||
                                (prefersDarkScheme.matches ? 'dark' : 'light');

            if (currentTheme === 'dark') {
                document.body.classList.add('dark-theme');
                themeToggle.checked = true;
            }
        };

        // Toggle theme handler
        const toggleTheme = () => {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };

        // Set initial theme
        setInitialTheme();

        // Add event listener
        themeToggle.addEventListener('change', toggleTheme);

        // Watch for system preference changes
        prefersDarkScheme.addListener((e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            document.body.classList.toggle('dark-theme', e.matches);
            localStorage.setItem('theme', newTheme);
            themeToggle.checked = e.matches;
        });
    };

    // Initialize scroll effects
    const initScrollEffects = () => {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Lazy load elements when they come into view
        const lazyLoad = () => {
            const lazyElements = document.querySelectorAll('[loading="lazy"]');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        if (element.tagName === 'IMG') {
                            element.src = element.dataset.src || element.src;
                        }
                        observer.unobserve(element);
                    }
                });
            }, { rootMargin: '100px' });

            lazyElements.forEach(element => observer.observe(element));
        };

        lazyLoad();
    };

    // Handle contact form submission
    const initContactForm = () => {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent default form submission

                // For a static portfolio like this, i might integrate this with a third-party service like Formspree or Netlify Forms.

                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset(); // Clear the form
            });
        }
    };

    // Initialize all components
    const init = () => {
        initTypingAnimation();
        initThemeToggle();
        initScrollEffects();
        initSkillsSection(); 
        initLanguagesSection();
        initContactForm(); 
        document.body.classList.add("loaded");
    };

    return { init };
})();

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", Portfolio.init);
