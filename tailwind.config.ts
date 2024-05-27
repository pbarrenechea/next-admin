import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        danger: {
          50: '#FFF7F7',
          100: '#FEEFEF',
          200: '#FCD6D7',
          300: '#FABBBD',
          400: '#F68B8D',
          500: '#F1595C',
          600: '#D75052',
          700: '#913638',
          800: '#6D292A',
          900: '#461A1B',
        },
        warning: {
          50: '#FFFAF8',
          100: '#FFF4F1',
          200: '#FEE4DA',
          300: '#FDD2C3',
          400: '#FCB298',
          500: '#FA916B',
          600: '#DF8260',
          700: '#965741',
          800: '#714231',
          900: '#492B20',
        },
        info: {
          50: '#F3FEFF',
          100: '#E7FEFF',
          200: '#C5FDFF',
          300: '#A3FCFF',
          400: '#5FF9FF',
          500: '#0CE7FA',
          600: '#00B8D4',
          700: '#007A8D',
          800: '#005E67',
          900: '#003F42',
        },
        success: {
          50: '#F3FEF8',
          100: '#E7FDF1',
          200: '#C5FBE3',
          300: '#A3F9D5',
          400: '#5FF5B1',
          500: '#50C793',
          600: '#3F9A7A',
          700: '#2E6D61',
          800: '#1F4B47',
          900: '#0F2A2E',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        base: '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
        base2: '0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16)',
        base3: '16px 10px 40px rgba(15, 23, 42, 0.22)',
        deep: '-2px 0px 8px rgba(0, 0, 0, 0.16)',
        dropdown: '0px 4px 8px rgba(0, 0, 0, 0.08)',
        testi: '0px 4px 24px rgba(0, 0, 0, 0.06)',
        todo: 'rgba(235 233 241, 0.6) 0px 3px 10px 0px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
