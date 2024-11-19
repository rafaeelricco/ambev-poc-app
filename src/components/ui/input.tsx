'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

export const inputVariants = cva(
   [
      'peer block w-full min-h-[56px]',
      'px-[14px] py-[16.5px]',

      'text-base leading-6 tracking-[0.15px]',
      'text-black dark:text-white',

      'bg-transparent',
      'outline-2 outline-transparent',
      'border border-[#1212127f] dark:border-neutral-500 rounded-[4px]',
      'transition-colors duration-200 ease-linear',

      'focus-visible:border-primary-default',
      'focus-visible:ring-0',
      'focus-visible:border-2',
      'focus-visible:outline-2',
      'focus-visible:outline-offset-0',
      'focus-visible:outline-primary-default',

      'dark:focus-visible:border-dark-primary-default',
      'dark:focus-visible:outline-dark-primary-default',
      'dark:focus-visible:outline-2',
      'dark:focus-visible:border-2',
      'dark:focus-visible:outline-offset-0',

      'placeholder:opacity-0',
      'placeholder:transition-opacity placeholder:duration-200',
      'focus:placeholder:opacity-100',

      'disabled:cursor-not-allowed disabled:opacity-50',
      'disabled:bg-slate-50 disabled:border-slate-200 disabled:shadow-none',

      'read-only:bg-slate-50 read-only:border-slate-200',

      'invalid:border-red-500 invalid:text-red-600',
      'focus:invalid:border-red-500 focus:invalid:ring-red-500'
   ],
   {
      variants: {
         error: {
            true: 'border-red-500 dark:border-red-500 text-red-600 dark:text-red-600'
         }
      }
   }
)

export const labelVariants = cva(
   [
      'absolute left-[11px] top-[50%]',
      'pointer-events-none',
      '-translate-y-[50%]',
      'mb-0 max-w-[90%]',
      'origin-[0_0]',

      'truncate leading-6',
      'text-neutral-500',
      'dark:text-neutral-400',

      'bg-background-paper dark:bg-dark-background-paper px-1',
      'peer-disabled:bg-transparent peer-disabled:text-neutral-500',

      'peer-focus:top-1',
      'peer-focus:scale-75',
      'peer-focus:text-primary-default',
      'peer-focus:dark:text-dark-primary-default',

      'peer-[&:not(:placeholder-shown)]:top-1',
      'peer-[&:not(:placeholder-shown)]:scale-75',

      'peer-data-[twe-input-state-active]:top-1',
      'peer-data-[twe-input-state-active]:scale-75',

      'placeholder-opacity-0',

      'transition-all duration-200 ease-out',

      'peer-[&[data-autofilled="true"]]:top-1',
      'peer-[&[data-autofilled="true"]]:scale-75'
   ],
   {
      variants: {
         error: {
            true: 'text-red-500'
         }
      }
   }
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type: initialType, label, error, ...props }, ref) => {
      const isPassword = initialType === 'password'
      const [type, setType] = React.useState(initialType)

      const togglePassword = isPassword
         ? () => setType(type === 'password' ? 'text' : 'password')
         : undefined

      return (
         <React.Fragment>
            <div
               className="relative flex flex-col self-stretch p-0 isolate min-h-[61px] items-center justify-center"
               data-twe-input-wrapper-init
            >
               <input
                  type={type}
                  data-value={props.value}
                  data-type={type}
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoSave="off"
                  className={cn(inputVariants({ error: !!error }), className)}
                  aria-invalid={error ? 'true' : undefined}
                  ref={ref}
                  placeholder={label}
                  onAnimationStart={(e) => {
                     if (e.animationName === 'onAutoFillStart') {
                        ;(e.target as HTMLInputElement).setAttribute(
                           'data-autofilled',
                           'true'
                        )
                     }
                  }}
                  {...props}
               />
               {label && (
                  <label
                     htmlFor={props.id}
                     className={cn(labelVariants({ error: !!error }), className)}
                  >
                     {label}
                  </label>
               )}
               {isPassword && (
                  <button
                     type="button"
                     onClick={togglePassword}
                     className={cn(
                        'flex items-center justify-center',
                        'absolute right-3 top-1/2 -translate-y-1/2',
                        'text-neutral-500 hover:text-neutral-700',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-default',
                        'transition-colors duration-200 rounded-sm'
                     )}
                     aria-label={
                        type === 'password' ? 'Show password' : 'Hide password'
                     }
                  >
                     <span className="material-symbols-outlined text-neutral-500 dark:text-neutral-400">
                        {type === 'password' ? 'visibility' : 'visibility_off'}
                     </span>
                  </button>
               )}
            </div>
            {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
         </React.Fragment>
      )
   }
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string
   error?: string
}

Input.displayName = 'Input'

export { Input }
