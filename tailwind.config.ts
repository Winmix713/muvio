import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration
 * 
 * This configuration extends the default Tailwind setup with custom
 * colors, animations, and other theme customizations for the sports app.
 */
export default {
  // Core configuration
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",

  theme: {
    // Container configuration
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },

    extend: {
      /**
       * Color System
       * 
       * Organized into:
       * 1. Base UI colors (border, input, background, etc.)
       * 2. Semantic colors (primary, secondary, etc.)
       * 3. Component-specific colors (sidebar)
       * 4. Brand/Sports colors with consistent naming
       */
      colors: {
        // Base UI colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Semantic colors
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        
        // Component colors
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        
        // Sidebar-specific colors
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        
        // Brand/Sports-specific colors
        sports: {
          // Blue palette
          blue: '#0ea5e9',
          'blue-dark': '#0284c7',
          
          // Green palette
          green: '#10b981',
          'green-dark': '#059669',
          
          // Accent palette
          accent: '#f59e0b',
          'accent-dark': '#d97706',
        }
      },

      /**
       * Border Radius System
       * 
       * Consistent radius system based on a root variable
       */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },

      /**
       * Animation Keyframes
       * 
       * Organized by animation type:
       * 1. UI component animations (accordion)
       * 2. Transition animations (fade, scale)
       * 3. Movement animations (slide)
       * 4. Effect animations (shimmer, blur, pulse)
       */
      keyframes: {
        // UI component animations
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        
        // Transition animations
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-out': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '50%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          }
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        
        // Movement animations
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        
        // Effect animations
        'shimmer': {
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        'blur-in': {
          '0%': {
            opacity: '0',
            filter: 'blur(10px)'
          },
          '100%': {
            opacity: '1',
            filter: 'blur(0)'
          }
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.8'
          }
        }
      },

      /**
       * Animation Definitions
       * 
       * Maps keyframes to named animations with timing functions
       */
      animation: {
        // Component animations
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        
        // Fade animations
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-fast': 'fade-in 0.3s ease-out forwards',
        'fade-in-out': 'fade-in-out 2s ease-out infinite',
        
        // Movement and transition animations
        'scale-in': 'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        
        // Effect animations
        'shimmer': 'shimmer 2s infinite',
        'blur-in': 'blur-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite'
      }
    }
  },

  /**
   * Plugins
   */
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

