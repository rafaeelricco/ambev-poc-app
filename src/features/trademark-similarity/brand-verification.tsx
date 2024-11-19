'use client'

import * as React from 'react'

import { Logo } from '@/components/svgs/logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog'
import { Dropzone } from '@/components/ui/dropzone'
import { Input } from '@/components/ui/input'
import {
   AlertCircle,
   AlertTriangle,
   Bell,
   CheckCircle,
   Edit,
   Eye,
   Settings,
   Trash2,
   User
} from 'lucide-react'

const BrandVerification: React.FC = () => {
   const [isLoading, setIsLoading] = React.useState(false)
   const [loadingMessage, setLoadingMessage] = React.useState('')
   const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
   const [brandName, setBrandName] = React.useState('')

   const brands = [
      {
         id: 1,
         name: 'Marca A',
         type: 'Nominativa',
         status: 'healthy',
         lastCheck: '2024-03-19',
         conflicts: []
      },
      {
         id: 2,
         name: 'Marca B',
         type: 'Mista',
         status: 'similar',
         lastCheck: '2024-03-19',
         conflicts: ['Conflito de texto: 80% similaridade']
      },
      {
         id: 3,
         name: 'Marca C',
         type: 'Figurativa',
         status: 'identical',
         lastCheck: '2024-03-19',
         conflicts: ['Conflito de imagem: marca idêntica encontrada']
      }
   ]

   const getStatusInfo = (status: string) => {
      switch (status) {
         case 'healthy':
            return {
               icon: <CheckCircle className="w-5 h-5 text-green-500" />,
               label: 'Sem colisões',
               badgeColor: 'bg-green-100 text-green-500'
            }
         case 'similar':
            return {
               icon: <AlertTriangle className="w-5 h-5 text-[#F5C24C]" />,
               label: 'Possíveis colisões',
               badgeColor: 'bg-yellow-100 text-[#F5C24C]'
            }
         case 'identical':
            return {
               icon: <AlertCircle className="w-5 h-5 text-red-500" />,
               label: 'Colisão detectada',
               badgeColor: 'bg-red-100 text-red-500'
            }
         default:
            return {
               icon: null,
               label: 'Não verificado',
               badgeColor: 'bg-gray-100 text-gray-500'
            }
      }
   }

   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         setSelectedImage(URL.createObjectURL(file))
      }
   }

   const simulateVerification = async () => {
      setIsLoading(true)
      const messages = [
         'Convertendo imagem...',
         'Verificando similaridade na base nacional...',
         'Registrando em blockchain...',
         'Quase lá...'
      ]

      for (const message of messages) {
         setLoadingMessage(message)
         await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setIsLoading(false)
      setLoadingMessage('')
   }

   return (
      <React.Fragment>
         <div className="min-h-screen bg-[#F3FCFF]">
            <nav className="w-full bg-white border-b border-[#DBDBDB] px-4 py-2">
               <div className="container flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                     <Logo className="w-32 h-8" />
                  </div>

                  <div className="flex items-center space-x-6">
                     <button className="p-2 hover:bg-[#ECE7FF] rounded-full transition-colors relative">
                        <Bell className="w-5 h-5 text-[#6D6D6D]" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-[#F5C24C] rounded-full"></span>
                     </button>
                     <button className="p-2 hover:bg-[#ECE7FF] rounded-full transition-colors">
                        <Settings className="w-5 h-5 text-[#6D6D6D]" />
                     </button>
                     <div className="flex items-center space-x-3 pl-6 border-l border-[#DBDBDB]">
                        <div className="w-8 h-8 rounded-full bg-[#ECE7FF] flex items-center justify-center">
                           <User className="w-5 h-5 text-[#725AC2]" />
                        </div>
                        <div className="hidden md:block">
                           <p className="text-sm font-medium text-[#2F2F2F]">
                              John Doe
                           </p>
                           <p className="text-xs text-[#9D9D9D]">Administrador</p>
                        </div>
                     </div>
                  </div>
               </div>
            </nav>

            <main className="container px-4 py-8">
               <Card className="mb-8">
                  <CardHeader>
                     <CardTitle>Verificar nova marca</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="grid md:grid-cols-2 gap-8">
                        <Dropzone
                           onDropFiles={(files) => {
                              console.log(files)
                           }}
                        />

                        <div className="flex flex-col space-y-4">
                           <div>
                              <label className="text-sm font-medium text-[#2F2F2F] mb-1 block">
                                 Nome da Marca
                              </label>
                              <Input
                                 value={brandName}
                                 onChange={(e) => setBrandName(e.target.value)}
                                 placeholder="Digite o nome da marca"
                                 className="w-full"
                              />
                           </div>
                           <Button
                              onClick={simulateVerification}
                              disabled={isLoading || !selectedImage || !brandName}
                              className="bg-[#725AC2] hover:bg-[#6142C5] text-white"
                           >
                              {isLoading ? loadingMessage : 'Verificar Marca'}
                           </Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader>
                     <CardTitle>Marcas monitoradas</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th className="px-4 py-3 text-left font-medium text-gray-600">
                                    Marca
                                 </th>
                                 <th className="px-4 py-3 text-left font-medium text-gray-600">
                                    Tipo
                                 </th>
                                 <th className="px-4 py-3 text-left font-medium text-gray-600">
                                    Status
                                 </th>
                                 <th className="px-4 py-3 text-left font-medium text-gray-600">
                                    Última Verificação
                                 </th>
                                 <th className="px-4 py-3 text-right font-medium text-gray-600">
                                    Ações
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200">
                              {brands.map((brand) => {
                                 const statusInfo = getStatusInfo(brand.status)

                                 return (
                                    <tr
                                       key={brand.id}
                                       className="bg-white hover:bg-gray-50"
                                    >
                                       <td className="px-4 py-3 font-medium text-gray-900">
                                          {brand.name}
                                       </td>
                                       <td className="px-4 py-3 text-gray-600">
                                          {brand.type}
                                       </td>
                                       <td className="px-4 py-3">
                                          <div className="flex items-center space-x-2">
                                             <Badge
                                                className={statusInfo.badgeColor}
                                             >
                                                {statusInfo.label}
                                             </Badge>
                                          </div>
                                       </td>
                                       <td className="px-4 py-3 text-gray-600">
                                          {new Date(
                                             brand.lastCheck
                                          ).toLocaleDateString()}
                                       </td>
                                       <td className="px-4 py-3">
                                          <div className="flex justify-end space-x-2">
                                             <button className="p-1 hover:bg-gray-100 rounded-full">
                                                <Eye className="w-4 h-4 text-[#725AC2]" />
                                             </button>
                                             <button className="p-1 hover:bg-gray-100 rounded-full">
                                                <Edit className="w-4 h-4 text-[#725AC2]" />
                                             </button>
                                             <button className="p-1 hover:bg-gray-100 rounded-full">
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                             </button>
                                          </div>
                                       </td>
                                    </tr>
                                 )
                              })}
                           </tbody>
                        </table>
                     </div>
                  </CardContent>
               </Card>
            </main>
         </div>
         <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                     This action cannot be undone. This will permanently delete your
                     account and remove your data from our servers.
                  </DialogDescription>
               </DialogHeader>
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}

export default BrandVerification
