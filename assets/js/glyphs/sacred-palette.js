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
  },
  
  // Semantic lookup helpers for renderer architecture
  semantic: {
    // Map HSL hue to symbolic color name
    mapHueToSymbol(h) {
      const hueRanges = {
        'crimson': [0, 30],      // Red-orange
        'amber': [30, 60],       // Orange-yellow
        'ochre': [60, 90],       // Yellow-green
        'sage': [90, 150],       // Green
        'teal': [150, 210],      // Blue-green
        'indigo': [210, 270],    // Blue-purple
        'violet': [270, 330],    // Purple-magenta
        'ash': [330, 360]        // Magenta-red
      };
      
      for (const [symbol, [min, max]] of Object.entries(hueRanges)) {
        if (h >= min && h < max) return symbol;
      }
      return 'ash'; // Default fallback
    },
    
    // Get symbolic color with semantic adjustments
    getSymbolicColor(symbol, semanticColor = null) {
      const baseColors = {
        'crimson': { h: 15, s: 0.4, l: 0.5 },
        'amber': { h: 45, s: 0.6, l: 0.6 },
        'ochre': { h: 75, s: 0.5, l: 0.5 },
        'sage': { h: 120, s: 0.3, l: 0.5 },
        'teal': { h: 180, s: 0.5, l: 0.5 },
        'indigo': { h: 240, s: 0.6, l: 0.4 },
        'violet': { h: 300, s: 0.4, l: 0.5 },
        'ash': { h: 0, s: 0.1, l: 0.6 }
      };
      
      const base = baseColors[symbol] || baseColors.ash;
      
      // If semantic color provided, blend with base
      if (semanticColor) {
        return {
          h: semanticColor.h || base.h,
          s: Math.min(1, (semanticColor.s || base.s) * 0.8), // Muted
          l: Math.min(0.8, (semanticColor.l || base.l) * 0.9) // Contemplative
        };
      }
      
      return base;
    },
    
    // Convert HSL to contemplative rgba string
    hslToRgba(h, s, l, alpha = 1) {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      
      let r, g, b;
      if (h < 60) { [r, g, b] = [c, x, 0]; }
      else if (h < 120) { [r, g, b] = [x, c, 0]; }
      else if (h < 180) { [r, g, b] = [0, c, x]; }
      else if (h < 240) { [r, g, b] = [0, x, c]; }
      else if (h < 300) { [r, g, b] = [x, 0, c]; }
      else { [r, g, b] = [c, 0, x]; }
      
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    
    // Get archetype-specific color modifications
    getArchetypeColorMod(archetype) {
      const mods = {
        'flowing': { saturation: 0.9, lightness: 1.1, alpha: 0.8 },
        'liminal': { saturation: 0.7, lightness: 0.9, alpha: 0.6 },
        'layered': { saturation: 1.0, lightness: 0.8, alpha: 0.9 },
        'luminous': { saturation: 1.2, lightness: 1.3, alpha: 1.0 },
        'dialectical': { saturation: 0.8, lightness: 0.7, alpha: 0.7 },
        'networked': { saturation: 0.9, lightness: 1.0, alpha: 0.8 },
        'cyclical': { saturation: 1.1, lightness: 1.0, alpha: 0.9 }
      };
      
      return mods[archetype] || { saturation: 1.0, lightness: 1.0, alpha: 1.0 };
    }
  }
};

// Export for use in renderers
if (typeof window !== 'undefined') {
  window.SacredPalette = SacredPalette;
}