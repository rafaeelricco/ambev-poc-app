import '@/src/styles/globals.css'

import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
   title: 'InspireIP - Registro de Propriedade Intelectual em Blockchain.',
   description:
      'Com a Inspire, você pode registrar e patentear sua propriedade intelectual com a tecnologia blockchain de forma rápida e segura.',
   keywords: [
      'propriedade intelectual',
      'blockchain',
      'registro de marca',
      'registro de patente',
      'direitos autorais',
      'segurança',
      'segredos comerciais',
      'registro'
   ],
   openGraph: {
      title: 'InspireIP - Registro de Propriedade Intelectual em Blockchain.',
      description:
         'Com a Inspire, você pode registrar e patentear sua propriedade intelectual com a tecnologia blockchain de forma rápida e segura.',
      images: [`${process.env.NEXT_PUBLIC_APP_URL}/svgs/logo/logo-inspire.svg`],
      type: 'website'
   },
   twitter: {
      card: 'summary_large_image',
      title: 'InspireIP - Registro de Propriedade Intelectual em Blockchain.',
      description:
         'Com a Inspire, você pode registrar e patentear sua propriedade intelectual com a tecnologia blockchain de forma rápida e segura.',
      images: [`${process.env.NEXT_PUBLIC_APP_URL}/svgs/logo/logo-inspire.svg`]
   },
   alternates: {
      canonical: process.env.NEXT_PUBLIC_APP_URL
   }
}

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="pt-BR" suppressHydrationWarning>
         <head>
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossOrigin="anonymous"
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
               rel="preload"
               href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
               as="style"
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
               href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
               rel="stylesheet"
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
            <link
               rel="preload"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
               as="style"
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
            <link
               rel="preload"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=favorite,home,search,settings&display=block"
               as="style"
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
            <link
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=favorite,home,search,settings&display=block"
               rel="stylesheet"
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
            <link
               rel="preload"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
               as="style"
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
         </head>
         <body className="antialiased bg-background-default dark:bg-dark-background-default">
            <Toaster />
            <ThemeProvider
               attribute="class"
               defaultTheme="light"
               enableSystem
               disableTransitionOnChange
            >
               {children}
            </ThemeProvider>
         </body>
      </html>
   )
}
