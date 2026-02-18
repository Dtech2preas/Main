/**
 * Particle Network Animation for Hero Section
 */
const canvas = document.getElementById('hero-particles');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

// Configuration
const config = {
    particleCount: 80,
    connectionDistance: 150,
    mouseDistance: 200,
    speed: 0.5,
    color: 'rgba(37, 99, 235, 0.5)', // eco-primary
    highlightColor: 'rgba(96, 165, 250, 0.8)' // eco-accent
};

// Resize handling
function resize() {
    const parent = canvas.parentElement;
    if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

// Mouse interaction
const mouse = {
    x: null,
    y: null
};

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.mouseDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (config.mouseDistance - distance) / config.mouseDistance;
                const directionX = forceDirectionX * force * config.speed;
                const directionY = forceDirectionY * force * config.speed;

                this.vx += directionX;
                this.vy += directionY;
            }
        }
    }

    draw() {
        ctx.fillStyle = config.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    // Adjust count based on screen size
    const count = window.innerWidth < 768 ? 40 : config.particleCount;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = config.color;
                ctx.lineWidth = 1 - distance / config.connectionDistance;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    animationId = requestAnimationFrame(animate);
}

// Start
resize();
initParticles();
animate();
