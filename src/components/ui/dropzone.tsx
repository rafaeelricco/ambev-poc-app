'use client'
import { cn } from '@/src/lib/utils'
import { CloudUpload, Eye, FileText, Trash } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

import React from 'react'

const Dropzone: React.FC<DropzoneProps> = ({
   files,
   setFiles,
   maxSize,
   onDropFiles
}: DropzoneProps) => {
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
            'flex h-auto w-full flex-1 border-spacing-1 flex-col items-center justify-center rounded-lg border border-dashed border-white-500 bg-transparent p-4 transition-all duration-300 min-h-[120px] md:min-h-full',
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
               <CloudUpload className="my-2 h-6 w-6 text-black-500" />
               <p className="text-base">
                  <span className="cursor-default font-semibold underline">
                     Clique para enviar
                  </span>{' '}
                  ou arraste e solte
               </p>
               {maxSize && (
                  <p className="text-xs text-gray-500">
                     Tamanho máximo de {formatSize(maxSize)}.
                  </p>
               )}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center gap-4">
               <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  <span className="font-sf-pro-display text-sm font-semibold">
                     {files[0].name}
                  </span>
                  <span className="text-sm text-gray-500">
                     ({formatSize(files[0].size)})
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

const formatSize = (size: number): string => {
   if (size < 1024) {
      return size + ' bytes'
   } else if (size < Math.pow(1024, 2)) {
      return (size / 1024).toFixed(1) + 'KB'
   } else if (size < Math.pow(1024, 3)) {
      return (size / Math.pow(1024, 2)).toFixed(1) + 'MB'
   } else {
      return (size / Math.pow(1024, 3)).toFixed(1) + 'GB'
   }
}

type DropzoneProps = {
   files: File[]
   setFiles: (files: File[]) => void
   maxSize?: number
   onDropFiles: (files: File[]) => void
}

export { Dropzone }
