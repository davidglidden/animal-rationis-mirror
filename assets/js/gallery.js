// Gallery navigation system - contemplative viewing patterns
// Following AldineXXI v2.0 architectural principles

(function() {
  'use strict';

  // Family data configuration
  const familyData = {
    radiance: {
      title: "Central Illumination",
      family: "Radiance Family", 
      mood: "candlelight on vellum",
      glyphId: "gallery-radiance-example"
    },
    grid: {
      title: "Systematic Structure",
      family: "Grid Family",
      mood: "weathered architecture", 
      glyphId: "gallery-grid-example"
    },
    flow: {
      title: "Temporal Current",
      family: "Flow Family",
      mood: "metal meeting time",
      glyphId: "gallery-flow-example"
    },
    spiral: {
      title: "Golden Recursion",
      family: "Spiral Family",
      mood: "ink dissolving in water",
      glyphId: "gallery-spiral-example"
    },
    constellation: {
      title: "Networked Points", 
      family: "Constellation Family",
      mood: "ancient star charts",
      glyphId: "gallery-constellation-example"
    },
    interference: {
      title: "Overlapping Waves",
      family: "Interference Family", 
      mood: "necessary discord, weathered",
      glyphId: "gallery-interference-example"
    },
    strata: {
      title: "Layered Sediment",
      family: "Strata Family",
      mood: "geological memory",
      glyphId: "gallery-strata-example"
    },
    balance: {
      title: "Harmonic Equilibrium",
      family: "Balance Family",
      mood: "perfect presence", 
      glyphId: "gallery-balance-example"
    },
    collapse: {
      title: "Gravitational Center",
      family: "Collapse Family",
      mood: "noble decay",
      glyphId: "gallery-collapse-example"
    },
    chaos: {
      title: "Strange Attractors",
      family: "Chaos Family", 
      mood: "productive disorder",
      glyphId: "gallery-chaos-example"
    },
    threshold: {
      title: "Portal Between States",
      family: "Threshold Family",
      mood: "liminal passage",
      glyphId: "gallery-threshold-example"
    }
  };

  const families = Object.keys(familyData);
  let currentIndex = 0;
  let currentRenderer = null;

  // DOM elements
  let activeCanvas = null;
  let activeTitle = null;
  let activeFamily = null;
  let activeMood = null;
  let familyButtons = null;
  let navPrev = null;
  let navNext = null;

  function initializeGallery() {
    // Cache DOM elements
    activeCanvas = document.getElementById('active-canvas');
    activeTitle = document.getElementById('active-title');
    activeFamily = document.getElementById('active-family');  
    activeMood = document.getElementById('active-mood');
    familyButtons = document.querySelectorAll('.family-btn');
    navPrev = document.querySelector('.nav-prev');
    navNext = document.querySelector('.nav-next');

    if (!activeCanvas) {
      console.log('Gallery elements not found - not a gallery page');
      return;
    }

    // Set up event listeners
    setupNavigation();
    
    // Initialize with first family
    switchToFamily('radiance', 0);
  }

  function setupNavigation() {
    // Previous/Next navigation
    if (navPrev) {
      navPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + families.length) % families.length;
        switchToFamily(families[currentIndex], currentIndex);
      });
    }
    
    if (navNext) {
      navNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % families.length;
        switchToFamily(families[currentIndex], currentIndex);
      });
    }
    
    // Family selector buttons
    familyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const family = btn.dataset.family;
        const index = families.indexOf(family);
        if (index !== -1) {
          switchToFamily(family, index);
        }
      });
    });
    
    // Keyboard navigation (only when gallery has focus)
    document.addEventListener('keydown', (e) => {
      if (document.querySelector('.gallery-viewer:hover') || 
          document.activeElement?.closest('.gallery-navigation')) {
        if (e.key === 'ArrowLeft' && navPrev) {
          e.preventDefault();
          navPrev.click();
        } else if (e.key === 'ArrowRight' && navNext) {
          e.preventDefault();
          navNext.click();
        }
      }
    });
  }

  function switchToFamily(familyKey, index = null) {
    if (index !== null) currentIndex = index;
    
    const data = familyData[familyKey];
    if (!data) {
      console.warn(`Family not found: ${familyKey}`);
      return;
    }
    
    console.log(`Switching to family: ${familyKey}`);
    
    // Clean up current renderer
    if (currentRenderer && typeof currentRenderer.destroy === 'function') {
      currentRenderer.destroy();
      currentRenderer = null;
    }
    
    // Clear canvas
    if (activeCanvas) {
      const ctx = activeCanvas.getContext('2d');
      ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
    }
    
    // Update UI elements
    updateUI(data);
    
    // Update active button
    updateActiveButton(familyKey);
    
    // Create new glyph
    createGlyph(data);
  }

  function updateUI(data) {
    if (activeTitle) activeTitle.textContent = data.title;
    if (activeFamily) activeFamily.textContent = data.family;
    if (activeMood) activeMood.innerHTML = `<em>${data.mood}</em>`;
  }

  function updateActiveButton(familyKey) {
    familyButtons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-family="${familyKey}"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  function createGlyph(data) {
    if (!activeCanvas || !window.glyphOrchestrator) {
      console.warn('Canvas or orchestrator not available');
      return;
    }
    
    // Set proper canvas attributes for orchestrator
    const wrapper = activeCanvas.closest('.contemplative-sigil');
    if (wrapper) {
      wrapper.dataset.glyphId = data.glyphId;
    }
    
    // Use orchestrator to create glyph
    try {
      window.glyphOrchestrator.createGlyph(activeCanvas, data.glyphId, { 
        title: data.title,
        family: data.family 
      });
    } catch (error) {
      console.error('Failed to create glyph:', error);
      
      // Fallback: simple error display
      const ctx = activeCanvas.getContext('2d');
      ctx.fillStyle = '#999';
      ctx.font = '16px serif';
      ctx.textAlign = 'center';
      ctx.fillText('Sigil temporarily unavailable', 
                   activeCanvas.width / 2, 
                   activeCanvas.height / 2);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGallery);
  } else {
    initializeGallery();
  }

})();