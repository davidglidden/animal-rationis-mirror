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
  
  // AESTHETIC HARMONIZER - AldineXXI Framework
  // Sacred Palette as final aesthetic arbiter, not color definer
  harmonizer: {
    // Main harmonization function - takes semantic color and makes it Aldine-compatible
    harmonizeSemanticColor(rawColor, archetype = 'default') {
      // Parse input color safely
      const hsl = this.parseToHSL(rawColor);
      
      // Clamp values to safe ranges
      const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
      
      // Apply AldineXXI aesthetic discipline
      const h = clamp(hsl.h, 0, 360);
      const s = clamp(hsl.s * 0.4, 0.1, 0.6);     // Desaturate for contemplative aesthetic
      const l = clamp(hsl.l * 0.9, 0.3, 0.7);     // Soften brightness for readability
      
      // Archetype-specific warmth shift
      const warmthShift = {
        "liminal": -10,
        "collapse": -5,
        "radiant": +5,
        "luminous": +8,
        "chaos": -15,
        "dialectical": -8,
        "layered": +3,
        "flowing": +2,
        "networked": 0,
        "cyclical": -3,
        "default": 0
      };
      
      const shift = warmthShift[archetype] || 0;
      const adjustedHue = (h + shift + 360) % 360;
      
      return {
        h: adjustedHue,
        s: s,
        l: l
      };
    },
    
    // Parse various color inputs to HSL
    parseToHSL(color) {
      if (!color) return { h: 36, s: 0.4, l: 0.5 }; // Default ochre
      
      // If already HSL object
      if (typeof color === 'object' && color.h !== undefined) {
        return {
          h: color.h || 0,
          s: Math.min(1, Math.max(0, color.s || 0)),
          l: Math.min(1, Math.max(0, color.l || 0))
        };
      }
      
      // If CSS color string, attempt basic parsing
      if (typeof color === 'string') {
        // Very basic HSL parsing - could be enhanced
        const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (hslMatch) {
          return {
            h: parseInt(hslMatch[1]),
            s: parseInt(hslMatch[2]) / 100,
            l: parseInt(hslMatch[3]) / 100
          };
        }
      }
      
      // Fallback to default
      return { h: 36, s: 0.4, l: 0.5 };
    },
    
    // Shift hues to contemplative ranges suitable for manuscript aesthetic
    shiftHueToContemplative(hue, archetype) {
      const contemplativeRanges = {
        // Archetype-specific contemplative hues
        'collapse': [24, 32],     // Burnt umber, ash
        'radiance': [42, 48],     // Soft gold, amber
        'spiral': [210, 220],     // Dusky blue, indigo
        'threshold': [180, 190],  // Muted teal, sage
        'flowing': [200, 210],    // Cool blue, contemplative
        'liminal': [30, 40],      // Warm ochre, parchment
        'layered': [35, 45],      // Golden ochre, manuscript
        'luminous': [40, 50],     // Bright ochre, illuminated
        'dialectical': [25, 35],  // Burnt ochre, aged
        'networked': [190, 200],  // Sage, muted teal
        'cyclical': [220, 230],   // Deep indigo, contemplative
        
        // General contemplative range
        'default': [32, 48, 210, 230] // Ochres and indigos
      };
      
      const ranges = contemplativeRanges[archetype] || contemplativeRanges.default;
      return this.nearestHueInRanges(hue, ranges);
    },
    
    // Find nearest hue within contemplative ranges
    nearestHueInRanges(hue, ranges) {
      return ranges.reduce((nearest, current) =>
        Math.abs(hue - current) < Math.abs(hue - nearest) ? current : nearest
      );
    },
    
    // Adjust lightness for archetype-specific aesthetic
    adjustLightnessForArchetype(lightness, archetype) {
      const adjustments = {
        'collapse': Math.max(lightness - 0.1, 0.2),    // Darker, subdued
        'threshold': Math.max(lightness - 0.05, 0.25), // Slightly darker
        'radiance': Math.min(lightness + 0.1, 0.8),    // Lighter, luminous
        'luminous': Math.min(lightness + 0.15, 0.85),  // Brightest
        'liminal': Math.max(lightness - 0.1, 0.3),     // Muted, transitional
        'flowing': lightness,                           // Unchanged
        'layered': Math.min(lightness + 0.05, 0.75),   // Slightly brighter
        'dialectical': Math.max(lightness - 0.05, 0.35), // Slightly darker
        'networked': lightness,                         // Unchanged
        'cyclical': Math.max(lightness - 0.05, 0.4)    // Slightly darker
      };
      
      return adjustments[archetype] || lightness;
    },
    
    // Apply subtle manuscript warmth (slight ochre tint)
    applyManuscriptWarmth(hue, saturation) {
      // Only apply warmth to colors that aren't already warm
      if (hue > 60 && hue < 180) {
        // Cool colors get slight ochre shift
        const warmthFactor = saturation * 0.1; // Subtle shift
        return hue + (40 - hue) * warmthFactor;
      }
      return hue;
    },
    
    // Ensure readability against vellum background
    ensureReadability(lightness, saturation) {
      // Ensure sufficient contrast with vellum (#FAF8F3)
      const vellumLightness = 0.96;
      const minContrast = 0.3;
      
      if (Math.abs(lightness - vellumLightness) < minContrast) {
        return lightness < vellumLightness ? 
               Math.max(lightness - minContrast, 0.1) : 
               Math.min(lightness + minContrast, 0.9);
      }
      
      return lightness;
    },
    
    // Convert HSL to CSS-compatible rgba string using canonical algorithm
    toRGBA(hsl, alpha = 1) {
      const { h, s, l } = hsl;
      
      // Ensure valid inputs
      const hueNorm = ((h % 360) + 360) % 360 / 360;  // Normalize to 0-1
      const satNorm = Math.min(1, Math.max(0, s));
      const lightNorm = Math.min(1, Math.max(0, l));
      
      let r, g, b;
      
      if (satNorm === 0) {
        // Achromatic (gray)
        r = g = b = lightNorm;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        
        const q = lightNorm < 0.5 ? lightNorm * (1 + satNorm) : lightNorm + satNorm - lightNorm * satNorm;
        const p = 2 * lightNorm - q;
        
        r = hue2rgb(p, q, hueNorm + 1/3);
        g = hue2rgb(p, q, hueNorm);
        b = hue2rgb(p, q, hueNorm - 1/3);
      }
      
      // Convert to 0-255 range and clamp
      const rInt = Math.round(Math.min(255, Math.max(0, r * 255)));
      const gInt = Math.round(Math.min(255, Math.max(0, g * 255)));
      const bInt = Math.round(Math.min(255, Math.max(0, b * 255)));
      const alphaClamp = Math.min(1, Math.max(0, alpha));
      
      return `rgba(${rInt}, ${gInt}, ${bInt}, ${alphaClamp})`;
    },
    
    // Convenience method for renderers
    harmonizeAndRender(rawColor, archetype, alpha = 1) {
      const harmonized = this.harmonizeSemanticColor(rawColor, archetype);
      const rgba = this.toRGBA(harmonized, alpha);
      return rgba;
    }
  }
};

// Export for use in renderers
if (typeof window !== 'undefined') {
  window.SacredPalette = SacredPalette;
}