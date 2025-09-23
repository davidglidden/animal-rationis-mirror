// Illumination Overlay System - Manuscript-style marginalia and initials
// Creates subtle manuscript illumination effects

function drawIlluminationOverlay(ctx, vp, rng) {
  const tense = vp.genome?.temporality?.tenseProgression || {past:.33,present:.34,future:.33};
  const left = (tense.past > tense.future);
  const w = ctx.canvas.width, h = ctx.canvas.height;
  
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = '#000'; // renderer will tint by palette later if desired
  
  // Manuscript margin band
  const bandW = Math.max(6, Math.floor(w * 0.02));
  ctx.fillRect(left ? 0 : (w - bandW), 0, bandW, h);
  
  // Incipit initial (simple geometric rune placeholder)
  ctx.translate(left ? bandW + 8 : 8, 18);
  ctx.font = 'bold 16px serif'; 
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  const init = (vp.ornament?.initial || '¶').slice(0,1);
  ctx.fillText(init, 0, 0);
  
  ctx.restore();
}

// Register globally for renderers to use
if (typeof window !== 'undefined') {
  window.drawIlluminationOverlay = drawIlluminationOverlay;
}