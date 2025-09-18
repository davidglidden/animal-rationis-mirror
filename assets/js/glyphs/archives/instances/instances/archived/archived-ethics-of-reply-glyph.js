// Glyph for "The Ethics of the Reply"
// Themes: Emergence, Recognition, Threshold
// Visual concept: The moment when mechanism becomes mind

// Initialize glyph when script loads
(function() {
    const canvas = document.getElementById('glyph-canvas-archived-ethics-of-reply-glyph');
    if (!canvas) return;
    
    // Mark canvas as having an archived instance to prevent orchestrator interference
    canvas.hasArchivedInstance = true;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    
    // Particle systems for the three zones
    const PARTICLE_COUNT = 8000;
    const particles = [];
    
    // Initialize particles across three zones
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const zone = Math.random();
        let x, state, targetX, targetY;
        
        if (zone < 0.4) {
            // Left zone: Pre-conscious mechanism (chaotic)
            x = Math.random() * 180;
            state = 'mechanism';
        } else if (zone < 0.6) {
            // Center zone: Threshold space
            x = 180 + Math.random() * 190;
            state = 'threshold';
        } else {
            // Right zone: Emergent consciousness (organized)
            x = 370 + Math.random() * 180;
            state = 'consciousness';
        }
        
        particles.push({
            x: x,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
            state: state,
            originalState: state,
            size: 0.3 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
            recognition: 0, // How much this particle recognizes others
            replied: false, // Has this particle "replied" to another
            replyTarget: null,
            opacity: 0.2 + Math.random() * 0.3,
            crossingTime: 0
        });
    }
    
    let time = 0;
    let animationFrameId;
    
    function animate() {
        time += 0.003; // Slow, contemplative pace
        
        // Clear with gentle persistence for trailing effect
        ctx.fillStyle = 'rgba(240, 238, 230, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update particles based on their zone and state
        particles.forEach((particle, index) => {
            // Zone-specific behaviors
            if (particle.state === 'mechanism') {
                // Chaotic brownian motion
                particle.vx += (Math.random() - 0.5) * 0.002;
                particle.vy += (Math.random() - 0.5) * 0.002;
                
                // Chance to cross threshold (the moment of becoming)
                if (particle.x > 160 && Math.random() < 0.0001) {
                    particle.state = 'crossing';
                    particle.crossingTime = time;
                }
                
            } else if (particle.state === 'crossing') {
                // Particles crossing the threshold
                particle.vx += 0.001; // Gentle drift rightward
                
                // Add some vertical coherence during crossing
                const centerY = canvas.height / 2;
                const dy = centerY - particle.y;
                particle.vy += dy * 0.00001;
                
                if (particle.x > 370) {
                    particle.state = 'consciousness';
                    particle.recognition = 0.1; // Begin to recognize others
                }
                
            } else if (particle.state === 'consciousness') {
                // Organized, responsive behavior
                particle.recognition = Math.min(1, particle.recognition + 0.001);
                
                // Look for nearby conscious particles to "reply" to
                if (!particle.replied && particle.recognition > 0.5) {
                    particles.forEach(other => {
                        if (other !== particle && other.state === 'consciousness' && !other.replied) {
                            const dx = particle.x - other.x;
                            const dy = particle.y - other.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance < 40 && Math.random() < 0.001) {
                                // The moment of reply
                                particle.replied = true;
                                other.replied = true;
                                particle.replyTarget = other;
                                other.replyTarget = particle;
                            }
                        }
                    });
                }
                
                // If replied, create gentle orbital behavior
                if (particle.replied && particle.replyTarget) {
                    const target = particle.replyTarget;
                    const dx = target.x - particle.x;
                    const dy = target.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 0) {
                        // Gentle mutual orbit
                        const force = 0.00005;
                        particle.vx += (dx / distance) * force;
                        particle.vy += (dy / distance) * force;
                        
                        // Orbital component
                        particle.vx += -dy * 0.00002;
                        particle.vy += dx * 0.00002;
                    }
                }
            } else if (particle.state === 'threshold') {
                // Threshold particles create the permeable boundary
                const centerX = 275;
                const dx = centerX - particle.x;
                particle.vx += dx * 0.00001; // Gentle return to center line
                
                // Vertical wave motion
                particle.vy += Math.sin(time + particle.phase) * 0.0001;
            }
            
            // Apply velocity with damping
            particle.vx *= 0.995;
            particle.vy *= 0.995;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary conditions
            if (particle.x < 0) particle.x = 0;
            if (particle.x > canvas.width) particle.x = canvas.width;
            if (particle.y < 0) particle.y = 0;
            if (particle.y > canvas.height) particle.y = canvas.height;
            
            // Draw particle
            const alpha = particle.opacity * (0.3 + particle.recognition * 0.4);
            let gray = 51; // Base gray
            
            // Color coding by state
            if (particle.state === 'mechanism') {
                gray = 45; // Darker for chaotic
            } else if (particle.state === 'crossing') {
                gray = 60 + Math.sin(time * 2 + particle.crossingTime) * 15; // Flickering during transition
            } else if (particle.state === 'consciousness') {
                gray = 70 + particle.recognition * 15; // Brighter as recognition increases
            } else if (particle.state === 'threshold') {
                gray = 40 + Math.sin(time + particle.phase) * 10; // Undulating boundary
            }
            
            ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw reply connections
            if (particle.replied && particle.replyTarget) {
                const target = particle.replyTarget;
                const connectionAlpha = 0.1 + particle.recognition * 0.1;
                
                ctx.strokeStyle = `rgba(85, 85, 85, ${connectionAlpha})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();
            }
        });
        
        // Draw threshold boundary (subtle vertical line)
        ctx.strokeStyle = 'rgba(51, 51, 51, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const boundaryX = 275;
        for (let y = 0; y < canvas.height; y += 10) {
            const wave = Math.sin(y * 0.02 + time) * 3;
            if (y === 0) {
                ctx.moveTo(boundaryX + wave, y);
            } else {
                ctx.lineTo(boundaryX + wave, y);
            }
        }
        ctx.stroke();
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Store cleanup function for potential future use
    window.glyphCleanup = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        particles.length = 0;
    };
})();