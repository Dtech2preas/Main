document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Scroll Animations (IntersectionObserver) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counters
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        startCounter(counter);
                        counter.classList.add('counted');
                    }
                });
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatableElements = document.querySelectorAll('.branch-content, .milestone-card, .node-compact');

    // Set initial styles for animation via JS to avoid FOUC if JS fails/CSS mismatch
    animatableElements.forEach(el => {
        // Only if not already styled for animation (branch-content & milestone-card handle it in CSS now)
        if (!el.classList.contains('branch-content') && !el.classList.contains('milestone-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        }
    });

    // Observe
    animatableElements.forEach(el => {
        observer.observe(el);
    });

    // Add 'visible' class style handling for compact nodes (others handled in CSS)
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .node-compact.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // --- 1.5 Constrained Physics (Parallax) ---
    const physicsNodes = document.querySelectorAll('.milestone-card, .branch-content');

    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 20; // Divide by 20 for subtle effect
        const y = (window.innerHeight / 2 - e.clientY) / 20;

        physicsNodes.forEach(node => {
            // Constrain movement to max 15px to preserve layout order
            const constrainedX = Math.max(-15, Math.min(15, x));
            const constrainedY = Math.max(-15, Math.min(15, y));

            node.style.setProperty('--px', `${constrainedX}px`);
            node.style.setProperty('--py', `${constrainedY}px`);
        });
    });


    // --- 2. Dynamic Path Drawing ---
    // We need to connect the .central-hub to each node in sequence

    const pathBase = document.getElementById('connectionPathBase');
    const pathActive = document.getElementById('connectionPathActive');

    function updatePath() {
        const hub = document.querySelector('.central-hub');
        // Select all nodes that are part of the path, excluding the hub itself if it has the class
        const nodes = document.querySelectorAll('.path-node:not(.central-hub)');

        if (!hub || nodes.length === 0) return;

        // Get coordinates relative to the viewport/document
        const getCenter = (element) => {
            const rect = element.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + window.scrollY + rect.height / 2
            };
        };

        const hubCenter = getCenter(hub);

        // Start path at Hub
        let d = `M ${hubCenter.x} ${hubCenter.y}`;

        let previousPoint = hubCenter;

        nodes.forEach(node => {
            const nodeCenter = getCenter(node);

            // Draw a curve to the next node
            // S-Curve logic handles wide horizontal gaps gracefully
            const midY = (previousPoint.y + nodeCenter.y) / 2;

            // Adjust control points based on horizontal distance to smoothen wide turns
            const dist = Math.abs(nodeCenter.x - previousPoint.x);
            // If distance is large, we might want a slightly different curve, but standard cubic works well.

            d += ` C ${previousPoint.x} ${midY}, ${nodeCenter.x} ${midY}, ${nodeCenter.x} ${nodeCenter.y}`;

            previousPoint = nodeCenter;
        });

        // Extend line a bit further down from the last node (Roadmap will be last)
        d += ` L ${previousPoint.x} ${previousPoint.y + 100}`;

        // Set path data for both
        if (pathBase) pathBase.setAttribute('d', d);
        if (pathActive) {
            pathActive.setAttribute('d', d);

            // Set dasharray for animation
            const pathLength = pathActive.getTotalLength();
            pathActive.style.strokeDasharray = pathLength;

            // Initial draw state
            updateScrollDraw();
        }
    }

    function updateScrollDraw() {
        if (!pathActive) return;

        const pathLength = pathActive.getTotalLength();

        // Calculate scroll progress relative to the document height
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;

        // Strategy: Draw line up to the center of viewport + offset
        // Find the relative position on the page
        const triggerPoint = scrollY + (window.innerHeight * 0.75);

        // Map this trigger point to path length?
        // A simple linear mapping isn't perfect because nodes vary in distance.
        // Ideally, we find the point on path closest to scrollY.
        // But for simplicity, we use a percentage of total height mapped to total length.

        const docHeight = document.body.scrollHeight;
        const drawPercent = Math.min((triggerPoint / docHeight) * 1.2, 1); // 1.2 multiplier to stay ahead

        const drawOffset = pathLength * (1 - drawPercent);

        pathActive.style.strokeDashoffset = Math.max(0, drawOffset);
    }

    // Update path on resize and scroll
    window.addEventListener('resize', updatePath);
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateScrollDraw);
    });

    // Continuous Path Update for Floating Nodes
    function animatePath() {
        updatePath();
        requestAnimationFrame(animatePath);
    }

    // Initial draw & Start Loop
    setTimeout(() => {
        updatePath();
        animatePath();
    }, 100);
});

// Utility: Counter Animation
function startCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target + "+";
            clearInterval(timer);
        } else {
            el.textContent = current;
        }
    }, 16);
}

// Utility: Modal
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
