import type { Config } from 'tailwindcss'

const config: Config = {
   darkMode: 'class',
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/ui/**/*.{js,ts,jsx,tsx,mdx}',
      './src/features/**/*.{js,ts,jsx,tsx,mdx}'
   ],
   theme: {
      extend: {
         container: {
            center: true,
            padding: '1rem',
            screens: {
               '2xl': '1400px'
            }
         },
         colors: {
            primary: {
               default: '#1057E1',
               light: '#4179E7',
               contrast: '#FAFAFA'
            },
            secondary: {
               default: '#19B26B',
               light: '#61D8A1',
               contrast: '#121212'
            },
            error: {
               default: '#D32F2F',
               light: '#EF5350',
               contrast: '#FAFAFA'
            },
            warning: {
               default: '#EF6C00',
               light: '#FF9800',
               contrast: '#FAFAFA'
            },
            info: {
               default: '#0288D1',
               light: '#03A9F4',
               contrast: '#FAFAFA'
            },
            success: {
               default: '#19B26B',
               light: '#4DE89D',
               contrast: '#FAFAFA'
            },
            common: {
               white: '#FAFAFA',
               black: '#121212'
            },
            divider: '#0000001F',
            text: {
               primary: '#121212',
               secondary: '#757575',
               disabled: '#E0E0E0'
            },
            action: {
               active: '#1212128F',
               hover: '#1212120A',
               selected: '#0000001F',
               disabled: '#12121261',
               disabledBg: '#1212121F',
               focus: '#1212121F'
            },
            background: {
               default: '#FAFAFA',
               paper: '#FAFAFA'
            },
            dark: {
               primary: {
                  default: '#19B26B',
                  light: '#61D8A1',
                  contrast: '#121212'
               },
               secondary: {
                  default: '#1057E1',
                  light: '#4179E7',
                  contrast: '#FAFAFA'
               },
               error: {
                  default: '#D32F2F',
                  light: '#EF5350',
                  contrast: '#FAFAFA'
               },
               warning: {
                  default: '#EF6C00',
                  light: '#FF9800',
                  contrast: '#FAFAFA'
               },
               info: {
                  default: '#0288D1',
                  light: '#03A9F4',
                  contrast: '#FAFAFA'
               },
               success: {
                  default: '#19B26B',
                  light: '#4DE89D',
                  contrast: '#FAFAFA'
               },
               common: {
                  white: '#FAFAFA',
                  black: '#121212'
               },
               divider: '#0000001F',
               text: {
                  primary: '#FAFAFA',
                  secondary: '#BDBDBD',
                  disabled: '#E0E0E0'
               },
               action: {
                  active: '#FAFAFA',
                  hover: '#FAFAFA0A',
                  selected: '#FFFFFF1F',
                  disabled: '#FAFAFA61',
                  disabledBg: '#FAFAFA1F',
                  focus: '#FAFAFA1F'
               },
               background: {
                  default: '#1C2939',
                  paper: '#1C2939'
               }
            },
            sidebar: {
               DEFAULT: 'hsl(var(--sidebar-background))',
               foreground: 'hsl(var(--sidebar-foreground))',
               primary: 'hsl(var(--sidebar-primary))',
               'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
               accent: 'hsl(var(--sidebar-accent))',
               'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
               border: 'hsl(var(--sidebar-border))',
               ring: 'hsl(var(--sidebar-ring))'
            }
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)'
         },
         keyframes: {
            'accordion-down': {
               from: {
                  height: '0'
               },
               to: {
                  height: 'var(--radix-accordion-content-height)'
               }
            },
            'accordion-up': {
               from: {
                  height: 'var(--radix-accordion-content-height)'
               },
               to: {
                  height: '0'
               }
            }
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out'
         },
         fontFamily: {
            montserrat: ['Montserrat', 'sans-serif'],
            nunito: ['Nunito', 'sans-serif']
         },
         boxShadow: {
            'elevation-8':
               '0px 0px 14px 2px rgba(0, 0, 0, 0.12), 0px 0px 10px 1px rgba(0, 0, 0, 0.14), 0px 0px 5px -3px rgba(0, 0, 0, 0.20)'
         }
      }
   },
   plugins: [require('tailwindcss-animate')]
}

export default config
