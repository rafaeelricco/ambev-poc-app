'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Drawer as DrawerPrimitive } from 'vaul'

const Drawer = ({
   shouldScaleBackground = true,
   ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
   <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Overlay>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Overlay
      ref={ref}
      className={cn(
         'fixed inset-0 bg-[#00000080] backdrop-blur-[2px] z-40',
         className
      )}
      {...props}
   />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
      showSnapPoint?: boolean
   }
>(({ className, children, showSnapPoint = false, ...props }, ref) => (
   <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
         ref={ref}
         className={cn(
            'bg-white-main fixed w-[40rem] h-screen overflow-y-scroll overflow-x-hidden flex flex-col top-0 right-0 z-[1000] py-12 2xl:py-14 px-12 focus:outline-none',
            className
         )}
         {...props}
      >
         {showSnapPoint && (
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-neutral-100 dark:bg-neutral-800" />
         )}
         {children}
      </DrawerPrimitive.Content>
   </DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
      {...props}
   />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Title>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Title
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
   />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Description>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Description
      ref={ref}
      className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
      {...props}
   />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerPortal,
   DrawerTitle,
   DrawerTrigger
}
