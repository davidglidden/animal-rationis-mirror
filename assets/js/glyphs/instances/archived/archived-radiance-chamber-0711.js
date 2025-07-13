// Glyph for chamber session
// Generated from Mode 1 workflow
// glyph_id: radiance-chamber-0711
// family: Radiance, descriptors: ['chamber', '0711']
// mood: contemplative, movement: flowing
// themes: 

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('glyph-canvas-archived-radiance-chamber-0711');
    if (!canvas) return;
    
    // Mark canvas as having an archived instance to prevent orchestrator interference
    canvas.hasArchivedInstance = true;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const config = {
        rayCount: 12,
        coreRadius: 18,
        maxRadius: 180,
        intensity: 0.4,
        temporalFreq: 0.015,
        radiusVariation: 0.2
    };
    
    let time = 0;
    
    function drawRadiance() {
        // Clear with subtle background
        ctx.fillStyle = 'rgba(240, 238, 230, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Breathing cycle based on mood
        const breathCycle = Math.sin(time * config.temporalFreq) * 0.2 + 0.8;
        
        // Draw radiating rays
        ctx.strokeStyle = `rgba(100, 80, 60, ${config.intensity * 0.6})`;
        ctx.lineWidth = 1.5;
        
        for (let ray = 0; ray < config.rayCount; ray++) {
            const angle = (ray / config.rayCount) * Math.PI * 2;
            const rayLength = config.maxRadius * breathCycle + Math.sin(time * 0.02 + ray) * config.radiusVariation * 40;
            
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
        
        // Central core
        const coreSize = config.coreRadius * breathCycle;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
        gradient.addColorStop(0, `rgba(150, 130, 110, ${config.intensity})`);
        gradient.addColorStop(1, `rgba(100, 80, 60, ${config.intensity * 0.2})`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
        ctx.fill();
        
        time += 16;
        requestAnimationFrame(drawRadiance);
    }
    
    drawRadiance();
});