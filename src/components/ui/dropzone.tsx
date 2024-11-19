'use client'
import { cn } from '@/src/lib/utils'
import { CloudUpload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

import React from 'react'

const Dropzone: React.FC<DropzoneProps> = ({ onDropFiles }: DropzoneProps) => {
   const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
      useDropzone({
         accept: { 'application/pdf': [] },
         onDrop: (acceptedFiles) => {
            console.log('acceptedFiles', acceptedFiles)
            onDropFiles(acceptedFiles)
         }
      })

   return (
      <div
         className={cn(
            'flex h-auto w-full flex-1 border-spacing-1 flex-col items-center justify-center rounded-lg border border-dashed border-white-500 bg-transparent py-8 transition-all duration-300',
            {
               'border-primary-default': isFocused,
               'border-green-500': isDragAccept,
               'border-red-500': isDragReject
            }
         )}
         {...getRootProps()}
      >
         <input {...getInputProps()} />
         <div className="flex flex-1 flex-col items-center justify-center">
            <CloudUpload className="my-2 h-8 w-8 text-black-500" />
            <p className="font-sf-pro-display text-base">
               <span className="cursor-default font-sf-pro-display font-semibold underline">
                  Clique para enviar
               </span>{' '}
               ou arraste e solte
            </p>
            <p className="font-sf-pro-display text-sm text-white-800">
               Tamanho máximo de 2GB.
            </p>
         </div>
      </div>
   )
}

type DropzoneProps = {
   onDropFiles: (files: File[]) => void
}

export { Dropzone }
