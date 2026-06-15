// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm "paper & pine" palette — calm, editorial, distinctive.
        light: {
          primary: '#1F6F5C',     // pine / teal — growth
          accent: '#C2724E',      // terracotta — warm highlight
          background: '#F5F1E8',  // warm paper
          surface: '#FFFDF8',     // warm white
          text: '#221E18',        // warm ink
          secondary: '#6B6456',   // muted warm grey
        },

        dark: {
          primary: '#6FC3AC',     // soft jade
          accent: '#E0A06F',      // warm sand
          background: '#141310',  // warm near-black
          surface: '#1E1B15',     // warm charcoal
          text: '#F1EBDF',        // warm off-white
          secondary: '#9C9482',   // muted sand-grey
        },

        pine: {
          50: '#eef6f3',
          100: '#d6ebe4',
          200: '#aed7c9',
          300: '#7dbcaa',
          400: '#4f9d88',
          500: '#1F6F5C',
          600: '#1a5d4d',
          700: '#174c40',
          800: '#143d34',
          900: '#11332c',
        },
        clay: {
          400: '#d08a6a',
          500: '#C2724E',
          600: '#a85e3d',
        },
      },

      backgroundImage: {
        // tonal (monochrome) gradients — refined, not "rainbow"
        'light-gradient': 'linear-gradient(135deg, #f7f3ea 0%, #f2ede2 100%)',
        'dark-gradient': 'linear-gradient(135deg, #15140f 0%, #1c1a14 100%)',
        'brand-gradient': 'linear-gradient(135deg, #237a66 0%, #1a5d4d 100%)',
        'brand-gradient-dark': 'linear-gradient(135deg, #6FC3AC 0%, #4f9d88 100%)',
        // very subtle single-hue ambient washes (replaces rainbow mesh)
        'wash-light':
          'radial-gradient(60rem 40rem at 85% -10%, rgba(31,111,92,0.08), transparent 60%), radial-gradient(50rem 36rem at 5% 110%, rgba(194,114,78,0.07), transparent 60%)',
        'wash-dark':
          'radial-gradient(60rem 40rem at 85% -10%, rgba(111,195,172,0.10), transparent 60%), radial-gradient(50rem 36rem at 5% 110%, rgba(224,160,111,0.08), transparent 60%)',
      },

      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },

      letterSpacing: {
        eyebrow: '0.24em',
      },

      boxShadow: {
        soft: '0 1px 2px rgba(34,30,24,0.04), 0 8px 24px -12px rgba(34,30,24,0.18)',
        card: '0 2px 4px rgba(34,30,24,0.04), 0 18px 40px -20px rgba(34,30,24,0.22)',
        lift: '0 30px 60px -28px rgba(31,111,92,0.35)',
      },

      borderRadius: {
        '4xl': '2rem',
      },

      animation: {
        fadeIn: 'fadeIn 1s ease-out both',
        subtleFloat: 'floatSubtle 6s ease-in-out infinite',
        float: 'float 12s ease-in-out infinite',
        slideDown: 'slideDown 0.35s cubic-bezier(0.22,1,0.36,1) both',
        spinSlow: 'spin 60s linear infinite',
        spinSlowRev: 'spinRev 90s linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        spinRev: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(14px, -10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
