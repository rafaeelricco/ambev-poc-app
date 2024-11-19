'use client'

import * as SwitchPrimitives from '@radix-ui/react-switch'
import * as React from 'react'

import { cn } from '@/lib/utils'

/* 

<div className="relative inline-block w-11 h-5">
               <input
                  id="switch-component-custom"
                  type="checkbox"
                  className="peer appearance-none w-11 h-4 bg-slate-100 border border-slate-300 rounded-full checked:bg-slate-800 checked:border-slate-800 cursor-pointer transition-colors duration-300"
               />
               <label
                  htmlFor="switch-component-custom"
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
               ></label>
            </div>
            
*/

const Switch = React.forwardRef<
   React.ElementRef<typeof SwitchPrimitives.Root>,
   React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
   <SwitchPrimitives.Root
      className={cn('relative inline-block w-11 h-5', className)}
      {...props}
      ref={ref}
   >
      <SwitchPrimitives.Thumb
         className={cn(
            'absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow transition-transform duration-300',
            'data-[state=checked]:translate-x-6 data-[state=checked]:border-blue-600',
            'data-[state=unchecked]:translate-x-0'
         )}
      />
      <span
         className={cn(
            'block w-11 h-4 bg-slate-100 border border-slate-300 rounded-full transition-colors duration-300',
            'data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600'
         )}
      />
   </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
