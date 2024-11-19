'use client'

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeSwitch } from '@/components/ui/theme-switcher'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
} from '@/components/ui/tooltip'

import React from 'react'

export default function Home() {
   return (
      <React.Fragment>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <ThemeSwitch />
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>Hover</TooltipTrigger>
                  <TooltipContent>
                     <p className="text-sm text-white">Add to library</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Drawer direction="right">
               <DrawerTrigger>Open</DrawerTrigger>
               <DrawerContent className="max-w-xl bg-white fixed w-[40rem] h-screen overflow-y-scroll overflow-x-hidden flex flex-col top-0 right-0 z-[1000] py-12 2xl:py-14 px-12 focus:outline-none">
                  <DrawerHeader>
                     <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                     <DrawerDescription>
                        This action cannot be undone.
                     </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                     <Button>Submit</Button>
                     <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                     </DrawerClose>
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <div>
               <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Leilão Mais</h4>
                  <p className="text-sm text-muted-foreground">
                     Sistema completo para gestão de leilões automotivos.
                  </p>
               </div>
               <Separator className="my-4" />
               <div className="flex h-5 items-center space-x-4 text-sm">
                  <div>Início</div>
                  <Separator orientation="vertical" />
                  <div>Sobre</div>
                  <Separator orientation="vertical" />
                  <div>Contato</div>
               </div>
            </div>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Tabs defaultValue="account" className="w-[400px]">
               <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
               </TabsList>
               <TabsContent value="account">
                  Make changes to your account here.
               </TabsContent>
               <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Checkbox label="Sem Termo de Apreensão" />
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Select>
               <SelectTrigger hideIcon className="w-fit border-none p-0">
                  <Button asChild variant="ghost">
                     <div className="flex !flex-row items-center gap-2">
                        <span>Filtrar</span>
                        <span className="material-symbols-outlined text-[1.5rem]">
                           filter_alt
                        </span>
                     </div>
                  </Button>
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
               </SelectContent>
            </Select>
         </div>
         <div className="m-2 rounded-md p-2 border border-primary-default border-dashed space-y-2">
            <Button variant="destructive">Click me</Button>
            <Button variant="default">Click me</Button>
            <Button variant="secondary">Click me</Button>
            <Button variant="outline">Click me</Button>
            <Button variant="ghost">Click me</Button>
            <Button variant="link">Click me</Button>
            <Button loading>Click me</Button>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Input label="E-mail" placeholder="Placeholder" type="text" />
            <Input label="Label" placeholder="Placeholder" type="password" />
            <Input label="Email" type="email" />
            <Input label="Email" type="email" error="Error" />
            <Input label="Email" type="email" disabled />
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Accordion type="single" collapsible>
               <AccordionItem value="item-1">
                  <AccordionTrigger>Pré-leilão</AccordionTrigger>
                  <AccordionContent>Opções de pré-leilão</AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </React.Fragment>
   )
}
