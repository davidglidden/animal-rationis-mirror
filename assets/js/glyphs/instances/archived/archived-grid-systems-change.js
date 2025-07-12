// Grid Glyph: grid-systems-change
// For "The Ethics of the Reply, Part II: On Abdication and Fidelity"
// Family: Grid - representing systematic ethical failures
// Themes: systems, change, crisis, structure, becoming
// Mood: urgent - the crisis of AI ethics
// Movement: radiating - consequences spreading outward

document.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.getElementById('glyph-canvas-archived-grid-systems-change');
    if (!canvas) return;
    
    canvas.width = 600;
    canvas.height = 400;
    
    // Load the grid renderer engine
    const gridEngineUrl = '/assets/js/glyphs/engines/grid-renderer.js';
    
    try {
        // Load engine if not already available
        if (!window.GlyphRenderers || !window.GlyphRenderers.Grid) {
            const script = document.createElement('script');
            script.src = gridEngineUrl;
            document.head.appendChild(script);
            
            // Wait for engine to load
            await new Promise((resolve) => {
                script.onload = resolve;
                setTimeout(resolve, 1000); // Timeout fallback
            });
        }
        
        // Create grid renderer with urgent system-in-crisis parameters
        if (window.GlyphRenderers && window.GlyphRenderers.Grid) {
            const renderer = new window.GlyphRenderers.Grid(canvas, {
                // Cartesian grid representing systematic architecture
                gridType: 'cartesian',
                
                // High density for complex system representation
                density: 12,
                
                // Lower regularity - systems breaking down
                regularity: 0.6,
                
                // High perturbation - urgent crisis state
                perturbation: 0.3,
                
                // Increased connections - everything affects everything
                connectionProbability: 0.5,
                
                // Complex geometry for ethical complexity
                geometricComplexity: 0.8,
                
                // Deep logical analysis required
                logicalDepth: 3,
                
                // Faster animation for urgency
                animationSpeed: 0.02,
                
                // Custom parameters for this specific essay
                ethicalCrisis: true,
                systemicFailure: 0.7,
                radiatingConsequences: true
            });
            
            renderer.start();
            
            // Store renderer for potential cleanup
            canvas.glyphRenderer = renderer;
        } else {
            // Fallback visualization if engine fails to load
            const ctx = canvas.getContext('2d');
            
            // Create urgent grid pattern manually
            ctx.strokeStyle = 'rgba(255, 100, 100, 0.6)';
            ctx.lineWidth = 2;
            
            // Draw breaking grid
            const gridSize = 30;
            for (let x = 0; x < canvas.width; x += gridSize) {
                for (let y = 0; y < canvas.height; y += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    // Add perturbation to show system breakdown
                    const perturbX = (Math.random() - 0.5) * 10;
                    const perturbY = (Math.random() - 0.5) * 10;
                    ctx.lineTo(x + gridSize + perturbX, y + perturbY);
                    ctx.lineTo(x + gridSize + perturbX, y + gridSize + perturbY);
                    ctx.lineTo(x + perturbX, y + gridSize + perturbY);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
            
            // Add crisis indicator
            ctx.fillStyle = 'rgba(255, 50, 50, 0.8)';
            ctx.font = 'bold 24px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('SYSTEMS IN CRISIS', canvas.width / 2, canvas.height / 2);
        }
    } catch (error) {
        console.error('Failed to load grid renderer:', error);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    const canvas = document.getElementById('glyph-canvas-archived-grid-systems-change');
    if (canvas && canvas.glyphRenderer) {
        canvas.glyphRenderer.destroy();
    }
});