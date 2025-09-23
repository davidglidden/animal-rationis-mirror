// Gwern-style tri-mode theme toggle (auto/light/dark)

(function() {
    'use strict';
    
    // Theme modes
    const THEMES = {
        AUTO: 'auto',
        LIGHT: 'light', 
        DARK: 'dark'
    };
    
    // Get stored theme or default to auto
    function getStoredTheme() {
        return localStorage.getItem('theme') || THEMES.AUTO;
    }
    
    // Store theme preference
    function setStoredTheme(theme) {
        localStorage.setItem('theme', theme);
    }
    
    // Get system preference
    function getSystemTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? THEMES.DARK : THEMES.LIGHT;
    }
    
    // Apply theme to document
    function applyTheme(theme) {
        const root = document.documentElement;
        
        // Remove existing theme classes
        root.removeAttribute('data-theme');
        
        if (theme === THEMES.AUTO) {
            // Use system preference
            const systemTheme = getSystemTheme();
            if (systemTheme === THEMES.DARK) {
                root.setAttribute('data-theme', 'dark');
            }
        } else if (theme === THEMES.DARK) {
            root.setAttribute('data-theme', 'dark');
        }
        // Light theme is default (no attribute needed)
    }
    
    // Update toggle button appearance
    function updateToggleButton() {
        const currentTheme = getStoredTheme();
        const buttons = document.querySelectorAll('.theme-toggle-menu, .theme-toggle');
        
        buttons.forEach(button => {
            // Remove all theme classes
            button.classList.remove('theme-auto', 'theme-light', 'theme-dark');
            
            // Add current theme class
            button.classList.add(`theme-${currentTheme}`);
            
            // Update aria-label
            const labels = {
                [THEMES.AUTO]: 'Theme: Auto (follows system)',
                [THEMES.LIGHT]: 'Theme: Light',
                [THEMES.DARK]: 'Theme: Dark'
            };
            button.setAttribute('aria-label', labels[currentTheme]);
        });
    }
    
    // Update theme selector buttons
    function updateThemeSelector() {
        const currentTheme = getStoredTheme();
        const selectors = document.querySelectorAll('.theme-option');
        
        selectors.forEach(button => {
            button.classList.remove('active');
            if (button.classList.contains(`theme-${currentTheme}`)) {
                button.classList.add('active');
            }
        });
    }
    
    // Set specific theme (for nav buttons)
    function setTheme(theme) {
        if (Object.values(THEMES).includes(theme)) {
            setStoredTheme(theme);
            applyTheme(theme);
            updateToggleButton();
            updateThemeSelector();
        }
    }
    
    // Toggle to next theme (for main button)
    function toggleTheme() {
        const currentTheme = getStoredTheme();
        let nextTheme;
        
        switch (currentTheme) {
            case THEMES.AUTO:
                nextTheme = THEMES.LIGHT;
                break;
            case THEMES.LIGHT:
                nextTheme = THEMES.DARK;
                break;
            case THEMES.DARK:
                nextTheme = THEMES.AUTO;
                break;
            default:
                nextTheme = THEMES.AUTO;
        }
        
        setTheme(nextTheme);
    }
    
    // Initialize theme on page load
    function initTheme() {
        const storedTheme = getStoredTheme();
        applyTheme(storedTheme);
        updateToggleButton();
        updateThemeSelector();
    }
    
    // Listen for system theme changes
    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(() => {
            if (getStoredTheme() === THEMES.AUTO) {
                applyTheme(THEMES.AUTO);
            }
        });
    }
    
    // Make functions globally available
    window.toggleTheme = toggleTheme;
    window.setTheme = setTheme;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            watchSystemTheme();
        });
    } else {
        initTheme();
        watchSystemTheme();
    }
})();