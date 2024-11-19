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
            neutral: {
               lightStroke: '#DBDBDB',
               black: '#2F2F2F',
               gray: '#6D6D6D',
               white: '#FAFAFA',
               lightGray: '#9D9D9D'
            },
            primary: {
               default: '#725AC2',
               light: '#9D8BDB',
               dark: '#6142C5',
               background: '#ECE7FF'
            },
            yellow: {
               default: '#F5C24C',
               light: '#FADD77',
               dark: '#EFC14C'
            },
            darkPurple: {
               default: '#292347',
               light: '#3F365C',
               dark: '#140935'
            },
            blue: {
               default: '#65ACE6',
               light: '#90C6F2',
               dark: '#6BA0DE',
               background: '#EAFEFF'
            },
            green: {
               default: '#059C3D',
               hover: '#23BD5C'
            },
            background: {
               default: '#F3FCFF'
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
