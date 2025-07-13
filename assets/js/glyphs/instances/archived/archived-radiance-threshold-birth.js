// Glyph for "The Threshold Breath"
// Generated from procedural renderer with parameters:
// family: Radiance, descriptors: [threshold, birth]
// mood: anticipatory, movement: radiating
// themes: threshold, birth, arrival, breath, emergence

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Loading archived-radiance-threshold-birth glyph...');
    const canvas = document.getElementById('glyph-canvas-archived-radiance-threshold-birth');
    if (!canvas) {
        console.log('❌ Canvas not found: glyph-canvas-archived-radiance-threshold-birth');
        return;
    }
    
    // Mark canvas as having an archived instance to prevent orchestrator interference
    canvas.hasArchivedInstance = true;
    
    console.log('✅ Canvas found, starting radiance glyph...');
    
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Radiance parameters based on metadata
    const config = {
        rayCount: 12,
        coreRadius: 15,
        maxRadius: 180,
        layerCount: 3,          // threshold effect
        intensity: 0.6,         // anticipatory mood
        emergenceRate: 0.02,    // birth descriptor
        radiationAmplitude: 0.3 // radiating movement
    };
    
    let time = 0;
    let particles = [];
    
    // Initialize birth particles
    for (let i = 0; i < 40; i++) {
        particles.push({
            angle: Math.random() * Math.PI * 2,
            radius: config.coreRadius + Math.random() * 20,
            life: Math.random(),
            birthDelay: Math.random() * 3000 // Staggered emergence
        });
    }
    
    function drawRadiance() {
        // Clear with subtle background
        ctx.fillStyle = 'rgba(240, 238, 230, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Breathing pulse for anticipatory mood
        const breathCycle = Math.sin(time * 0.015) * 0.2 + 0.8;
        
        // Draw threshold layers (3 concentric zones)
        for (let layer = 0; layer < config.layerCount; layer++) {
            const layerRadius = config.coreRadius + (layer * 60) * breathCycle;
            const opacity = (1 - layer * 0.3) * 0.4;
            
            // Radiating rays for each layer
            ctx.strokeStyle = `rgba(100, 80, 60, ${opacity})`;
            ctx.lineWidth = 2 - layer * 0.5;
            
            for (let ray = 0; ray < config.rayCount; ray++) {
                const angle = (ray / config.rayCount) * Math.PI * 2;
                const rayLength = layerRadius + Math.sin(time * 0.02 + ray) * config.radiationAmplitude * 30;
                
                ctx.beginPath();
                ctx.moveTo(
                    centerX + Math.cos(angle) * config.coreRadius,
                    centerY + Math.sin(angle) * config.coreRadius
                );
                ctx.lineTo(
                    centerX + Math.cos(angle) * rayLength,
                    centerY + Math.sin(angle) * rayLength
                );
                ctx.stroke();
            }
        }
        
        // Birth emergence particles
        particles.forEach(particle => {
            if (time > particle.birthDelay) {
                particle.life += config.emergenceRate;
                particle.radius += 0.8;
                
                const alpha = Math.max(0, 1 - particle.life);
                if (alpha > 0) {
                    ctx.fillStyle = `rgba(120, 100, 80, ${alpha * 0.6})`;
                    ctx.beginPath();
                    ctx.arc(
                        centerX + Math.cos(particle.angle) * particle.radius,
                        centerY + Math.sin(particle.angle) * particle.radius,
                        2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                }
                
                // Reset particle when it fades out
                if (particle.life > 1) {
                    particle.life = 0;
                    particle.radius = config.coreRadius + Math.random() * 20;
                    particle.angle = Math.random() * Math.PI * 2;
                    particle.birthDelay = time + Math.random() * 2000;
                }
            }
        });
        
        // Central threshold core - the breath itself
        const coreSize = config.coreRadius * breathCycle;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
        gradient.addColorStop(0, 'rgba(150, 130, 110, 0.8)');
        gradient.addColorStop(0.7, 'rgba(120, 100, 80, 0.4)');
        gradient.addColorStop(1, 'rgba(100, 80, 60, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
        ctx.fill();
        
        time += 16; // ~60fps
        requestAnimationFrame(drawRadiance);
    }
    
    // Start the radiance
    drawRadiance();
});