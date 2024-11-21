import { SpinnerProps } from '@/features/trademark-similarity/Timeline/Loading/Typing'
import { cn } from '@/src/lib/utils'

import React from 'react'
/**
 * @notice The Spinner component provides a visual representation of a loading state.
 * @param {Object} props The properties provided to the component.
 * @param {string} [props.color='white'] The color of the spinner.
 * @param {string} [props.size='24px'] The width and height of the spinner.
 * @param {string} [props.borderWidth='3px'] The border width of the spinner.
 */
const Spinner: React.FC<SpinnerProps> = ({
   size = '24px',
   borderWidth = '3px',
   className
}: SpinnerProps) => {
   const style = {
      width: size,
      height: size,
      borderWidth: borderWidth
   }

   return (
      <span
         className={cn(
            'border-[#c5c5c5] rounded-full relative inline-block',
            'after:content-[""] after:block after:absolute after:inset-[-3px]',
            'after:rounded-full after:border-[3px] after:border-solid',
            'after:border-t-transparent after:border-r-white-main after:border-b-white-main after:border-l-transparent',
            'after:animate-spin',
            className
         )}
         style={style}
      ></span>
   )
}

export default Spinner
