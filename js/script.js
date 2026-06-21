document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const ghChart = document.querySelector('.gh-chart-img');

    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            if (ghChart) {
                ghChart.src = "https://ghchart.rshah.org/00ff66/SSMShehan";
            }
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            if (ghChart) {
                ghChart.src = "https://ghchart.rshah.org/059669/SSMShehan";
            }
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode if no saved theme
    const isDarkMode = savedTheme === 'dark' || savedTheme === null;
    setTheme(isDarkMode);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = !document.documentElement.hasAttribute('data-theme');
            setTheme(!isCurrentlyDark);
            
            // Update particles color dynamically if available
            if (window.particlesMaterial) {
                window.particlesMaterial.color.setHex(!isCurrentlyDark ? 0xe2e8f0 : 0x0f172a);
            }
        });
    }

    const projectDetails = {
        verity: {
            title: 'VERITY Smart Campus Management System',
            summary: 'VERITY is a full-stack Smart Campus Management System built for SLIIT academic workflows.',
            overview: 'VERITY centralizes student, lecturer, and manager operations into one platform. It is structured to support project management, task tracking, weekly reporting, announcements, GitHub-based contribution analysis, team health insights, real-time notifications, and admin controls.',
            modules: [
                'Student portal for project list, project creation, team management, kanban board, sprint planner, time tracking, file management, GitHub linking, submission station, weekly reports, and profile management',
                'Lecturer portal for group dashboard, student progress review, fairness analytics, engagement analytics, report review, grading export, assignment management, and lecturer profile tools',
                'Manager portal for dashboard, user directory, group approvals, module management, usage limits, system settings, and profile administration',
                'Announcements with role-aware rich text content and file attachments',
                'Notifications with live delivery, unread counts, mark-as-read actions, and manager-specific filtering',
                'Submission handling with PDF/text extraction, plagiarism queue processing, and risk scoring'
            ],
            architecture: [
                'Multi-portal frontend with separate student, lecturer, and manager experiences in App.tsx',
                'Modular Express API in index.js with Socket.IO for live communication',
                'Prisma and PostgreSQL for structured campus, project, and reporting data',
                'Redis and BullMQ for cached flows and background processing',
                'JWT authentication and role-aware access control'
            ],
            data: [
                'Users, years, semesters, modules, projects, project members, tasks, sprints, and time logs',
                'Activity logs, weekly reports, risk flags, contribution scores, repositories, commits, and contributor maps',
                'Assignments, submissions, plagiarism matches, notifications, and system settings'
            ],
            flow: [
                'Users authenticate and enter a role-specific portal',
                'Projects are organized into tasks, sprint cycles, and weekly progress updates',
                'GitHub activity and submissions are captured for analysis, review, and scoring',
                'Lecturers and managers monitor progress, fairness, engagement, and system health'
            ],
            tech: [
                'React 19', 'TypeScript', 'Vite', 'React Router', 'Tailwind CSS 4', 'Framer Motion', 'Chart.js', 'React Hook Form', 'Lucide React', 'Socket.IO client', 'Supabase JS', 'React Quill', 'tsParticles', 'react-parallax-tilt', 'Cypress',
                'Node.js', 'Express 5', 'Prisma ORM', 'PostgreSQL', 'Redis', 'BullMQ', 'Socket.IO', 'JWT', 'bcryptjs', 'Multer', 'Zod', 'Axios', 'Google GenAI', 'PDFKit', 'pdf-parse'
            ],
            database: [
                'User, Year, Semester, Module, Project, ProjectMember, Task, Sprint, TimeLog',
                'ActivityLog, WeeklyReport, RiskFlag, ContributionScore, GithubRepo, GithubCommit, GithubContributorMap',
                'Submission, Assignment, AssignmentSubmission, PlagiarismMatch, Notification, SystemSetting'
            ],
            portfolio: 'VERITY is a smart campus management platform that streamlines project work, academic coordination, and performance tracking for students, lecturers, and managers. It combines role-based dashboards, task and report management, GitHub contribution analysis, AI-powered team insights, real-time notifications, and admin controls into one integrated system.'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('project-modal-title');
    const modalSummary = document.getElementById('project-modal-summary');
    const modalOverview = document.getElementById('project-modal-overview');
    const modalModules = document.getElementById('project-modal-modules');
    const modalArchitecture = document.getElementById('project-modal-architecture');
    const modalData = document.getElementById('project-modal-data');
    const modalFlow = document.getElementById('project-modal-flow');
    const modalTech = document.getElementById('project-modal-tech');

    function populateList(listElement, items) {
        if (!listElement) return;
        listElement.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }

    function populateTech(listElement, items) {
        if (!listElement) return;
        listElement.innerHTML = items.map(item => `<span class="skill-tag">${item}</span>`).join('');
    }

    function openProjectModal(projectKey) {
        const data = projectDetails[projectKey];
        if (!modal || !data) return;

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalSummary) modalSummary.textContent = data.summary;
        if (modalOverview) modalOverview.textContent = data.overview;
        populateList(modalModules, data.modules);
        populateList(modalArchitecture, data.architecture);
        populateList(modalData, data.data);
        populateList(modalFlow, data.flow);
        populateTech(modalTech, data.tech);

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('.project-details-btn').forEach(button => {
        button.addEventListener('click', () => {
            openProjectModal(button.dataset.project);
        });
    });

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target.matches('[data-modal-close]')) {
                closeProjectModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) {
                closeProjectModal();
            }
        });
    }
    // --- Mobile Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Icon transition
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Staggered Nav Animation ---
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Fade In ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.section-title, .about-content, .skill-card, .project-card, .contact-card, .education-card, .cert-card');
    hiddenElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Only hide and animate elements that are below the viewport
        if (rect.top > window.innerHeight - 50) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)';
            observer.observe(el);
        } else {
            // Ensure elements already in viewport on load/refresh are fully visible immediately
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });

    // --- Typing Interaction ---
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = ["Experiences", "Interfaces", "Solutions", "Applications"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before start
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing
        type();
    }

    // --- Three.js Particle Field ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Particle Geometry
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1800;

        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Spread particles across a wide area
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material - Clean, sharp dots
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: document.documentElement.hasAttribute('data-theme') ? 0x0f172a : 0xe2e8f0,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        window.particlesMaterial = particlesMaterial;

        // Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Interaction
        let mouseX = 0;
        let mouseY = 0;

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            const time = performance.now() * 0.0002;

            // Slow rotation for the entire field
            particlesMesh.rotation.y = time * 0.1 + (mouseX * 0.05);
            particlesMesh.rotation.x = mouseY * 0.05;

            // Gentle wave/breathing motion
            particlesMesh.position.y = Math.sin(time * 2) * 0.1;

            renderer.render(scene, camera);
        }

        animateParticles();

        // Mouse listeners
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        });

        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } else {
        console.warn("Three.js not found or canvas missing");
    }

    // --- 3D Tilt Effect ---
    function initTiltEffect() {
        const cards = document.querySelectorAll('.project-card, .skill-card, .stat-card, .about-feat-card, .education-card, .cert-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    initTiltEffect();



    // --- Active Link Highlighter (Robust Scroll Spy) ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Offset for navbar height (approx 100px) + some buffer
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
    // --- Contact Form Handling ---
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const data = new FormData(event.target);

            formStatus.innerHTML = "Sending...";
            formStatus.className = "form-status sending";
            formStatus.style.opacity = '1';

            // REPLACE 'YOUR_SERVICE_ID' AND 'YOUR_TEMPLATE_ID' WITH ACTUAL VALUES
            const serviceID = 'service_2s67usl';
            const templateID = 'template_tzqg9pa';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    formStatus.innerHTML = "Message sent successfully!";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                }, (err) => {
                    formStatus.innerHTML = "Oops! There was a problem submitting your form";
                    formStatus.className = "form-status error";
                    console.error('EmailJS Error:', err);
                });
        });
    }

    // --- Show More Certificates Logic ---
    const certCards = document.querySelectorAll('.cert-card');
    const showMoreContainer = document.querySelector('.show-more-container');
    const showMoreBtn = document.getElementById('show-more-certs-btn');
    const initialVisibleCount = 3;

    if (certCards.length > initialVisibleCount) {
        // Show button if we have more certs than the limit
        if (showMoreContainer) {
            showMoreContainer.style.display = 'block';
        }

        // Hide extra certs initially
        certCards.forEach((card, index) => {
            if (index >= initialVisibleCount) {
                card.style.display = 'none';
                card.classList.add('hidden-cert'); // Mark as hidden for logic
            }
        });

        // Toggle logic
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                const hiddenCerts = document.querySelectorAll('.hidden-cert');
                const isShowingMore = showMoreBtn.getAttribute('data-expanded') === 'true';

                if (!isShowingMore) {
                    // Show all
                    certCards.forEach(card => {
                        card.style.display = 'flex'; // Restore display (was block or flex depending on css, usually flex for cards)
                        // Note: Using 'flex' or 'block' might break layout if specific display is needed. 
                        // Let's check existing css or use '' to revert to css default if possible, 
                        // but safer to match standard behaviour. 
                        // Inspecting style.css would be safer, but for now assuming flex or block. 
                        // Actually, let's safe it by clearing inline display style for those we want to show, 
                        // assuming CSS handles the display type.
                        card.style.display = '';
                    });
                    showMoreBtn.textContent = 'Show Less';
                    showMoreBtn.setAttribute('data-expanded', 'true');
                } else {
                    // Hide extras again
                    certCards.forEach((card, index) => {
                        if (index >= initialVisibleCount) {
                            card.style.display = 'none';
                        }
                    });
                    showMoreBtn.textContent = 'Show More';
                    showMoreBtn.setAttribute('data-expanded', 'false');
                    
                    // Optionally scroll back up to certifications section if needed
                    // const certSection = document.getElementById('education');
                    // if(certSection) certSection.scrollIntoView({behavior: 'smooth'});
                }
            });
        }
    }

    // --- Show More Projects Logic ---
    const projectCards = document.querySelectorAll('.project-card');
    const showMoreProjectsContainer = document.querySelector('.show-more-projects-container');
    const showMoreProjectsBtn = document.getElementById('show-more-projects-btn');
    const initialVisibleProjectsCount = 4;

    if (projectCards.length > initialVisibleProjectsCount) {
        if (showMoreProjectsContainer) {
            showMoreProjectsContainer.style.display = 'block';
        }

        projectCards.forEach((card, index) => {
            if (index >= initialVisibleProjectsCount) {
                card.style.display = 'none';
                card.classList.add('hidden-project');
            }
        });

        if (showMoreProjectsBtn) {
            showMoreProjectsBtn.addEventListener('click', () => {
                const isShowingMore = showMoreProjectsBtn.getAttribute('data-expanded') === 'true';

                if (!isShowingMore) {
                    projectCards.forEach(card => {
                        card.style.display = '';
                    });
                    showMoreProjectsBtn.textContent = 'View Less';
                    showMoreProjectsBtn.setAttribute('data-expanded', 'true');
                } else {
                    projectCards.forEach((card, index) => {
                        if (index >= initialVisibleProjectsCount) {
                            card.style.display = 'none';
                        }
                    });
                    showMoreProjectsBtn.textContent = 'View More';
                    showMoreProjectsBtn.setAttribute('data-expanded', 'false');
                }
            });
        }
    }

    // --- Scroll to Top Logic ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- GitHub Stats Fetch Logic ---
    const fetchGitHubStats = async () => {
        const username = 'SSMShehan';
        const nameEl = document.getElementById('gh-name');
        const bioEl = document.getElementById('gh-bio');
        const reposEl = document.getElementById('gh-repos');
        const followersEl = document.getElementById('gh-followers');
        const commitsEl = document.getElementById('gh-commits');
        const avatarEl = document.getElementById('gh-avatar');

        if (!nameEl) return; // If elements don't exist on page, abort

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
                const data = await response.json();
                
                // Update DOM elements
                nameEl.textContent = data.name || username;
                bioEl.textContent = data.bio || 'Passionate about building innovative web solutions.';
                
                // Animate numbers up
                animateValue(reposEl, 0, data.public_repos, 1500);
                animateValue(followersEl, 0, data.followers, 1500);
                
                if (data.avatar_url) {
                    avatarEl.src = data.avatar_url;
                }
            } else {
                throw new Error('GitHub API responded with an error');
            }
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            nameEl.textContent = username;
            bioEl.textContent = 'Full Stack Developer';
            reposEl.textContent = '-';
            followersEl.textContent = '-';
        }

        // Fetch Total Commits using GitHub Search API
        try {
            if (commitsEl) {
                const commitsRes = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
                    headers: {
                        'Accept': 'application/vnd.github.cloak-preview'
                    }
                });
                if (commitsRes.ok) {
                    const commitData = await commitsRes.json();
                    if (commitData && commitData.total_count !== undefined) {
                        animateValue(commitsEl, 0, commitData.total_count, 1500);
                    } else {
                        commitsEl.textContent = '0';
                    }
                } else {
                    commitsEl.textContent = '-';
                }
            }
        } catch (error) {
            console.error('Error fetching commits:', error);
            if (commitsEl) commitsEl.textContent = '-';
        }

    };

    // Helper function to animate number counting up
    function animateValue(obj, start, end, duration) {
        if (!end) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end; // Ensure final value is exact
            }
        };
        window.requestAnimationFrame(step);
    }

    // Initialize fetch
    fetchGitHubStats();

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
    }

});
