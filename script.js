const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active navigation link based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinksAll = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Smooth scroll for navigation links
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

        // Phone click handler for desktop dial pad
        function handlePhoneClick(event, phoneNumber) {
            // Check if it's a desktop device (screen width > 768px)
            if (window.innerWidth > 768) {
                event.preventDefault();
                showDialPad(phoneNumber);
            }
            // On mobile, let the tel: link work normally
        }

        function showDialPad(phoneNumber) {
            const modal = document.getElementById('dialPadModal');
            const numberDisplay = document.getElementById('dialPadNumber');
            numberDisplay.textContent = phoneNumber;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeDialPad() {
            const modal = document.getElementById('dialPadModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close dial pad when clicking outside
        document.getElementById('dialPadModal').addEventListener('click', function(event) {
            if (event.target === this) {
                closeDialPad();
            }
        });

        // Form submission with Formspree
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = '';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = '✓ Thank you! Your message has been sent successfully.';
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                    formStatus.className = 'error';
                }
            } catch (error) {
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.className = 'error';
            }
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.experience-card, .skill-category, .project-card, .education-card, .certification-card, .highlight-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });