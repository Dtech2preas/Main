
// Data for the modals
const nodeData = {
    'preasx24': {
        name: 'Preasx24',
        icon: 'ri-graduation-cap-line',
        domain: 'preasx24.co.za',
        status: 'Live',
        purpose: 'A comprehensive academic support platform tailored for Grade 12 learners in South Africa, providing crucial resources for passing matric and transitioning to university.',
        users: 'Grade 12 Learners',
        features: ['Past Exam Papers', 'NSFAS Info', 'University Info', 'Subject Study Material', 'Video & Audio Lessons']
    },
    'quiz': {
        name: 'DTECH Quiz Platform',
        icon: 'ri-gamepad-line',
        domain: 'quiz.dtech-services.co.za',
        status: 'Live',
        purpose: 'A CAPS-aligned gamified learning system designed to make testing knowledge engaging and competitive across multiple grades.',
        users: 'Grade 4–12 Learners',
        features: ['CAPS Alignment', 'Subject Quizzes', 'Weekly Exams', 'Global Leaderboards']
    },
    'studyapp': {
        name: 'DTECH Study App',
        icon: 'ri-robot-line',
        domain: 'App',
        status: 'Beta',
        purpose: 'An AI-powered study assistant that analyzes uploaded documents to provide simplified explanations and generate dynamic quizzes.',
        users: 'High School & Uni Students',
        features: ['AI Document Analysis', 'Simplified Explanations', 'Auto-Quiz Generation', 'Interactive Support']
    },
    'uni': {
        name: 'University Eligibility Portal',
        icon: 'ri-bank-line',
        domain: 'uni.dtech-services.co.za',
        status: 'Live',
        purpose: 'A tool that helps learners input their marks to find out which university courses they qualify for based on current prospectuses.',
        users: 'Grade 11 & 12 Learners',
        features: ['Course Matching', 'University DB', 'Detailed Requirements', 'Prospectus Analysis']
    },
    'books': {
        name: 'NMU Books Marketplace',
        icon: 'ri-book-open-line',
        domain: 'books.dtech-services.co.za',
        status: 'Live',
        purpose: 'A centralized marketplace for university students to buy and sell textbooks easily using WhatsApp for communication.',
        users: 'University Students',
        features: ['Buy & Sell Books', 'WhatsApp Integration', 'Student-Focused', 'Easy Discovery']
    },
    'income': {
        name: 'Student Income Platform',
        icon: 'ri-coins-line',
        domain: 'student.dtech-services.co.za',
        status: 'In Dev',
        purpose: 'A platform allowing students to earn rewards and revenue through active platform participation and advertising engagement.',
        users: 'Students',
        features: ['Reward System', 'Ad Engagement', 'Revenue Sharing', 'Student Empowerment']
    },
    'discover': {
        name: 'DTECH Discover',
        icon: 'ri-music-2-line',
        domain: 'Android App',
        status: 'Live',
        purpose: 'A modern music streaming and downloading platform featuring smart recommendations and an intuitive interface.',
        users: 'General Consumers',
        features: ['Music Streaming', 'Offline Listening', 'Discovery Roulette', 'Smart Playlists']
    },
    'server': {
        name: 'DTECH Server',
        icon: 'ri-server-line',
        domain: 'Android App',
        status: 'Live',
        purpose: 'An application that turns any Android phone into a public web server, complete with a free DTECH subdomain.',
        users: 'Developers & Creators',
        features: ['Local Hosting', 'Free Subdomain', 'Auto Configuration', 'Mobile-First']
    },
    'apps': {
        name: 'DTECH Apps Portal',
        icon: 'ri-app-store-line',
        domain: 'app.dtech-services.co.za',
        status: 'Live',
        purpose: 'The central software library and discovery hub for all DTECH applications.',
        users: 'All Users',
        features: ['App Discovery', 'APK Downloads', 'Documentation', 'Central Library']
    },
    'mainweb': {
        name: 'DTECH Main Website',
        icon: 'ri-global-line',
        domain: 'dtech-services.co.za',
        status: 'Live',
        purpose: 'The central corporate hub providing information about DTECH services, business offerings, and the overall ecosystem.',
        users: 'Public & Partners',
        features: ['Platform Directory', 'Ecosystem Overview', 'Business Offerings']
    },
    'about': {
        name: 'About DTECH',
        icon: 'ri-information-line',
        domain: 'about.preasx24.co.za',
        status: 'Live',
        purpose: 'The definitive source for understanding the mission, vision, and origins of the DTECH ecosystem and its founder.',
        users: 'Public',
        features: ['Mission Statement', 'Founder Info', 'Vision']
    },
    'legal': {
        name: 'DTECH Legal Portal',
        icon: 'ri-scale-3-line',
        domain: 'legal.dtech-services.co.za',
        status: 'Live',
        purpose: 'The central platform hosting all legal documentation, compliance policies, and user agreements for the ecosystem.',
        users: 'All Users',
        features: ['Terms & Conditions', 'Privacy Policies', 'User Agreements']
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatableElements = document.querySelectorAll('.category-node, .leaf-node');
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);

        // Add specific visible class logic
        el.addEventListener('transitionend', () => {
             if(el.classList.contains('visible')) {
                 el.style.opacity = '1';
                 el.style.transform = 'translateY(0)';
             }
        });
    });




    // --- Network Path Drawing ---
    const pathBase = document.getElementById('connectionPathBase');
    const pathActive = document.getElementById('connectionPathActive');

    function updatePath() {
        const hub = document.getElementById('dtech-hub');
        if (!hub || !pathBase) return;

        const getCenter = (element) => {
            const rect = element.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + window.scrollY + rect.height / 2
            };
        };

        const hubCenter = getCenter(hub);
        let d = '';

        // 1. Draw from Hub to Categories
        const categories = document.querySelectorAll('.category-node');
        categories.forEach(cat => {
            const catCenter = getCenter(cat);
            // Draw curve
            const midY = (hubCenter.y + catCenter.y) / 2;
            d += `M ${hubCenter.x} ${hubCenter.y} C ${hubCenter.x} ${midY}, ${catCenter.x} ${midY}, ${catCenter.x} ${catCenter.y} `;

            // 2. Draw from Category to its Leaves
            const branch = cat.closest('.network-branch');
            if(branch) {
                const leaves = branch.querySelectorAll('.leaf-node');
                leaves.forEach(leaf => {
                    const leafCenter = getCenter(leaf);
                    // Use a tighter curve for leaves
                    const leafMidY = catCenter.y + (leafCenter.y - catCenter.y) * 0.2;
                    d += `M ${catCenter.x} ${catCenter.y} C ${catCenter.x} ${leafMidY}, ${leafCenter.x} ${leafMidY}, ${leafCenter.x} ${leafCenter.y} `;
                });
            }
        });

        pathBase.setAttribute('d', d);
        if (pathActive) {
            pathActive.setAttribute('d', d);

            // Animation handling
            const pathLength = pathActive.getTotalLength();
            pathActive.style.strokeDasharray = pathLength;

            // Create a flowing effect rather than scroll-based reveal
            // To do this via CSS:
            pathActive.style.animation = 'dashFlow 3s linear infinite';
        }
    }



    // Initial draw & Start Loop for responsive connections
    setTimeout(() => {
        updatePath();

        // Use ResizeObserver for better performance than continuous loop
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updatePath);
        });
        resizeObserver.observe(document.body);

    }, 100);
});

// Modal Logic
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function openNodeModal(nodeKey) {
    const data = nodeData[nodeKey];
    if(!data) return;

    document.getElementById('modalTitle').textContent = data.name;
    document.getElementById('modalDomain').textContent = data.domain;

    const iconEl = document.getElementById('modalIcon');
    iconEl.innerHTML = `<i class="${data.icon}"></i>`;

    const statusEl = document.getElementById('modalStatus');
    statusEl.textContent = data.status;
    statusEl.className = 'status-badge ' + (data.status === 'Live' ? 'live' : 'dev');

    document.getElementById('modalPurpose').textContent = data.purpose;
    document.getElementById('modalUsers').innerHTML = `<i class="ri-user-line" style="color: var(--eco-accent); margin-right: 5px;"></i> ${data.users}`;

    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    data.features.forEach(f => {
        const li = document.createElement('li');
        li.className = 'feature-item';
        li.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${f}`;
        featuresList.appendChild(li);
    });

    const linkEl = document.getElementById('modalLink');
    if(data.domain.includes('.co.za') || data.domain.includes('http')) {
        linkEl.style.display = 'inline-flex';
        linkEl.href = data.domain.startsWith('http') ? data.domain : `https://${data.domain}`;
    } else {
        linkEl.style.display = 'none'; // Hide if it's "App" or "Android App" without a link
    }

    openModal('nodeModal');
}
