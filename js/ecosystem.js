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
        // Only if not already styled for animation (branch-content handles it in CSS)
        if (!el.classList.contains('branch-content')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        }
    });

    // Observe
    animatableElements.forEach(el => {
        observer.observe(el);
    });

    // Add 'visible' class style handling for new elements
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .milestone-card.visible, .node-compact.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    // --- 2. Dynamic Path Drawing ---
    // We need to connect the .central-hub to each node in sequence

    const pathSvg = document.querySelector('.ecosystem-path-container svg');
    const pathElement = document.getElementById('connectionPath');

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
            // Bezier curve: C controlPoint1, controlPoint2, endPoint
            // We want a smooth S-curve down

            const midY = (previousPoint.y + nodeCenter.y) / 2;

            d += ` C ${previousPoint.x} ${midY}, ${nodeCenter.x} ${midY}, ${nodeCenter.x} ${nodeCenter.y}`;

            previousPoint = nodeCenter;
        });

        // Extend line a bit further down from the last node
        d += ` L ${previousPoint.x} ${previousPoint.y + 100}`;

        pathElement.setAttribute('d', d);

        // Animate stroke based on scroll
        const pathLength = pathElement.getTotalLength();
        pathElement.style.strokeDasharray = pathLength;

        // Calculate how much of the path to show
        // We want the path to "grow" as we scroll down
        const scrollPercent = (window.scrollY + window.innerHeight / 2) / document.body.scrollHeight;
        const drawLength = pathLength * Math.min(scrollPercent * 1.5, 1); // Speed up drawing a bit

        // We can just set it fully visible for now or animate it.
        // Let's make it fully visible but "dim" and then "light up" the active parts?
        // Actually, the "Scrollytelling" usually means the line draws itself.

        pathElement.style.strokeDashoffset = pathLength - drawLength;
    }

    // Update path on resize and scroll
    window.addEventListener('resize', updatePath);
    window.addEventListener('scroll', () => {
        // We only strictly need to re-calculate geometry on resize,
        // but stroke-dashoffset needs scroll update.
        // For performance, let's just do the drawing logic in requestAnimationFrame
        requestAnimationFrame(() => {
            const pathElement = document.getElementById('connectionPath');
            const pathLength = pathElement.getTotalLength();

            // Calculate scroll progress relative to the document height
            // But we want the line to follow the user's viewport center roughly

            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = window.scrollY / maxScroll;

            // Simple mapping for now:
            // We want the line to be drawn slightly ahead of the scroll
            const drawOffset = pathLength * (1 - (scrollFraction * 1.2));

            pathElement.style.strokeDashoffset = Math.max(0, drawOffset);
        });
    });

    // Initial draw
    // Wait for layout to settle
    setTimeout(updatePath, 100);
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
