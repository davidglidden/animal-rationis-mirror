// Placeholder for Glyph 4: Particle Cylinder (Radiance Family)
// Themes: source, radiance, forgiveness, emanation, pulse
// Assigned to: December 22nd, 2023 - Bach's sarabande observation

// This is scaffolding - will be replaced by procedural generator
function initializeGlyph4(container) {
  // Clear container
  container.innerHTML = '';
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = 550;
  canvas.height = 550;
  container.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let time = 0;
  
  // Radiance family pattern - emanating from center
  function animate() {
    // Background
    ctx.fillStyle = '#F0EEE6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw radiating particles (simplified Radiance pattern)
    ctx.strokeStyle = 'rgba(51, 51, 51, 0.6)';
    
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const radius = 100 + Math.sin(time * 0.02 + i * 0.2) * 50;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();
      
      // Particles at end of rays
      ctx.fillStyle = `rgba(51, 51, 51, ${0.3 + Math.sin(time * 0.03 + i * 0.1) * 0.3})`;
      ctx.beginPath();
      ctx.arc(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius,
        2 + Math.sin(time * 0.05 + i) * 1,
        0, Math.PI * 2
      );
      ctx.fill();
    }
    
    // Central source
    ctx.fillStyle = `rgba(51, 51, 51, ${0.5 + Math.sin(time * 0.04) * 0.3})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8 + Math.sin(time * 0.06) * 3, 0, Math.PI * 2);
    ctx.fill();
    
    time += 1;
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Add metadata overlay
  const metadata = document.createElement('div');
  metadata.className = 'glyph-metadata-overlay';
  metadata.innerHTML = `
    <div class="glyph-info">
      <span class="glyph-title">Particle Cylinder</span>
      <span class="glyph-family">Radiance Family</span>
      <span class="glyph-themes">source • radiance • forgiveness • emanation • pulse</span>
    </div>
  `;
  container.appendChild(metadata);
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('glyph-4');
  if (container) {
    initializeGlyph4(container);
  }
});

// Export for manual initialization
if (typeof window !== 'undefined') {
  window.initializeGlyph4 = initializeGlyph4;
}