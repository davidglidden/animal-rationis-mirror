// Glyph for "From Mushi-Ken to Morra — The Ritual of Choosing"
// Themes: Triadic circulation, synchronized gesture, embodied fairness
// Visual concept: Three zones in eternal rotation with synchronized pulse rhythm

// Initialize glyph when script loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('glyph-canvas-archived-mushi-ken-glyph');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    
    // Three gesture zones arranged in triangle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;
    
    const zones = [
        { // Rock zone (bottom left)
            x: centerX + Math.cos(Math.PI * 7/6) * radius,
            y: centerY + Math.sin(Math.PI * 7/6) * radius,
            name: 'rock',
            color: { r: 139, g: 121, b: 94 }, // Warm ochre
            phase: 0
        },
        { // Paper zone (top)
            x: centerX + Math.cos(Math.PI * 1/2) * radius,
            y: centerY + Math.sin(Math.PI * 1/2) * radius,
            name: 'paper',
            color: { r: 119, g: 136, b: 153 }, // Slate blue
            phase: Math.PI * 2/3
        },
        { // Scissors zone (bottom right)
            x: centerX + Math.cos(Math.PI * 11/6) * radius,
            y: centerY + Math.sin(Math.PI * 11/6) * radius,
            name: 'scissors',
            color: { r: 107, g: 142, b: 107 }, // Sage green
            phase: Math.PI * 4/3
        }
    ];
    
    // Particle system for triadic circulation
    const PARTICLE_COUNT = 2400;
    const particles = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const zoneIndex = Math.floor(i / (PARTICLE_COUNT / 3));
        const zone = zones[zoneIndex];
        
        // Distribute particles around each zone
        const angle = (i % (PARTICLE_COUNT / 3)) / (PARTICLE_COUNT / 3) * Math.PI * 2;
        const dist = 20 + Math.random() * 40;
        
        particles.push({
            x: zone.x + Math.cos(angle) * dist,
            y: zone.y + Math.sin(angle) * dist,
            homeZone: zoneIndex,
            currentZone: zoneIndex,
            targetZone: (zoneIndex + 1) % 3,
            
            // Motion properties
            vx: 0,
            vy: 0,
            transitionProgress: 0,
            isTransitioning: false,
            
            // Visual properties
            size: 0.8 + Math.random() * 1.2,
            opacity: 0.3 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
            
            // Timing for synchronized gestures
            gestureTimer: Math.random() * 180, // 3-second cycle at 60fps
            lastGesture: 0
        });
    }
    
    let time = 0;
    let globalPulse = 0;
    let animationFrameId;
    
    function animate() {
        time += 0.008; // Contemplative pace
        globalPulse = Math.sin(time * 0.5) * 0.5 + 0.5; // Slow breathing rhythm
        
        // Clear with gentle persistence
        ctx.fillStyle = 'rgba(245, 243, 237, 0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw triadic connection lines (faint)
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const current = zones[i];
            const next = zones[(i + 1) % 3];
            ctx.moveTo(current.x, current.y);
            ctx.lineTo(next.x, next.y);
        }
        ctx.stroke();
        
        // Update and draw particles
        particles.forEach((particle, index) => {
            const currentZone = zones[particle.currentZone];
            const targetZone = zones[particle.targetZone];
            
            // Synchronized gesture timing (3-beat rhythm)
            particle.gestureTimer += 1;
            const gesturePhase = (particle.gestureTimer % 180) / 180; // 3-second cycle
            
            // Trigger transition on the third beat
            if (gesturePhase < 0.02 && particle.gestureTimer - particle.lastGesture > 160) {
                if (Math.random() < 0.008) { // Some particles transition
                    particle.isTransitioning = true;
                    particle.transitionProgress = 0;
                    particle.lastGesture = particle.gestureTimer;
                }
            }
            
            if (particle.isTransitioning) {
                // Smooth transition between zones
                particle.transitionProgress += 0.006;
                
                const t = particle.transitionProgress;
                const easeT = t * t * (3 - 2 * t); // Smooth step function
                
                // Interpolate position
                particle.x = currentZone.x + (targetZone.x - currentZone.x) * easeT;
                particle.y = currentZone.y + (targetZone.y - currentZone.y) * easeT;
                
                // Add slight orbital motion during transition
                const orbitRadius = Math.sin(t * Math.PI) * 15;
                const orbitAngle = t * Math.PI * 2;
                particle.x += Math.cos(orbitAngle) * orbitRadius;
                particle.y += Math.sin(orbitAngle) * orbitRadius;
                
                if (particle.transitionProgress >= 1) {
                    particle.isTransitioning = false;
                    particle.currentZone = particle.targetZone;
                    particle.targetZone = (particle.targetZone + 1) % 3;
                    particle.transitionProgress = 0;
                }
            } else {
                // Gentle orbital motion around current zone
                const zone = zones[particle.currentZone];
                const orbitSpeed = 0.003 + globalPulse * 0.002;
                const orbitRadius = 25 + Math.sin(time + particle.phase) * 8;
                
                particle.phase += orbitSpeed;
                particle.x = zone.x + Math.cos(particle.phase) * orbitRadius;
                particle.y = zone.y + Math.sin(particle.phase) * orbitRadius;
            }
            
            // Draw particle
            const zone = zones[particle.currentZone];
            const pulseScale = 1 + Math.sin(time * 3 + particle.phase) * 0.1;
            
            let alpha = particle.opacity;
            if (particle.isTransitioning) {
                alpha *= 0.7 + Math.sin(particle.transitionProgress * Math.PI) * 0.3;
            }
            
            // Add synchronized pulse effect
            const syncPulse = Math.sin(time * 2 + particle.phase) * 0.2 + 0.8;
            alpha *= syncPulse;
            
            ctx.fillStyle = `rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * pulseScale, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw zone centers with breathing effect
        zones.forEach((zone, index) => {
            const pulseSize = 8 + globalPulse * 4;
            const nextZone = zones[(index + 1) % 3];
            
            // Zone dominance visualization
            const dominance = Math.sin(time * 0.3 + zone.phase) * 0.5 + 0.5;
            const alpha = 0.1 + dominance * 0.2;
            
            ctx.fillStyle = `rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(zone.x, zone.y, pulseSize * (1 + dominance * 0.3), 0, Math.PI * 2);
            ctx.fill();
            
            // Subtle directional indicator (circulation arrow)
            const arrowAlpha = 0.08 + dominance * 0.06;
            ctx.strokeStyle = `rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${arrowAlpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const arrowLength = 20;
            const angle = Math.atan2(nextZone.y - zone.y, nextZone.x - zone.x);
            const arrowX = zone.x + Math.cos(angle) * (pulseSize + 15);
            const arrowY = zone.y + Math.sin(angle) * (pulseSize + 15);
            
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX + Math.cos(angle) * arrowLength, arrowY + Math.sin(angle) * arrowLength);
            ctx.stroke();
        });
        
        // Global synchronization pulse (very subtle)
        if (Math.sin(time * 0.5) > 0.95) {
            const syncAlpha = (Math.sin(time * 0.5) - 0.95) * 4;
            ctx.fillStyle = `rgba(120, 120, 120, ${syncAlpha * 0.05})`;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
            ctx.fill();
        }
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Store cleanup function
    window.glyphCleanup = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        particles.length = 0;
    };
});