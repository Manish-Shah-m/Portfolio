document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation Links
    function smoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link, .footer-navigation a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Navbar Active State and Scroll Highlighting
    function navbarActiveState() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveLink() {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && 
                    window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        // Initial call
        updateActiveLink();

        // Add event listener
        window.addEventListener('scroll', updateActiveLink);
    }

    // Skill Card Interaction
    function enhanceSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hovered');
            });
        });
    }

    // Project Card Preview Modal
    function setupProjectPreviews() {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.createElement('div');
        modal.classList.add('project-modal');
        document.body.appendChild(modal);

        projectCards.forEach(card => {
            const viewBtn = card.querySelector('.project-links a');
            
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const projectTitle = card.querySelector('.project-info h3').textContent;
                    const projectDesc = card.querySelector('.project-info p').textContent;
                    const projectTags = Array.from(card.querySelectorAll('.project-tag'))
                                             .map(tag => tag.textContent)
                                             .join(', ');
                    
                    modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close-modal">&times;</span>
                            <h2>${projectTitle}</h2>
                            <p>${projectDesc}</p>
                            <div class="modal-tags">
                                <strong>Technologies:</strong> ${projectTags}
                            </div>
                        </div>
                    `;
                    
                    modal.classList.add('show');
                    
                    modal.querySelector('.close-modal').addEventListener('click', () => {
                        modal.classList.remove('show');
                    });
                });
            }
        });
    }

    // Form Validation and Submission
    function setupContactForm() {
        const form = document.querySelector('.contact-form form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        form.addEventListener('submit', (e) => {
            let isValid = true;

            // Basic validation
            if (nameInput.value.trim().length < 2) {
                isValid = false;
                nameInput.classList.add('error');
            } else {
                nameInput.classList.remove('error');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
            }

            if (messageInput.value.trim().length < 10) {
                isValid = false;
                messageInput.classList.add('error');
            } else {
                messageInput.classList.remove('error');
            }

            if (!isValid) {
                e.preventDefault();
                alert('Please fill out all fields correctly.');
            }
        });
    }

    // Initialize all interactive features
    function init() {
        smoothScroll();
        navbarActiveState();
        enhanceSkillCards();
        setupContactForm();
    }

    init();
});