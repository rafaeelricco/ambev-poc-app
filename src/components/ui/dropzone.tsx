'use client'
import { cn } from '@/src/lib/utils'
import { CloudUpload, Eye, FileText, Trash } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

import React from 'react'

const Dropzone: React.FC<DropzoneProps> = ({ onDropFiles }: DropzoneProps) => {
   const [files, setFiles] = React.useState<File[]>([])

   const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
      useDropzone({
         multiple: false,
         accept: {
            'image/*': []
         },
         onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles)
            onDropFiles(acceptedFiles)
         }
      })

   return (
      <div
         className={cn(
            'flex h-auto w-full flex-1 border-spacing-1 flex-col items-center justify-center rounded-lg border border-dashed border-white-500 bg-transparent p-8 transition-all duration-300',
            {
               'border-primary-default': isFocused || files.length > 0,
               'border-green-500': isDragAccept,
               'border-red-500': isDragReject
            }
         )}
         {...getRootProps()}
      >
         <input {...getInputProps()} />
         {files.length === 0 ? (
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
         ) : (
            <div className="flex flex-col items-center justify-center gap-4">
               <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  <span className="font-sf-pro-display text-sm font-semibold">
                     {files[0].name}
                  </span>
                  <span className="text-sm text-gray-500">
                     ({(files[0].size / 1024).toFixed(2)} KB)
                  </span>
                  <Eye
                     className="h-5 w-5 cursor-pointer hover:text-primary-default"
                     onClick={(e) => {
                        e.stopPropagation()
                        window.open(URL.createObjectURL(files[0]), '_blank')
                     }}
                  />
                  <Trash
                     className="h-4 w-4 cursor-pointer hover:text-red-500"
                     onClick={(e) => {
                        e.stopPropagation()
                        setFiles([])
                        onDropFiles([])
                     }}
                  />
               </div>
            </div>
         )}
      </div>
   )
}

type DropzoneProps = {
   onDropFiles: (files: File[]) => void
}

export { Dropzone }
