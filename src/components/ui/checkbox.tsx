'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
   React.ElementRef<typeof CheckboxPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
      label?: string
   }
>(({ className, label, id, ...props }, ref) =>
   label ? (
      <div className="flex items-center gap-2">
         <CheckboxPrimitive.Root
            ref={ref}
            id={id}
            className={cn(
               'peer h-4 w-4 shrink-0 gap-0 flex rounded-sm border border-text-secondary ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-default data-[state=checked]:bg-primary-default data-[state=checked]:text-common-white dark:border-neutral-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=checked]:border-neutral-50 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=checked]:text-neutral-900',
               className
            )}
            {...props}
         >
            <CheckboxPrimitive.Indicator
               className={cn(
                  'flex items-center gap-0 flex-grow justify-center w-3 h-4 p-0 m-0'
               )}
            >
               <span className="material-symbols-outlined text-white !text-[16px]">
                  check
               </span>
            </CheckboxPrimitive.Indicator>
         </CheckboxPrimitive.Root>
         <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
         >
            {label}
         </label>
      </div>
   ) : (
      <CheckboxPrimitive.Root
         ref={ref}
         className={cn(
            'peer h-4 w-4 shrink-0 gap-0 flex flex-grow rounded-sm border border-text-secondary ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-default data-[state=checked]:bg-primary-default data-[state=checked]:text-common-white dark:border-neutral-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=checked]:border-neutral-50 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=checked]:text-neutral-900',
            className
         )}
         {...props}
      >
         <CheckboxPrimitive.Indicator
            className={cn(
               'flex items-center gap-0 flex-grow justify-center w-3 h-4 p-0 m-0'
            )}
         >
            <span className="material-symbols-outlined text-white !text-[16px]">
               check
            </span>
         </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
   )
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
