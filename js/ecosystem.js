
// Data for the modals
const nodeData = {
    // DTECH Edu
    'studyapp': {
        name: 'StudyApp (AI Tutor)',
        icon: 'ri-robot-line',
        domain: 'Android App',
        status: 'Live',
        purpose: 'A native Android application acting as an intelligent study assistant. Extracts text from PDFs/Docs and utilizes the Groq LLM API to dynamically generate summaries and interactive quizzes.',
        users: 'High School & Uni Students',
        features: ['Kotlin', 'Groq LLM', 'Room DB']
    },
    'quiz': {
        name: 'D-TECH Quiz Platform',
        icon: 'ri-gamepad-line',
        domain: 'quiz.dtech-services.co.za',
        status: 'Live',
        purpose: 'A massive EdTech platform featuring CAPS/NSC curriculum mapping, offline capabilities, and gamification to practice past papers natively in Android.',
        users: 'Grade 4–12 Learners',
        features: ['Firebase RTDB', 'Vanilla JS', 'Android Wrapper']
    },
    'uni': {
        name: 'DTech Eligibility Checker',
        icon: 'ri-bank-line',
        domain: 'uni.dtech-services.co.za',
        status: 'Live',
        purpose: 'A complex calculation engine helping students evaluate university acceptance likelihood based on NSC marks and processing dynamic variations in admission criteria (APS/FPS).',
        users: 'Grade 11 & 12 Learners',
        features: ['Vanilla JS', 'Algorithms', 'Android WebView']
    },
    'learning_portal': {
        name: 'High School Learning Portal',
        icon: 'ri-graduation-cap-line',
        domain: 'preasx24.co.za',
        status: 'Live',
        purpose: 'A comprehensive static student hub for past papers built for extreme low-data environments, utilizing optimized JSON routing for offline capabilities.',
        users: 'Grade 12 Learners',
        features: ['Vanilla JS', 'Static Routing']
    },

    // DTECH Services
    'web_dev': {
        name: 'Custom Web Development',
        icon: 'ri-code-s-slash-line',
        domain: 'dtech-services.co.za',
        status: 'Live',
        purpose: 'From Level 1 Static Websites for small businesses to Level 4 Enterprise Platforms requiring scalable infrastructure and advanced security integrations.',
        users: 'Businesses & Orgs',
        features: ['Custom Dev', 'Full-Stack']
    },
    'licensing': {
        name: 'Software Licensing',
        icon: 'ri-file-shield-2-line',
        domain: 'dtech-services.co.za',
        status: 'Live',
        purpose: 'Providing ready-to-launch platforms for organizations, including white-labeled Marketplaces, Business Hubs, and custom Learning Systems.',
        users: 'Businesses & Orgs',
        features: ['Licensing', 'SaaS']
    },
    'business_hub': {
        name: 'DTECH Student Business Hub',
        icon: 'ri-store-3-line',
        domain: 'business.dtech-services.co.za',
        status: 'Live',
        purpose: 'A serverless marketplace platform for listing and managing small businesses with dynamic subdomain routing and JWT authentication.',
        users: 'Student Entrepreneurs',
        features: ['Cloudflare Workers', 'KV', 'Dynamic Subdomains']
    },
    'books': {
        name: 'DTECH Student Marketplace',
        icon: 'ri-book-open-line',
        domain: 'books.dtech-services.co.za',
        status: 'Live',
        purpose: 'A peer-to-peer textbook marketplace connecting buyers with sellers over WhatsApp. Fully serverless architecture using IndexedDB.',
        users: 'University Students',
        features: ['Cloudflare Workers', 'P2P', 'WhatsApp']
    },

    // DTECH Lab
    'webrtc_tunnel': {
        name: 'Flutter WebRTC Tunnel',
        icon: 'ri-cloud-windy-line',
        domain: 'Internal Tool',
        status: 'R&D',
        purpose: 'A hardcore networking utility that transforms a mobile device into a global web server by exposing local mobile environments to the public internet via secure WebRTC tunneling.',
        users: 'Engineers',
        features: ['Flutter', 'WebRTC DataChannels', 'P2P Networking']
    },
    'trading_bot': {
        name: 'DTECH_BOT_V1 (MetaTrader 5)',
        icon: 'ri-robot-2-line',
        domain: 'Internal Tool',
        status: 'R&D',
        purpose: 'A fully autonomous Algorithmic Trading Bot for the Forex market utilizing EMA/RSI crossovers, dynamic risk management, and automated trailing stops.',
        users: 'Traders',
        features: ['MQL5', 'Algorithmic Finance']
    },
    'project_x24': {
        name: 'Private R&D (Project X24)',
        icon: 'ri-spy-line',
        domain: 'Internal Tool',
        status: 'R&D',
        purpose: 'Advanced, private research projects focusing on Android Foreground Services, Deep JSON State-Merging, secure cloud proxies, and seamless API bridging.',
        users: 'Internal',
        features: ['Android Services', 'Internal R&D']
    },
    'apps': {
        name: 'D-TECH Apps Store',
        icon: 'ri-app-store-line',
        domain: 'app.dtech-services.co.za',
        status: 'Live',
        purpose: 'A custom Android APK distribution platform built natively as an SPA, probing static JSON metadata files for rapid app discovery.',
        users: 'Android Users',
        features: ['Vanilla JS', 'Static SPA']
    },

    // DTECH Entertainment
    'orbit_games': {
        name: 'Orbit Game Suite',
        icon: 'ri-space-ship-line',
        domain: 'In Dev',
        status: 'Live',
        purpose: 'A peer-to-peer (P2P) 3D browser gaming engine that bypasses centralized game servers entirely using WebRTC DataChannels to sync real-time physics.',
        users: 'Gamers',
        features: ['WebRTC', 'Three.js', 'P2P Gaming']
    },
    'discover': {
        name: 'D-TECH DISCOVER',
        icon: 'ri-music-2-line',
        domain: 'Android App',
        status: 'Live',
        purpose: 'A modern music discovery and background streaming app utilizing custom workers, ExoPlayer for gapless playback, and smart shuffling.',
        users: 'Music Listeners',
        features: ['Jetpack Compose', 'ExoPlayer', 'MediaSessionService']
    },
    'rewards': {
        name: 'The D-TECH Rewards Platform',
        icon: 'ri-coins-line',
        domain: 'Telegram Mini App',
        status: 'Live',
        purpose: 'A centralized virtual economy and ad monetization engine integrated via Telegram Mini Apps featuring seamless passwordless authentication.',
        users: 'General Users',
        features: ['Cloudflare Workers', 'Telegram Mini Apps']
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
