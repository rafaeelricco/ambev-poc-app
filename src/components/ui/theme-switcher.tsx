'use client'

import { cn } from '@/src/lib/utils'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export const ThemeSwitch: React.FC = () => {
   const { theme, setTheme } = useTheme()
   const [mounted, setMounted] = useState(false)

   // Previne erro de hidratação montando o componente apenas no cliente
   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) {
      return null // ou um placeholder/skeleton
   }

   return (
      <div className="flex justify-center items-center">
         <div className="border dark:border-gray-500 rounded-full p-1 flex gap-1">
            <button
               onClick={() => setTheme('light')}
               className={cn(
                  'rounded-full h-6 w-6 transition-all duration-200',
                  'text-gray-500 dark:text-gray-500',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  'flex items-center justify-center',
                  'focus:outline-none',
                  theme === 'light' ? 'bg-gray-100 text-primary-light' : ''
               )}
            >
               <span
                  className="material-symbols-outlined text-base"
                  style={{ fontSize: '1.2rem' }}
               >
                  light_mode
               </span>
            </button>

            <button
               onClick={() => setTheme('system')}
               className={cn(
                  'rounded-full h-6 w-6 transition-all duration-200',
                  'text-gray-500 dark:hover:text-gray-300',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  'flex items-center justify-center',
                  'focus:outline-none',
                  theme === 'system' &&
                     'bg-gray-100 dark:bg-gray-700 text-primary-light dark:text-gray-300'
               )}
            >
               <span
                  className="material-symbols-outlined text-base text-gray-400 dark:text-gray-500"
                  style={{ fontSize: '1.2rem' }}
               >
                  desktop_windows
               </span>
            </button>

            <button
               onClick={() => setTheme('dark')}
               className={cn(
                  'rounded-full h-6 w-6 transition-all duration-200',
                  'text-gray-500 dark:text-gray-500',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  'flex items-center justify-center',
                  'focus:outline-none',
                  theme === 'dark'
                     ? 'bg-gray-100 dark:bg-gray-700 text-primary-light dark:text-secondary-default'
                     : ''
               )}
            >
               <span
                  className="material-symbols-outlined text-base text-gray-400 dark:text-gray-500"
                  style={{ fontSize: '1.2rem' }}
               >
                  dark_mode
               </span>
            </button>
         </div>
      </div>
   )
}
