// Sacred Palette for Living Epistemic Glyphs
// Based on Chamber Assembly guidance: Color as disposition, not decoration

const SacredPalette = {
  // Base ground - warm parchment, never pure white
  ground: {
    vellum: '#FAF8F3',      // Primary background - aged paper
    manuscript: '#F7F3E9',   // Slightly warmer variant
    fresco: '#F5F0E6'       // Faded wall tone
  },
  
  // Unified base colors - all muted, all bearing memory
  base: {
    // Warm spectrum
    ochre: '#8B7A5E',       // Earth, aged gold
    sienna: '#A0826D',      // Burnt earth
    umber: '#826B4F',       // Deep earth
    coral: '#C4A183',       // Faded warmth
    
    // Cool spectrum  
    slate: '#778899',       // Weathered stone
    indigo: '#4B5F7D',      // Deep sky memory
    verdigris: '#6B8E7B',   // Aged copper
    twilight: '#7B6D8D',    // Dusk purple
    
    // Neutral bridges
    ash: '#9B9B9B',         // Gentle grey
    bone: '#E8DCC6',        // Pale neutral
    graphite: '#4A4A4A',    // Soft charcoal
    pearl: '#F0EBE3'        // Light whisper
  },
  
  // Family-specific harmonic moods (never pure, always mixed)
  families: {
    radiance: {
      primary: '#B89968',    // Warm ochre
      secondary: '#F0E6D2',  // Pale amber  
      accent: '#D4A574',     // Coral whisper
      mood: 'candlelight on vellum'
    },
    
    grid: {
      primary: '#778899',    // Slate blue
      secondary: '#A8A8A8',  // Warm grey
      accent: '#8FA68E',     // Moss hint
      mood: 'weathered architecture'
    },
    
    flow: {
      primary: '#A67B5B',    // Oxidized copper
      secondary: '#8B6F47',  // Rust
      accent: '#6B8E6B',     // Tarnished bronze
      mood: 'metal meeting time'
    },
    
    spiral: {
      primary: '#4B5F7D',    // Deep indigo
      secondary: '#F5F0E6',  // Parchment
      accent: '#6B8E7B',     // Verdigris
      mood: 'ink dissolving in water'
    },
    
    constellation: {
      primary: '#2F4F5F',    // Midnight blue
      secondary: '#C0C0BB',  // Tarnished silver
      accent: '#7B8F7B',     // Aurora whisper
      mood: 'ancient star charts'
    },
    
    interference: {
      primary: '#A67373',    // Muted crimson
      secondary: '#6B6B6B',  // Graphite
      accent: '#8B7D8B',     // Bruised plum
      mood: 'necessary discord, weathered'
    },
    
    strata: {
      primary: '#D4C5A0',    // Sandstone
      secondary: '#8B8680',  // Shale
      accent: '#B8956A',     // Fossil amber
      mood: 'geological memory'
    },
    
    balance: {
      primary: '#8FA68E',    // Sage green
      secondary: '#B8A890',  // Warm taupe
      accent: '#D6D6CE',     // Pearl grey
      mood: 'perfect presence'
    },
    
    collapse: {
      primary: '#8B7D8B',    // Ash violet
      secondary: '#5C5C5C',  // Warm charcoal
      accent: '#7B8B7B',     // Copper patina
      mood: 'noble decay'
    },
    
    chaos: {
      primary: '#A67373',    // Muted cinnabar
      secondary: '#4A5A4A',  // Forest shadow
      accent: '#B8956A',     // Old gold
      mood: 'productive disorder'
    },
    
    threshold: {
      primary: '#B89B9B',    // Dusty rose
      secondary: '#E8DCC6',  // Bone
      accent: '#7B6D8D',     // Twilight
      mood: 'liminal passage'
    }
  },
  
  // Utility functions for color mixing and breathing
  utils: {
    // Mix two colors with ratio (0-1)
    mix(color1, color2, ratio = 0.5) {
      const c1 = this.hexToRgb(color1);
      const c2 = this.hexToRgb(color2);
      return this.rgbToHex(
        Math.round(c1.r + (c2.r - c1.r) * ratio),
        Math.round(c1.g + (c2.g - c1.g) * ratio),
        Math.round(c1.b + (c2.b - c1.b) * ratio)
      );
    },
    
    // Apply temporal weathering (desaturation + darkening)
    weather(color, age = 0.3) {
      const rgb = this.hexToRgb(color);
      const grey = (rgb.r + rgb.g + rgb.b) / 3;
      return this.rgbToHex(
        Math.round(rgb.r + (grey - rgb.r) * age * 0.7),
        Math.round(rgb.g + (grey - rgb.g) * age * 0.7),
        Math.round(rgb.b + (grey - rgb.b) * age * 0.7)
      );
    },
    
    // Create breathing gradient for animation
    breathe(color, phase, depth = 0.1) {
      const rgb = this.hexToRgb(color);
      const breathFactor = Math.sin(phase) * depth;
      return this.rgbToHex(
        Math.round(rgb.r * (1 + breathFactor)),
        Math.round(rgb.g * (1 + breathFactor)),
        Math.round(rgb.b * (1 + breathFactor))
      );
    },
    
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    
    rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
  },
  
  // Animation timing constants (slow, contemplative)
  timing: {
    breathRate: 0.001,      // Very slow pulse
    shiftRate: 0.0005,      // Gradual color shifts
    candleFlicker: 0.003    // Gentle variation
  }
};

// Export for use in renderers
if (typeof window !== 'undefined') {
  window.SacredPalette = SacredPalette;
}