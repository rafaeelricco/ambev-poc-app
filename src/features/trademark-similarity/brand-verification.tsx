'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'
import * as z from 'zod'

import { Logo } from '@/components/svgs/logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Dropzone } from '@/components/ui/dropzone'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { checkTrademarkSimilarity } from '@/features/trademark-similarity/api/trademark-similarity'
import { zodResolver } from '@hookform/resolvers/zod'
import {
   AlertCircle,
   AlertTriangle,
   Bell,
   CheckCircle,
   Edit,
   Eye,
   Settings,
   Trash2,
   User,
   X
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import LoadingAnimation from '@/features/trademark-similarity/components/loading-animation'

const BrandVerification: React.FC = () => {
   const [isLoading, setIsLoading] = React.useState({
      submit: false
   })
   const [isModalOpen, setIsModalOpen] = React.useState(false)
   const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
   const [brands, setBrands] = React.useState([
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
   ])

   const form = useForm<TrademarkVerificationForm>({
      resolver: zodResolver(trademarkVerificationSchema),
      defaultValues: {
         business_name: '',
         business_ncl_classes: [],
         b64_image: ''
      }
   })

   async function onSubmit(data: TrademarkVerificationForm) {
      try {
         console.log('Starting trademark verification process...')
         setIsLoading({ ...isLoading, submit: true })
         setIsModalOpen(true)

         console.log(
            'Form data:',
            JSON.stringify(
               {
                  business_name: data.business_name,
                  business_ncl_classes: data.business_ncl_classes,
                  imageSize: data.b64_image.length
               },
               null,
               2
            )
         )

         const payload = {
            business_name: data.business_name,
            business_ncl_classes: data.business_ncl_classes,
            b64_image: data.b64_image
         }

         console.log('Sending request to API:', JSON.stringify(payload, null, 2))
         const result = await checkTrademarkSimilarity(payload)
         console.log('API Response:', JSON.stringify(result, null, 2))

         // Aqui você pode atualizar o estado das marcas monitoradas com o resultado
         // setBrands([...brands, novoResultado])

         // Handle success
         toast.success('Marca verificada com sucesso!', { duration: 10000 })

         console.log('Verification completed successfully')
         // Reset the form
         form.reset()
         setSelectedImage(null)
      } catch (error) {
         console.error('Verification failed:', error)
         console.error('Error details:', error)
         // Handle error
         toast.error('Erro ao verificar a marca')
      } finally {
         console.log('Cleaning up verification process...')
         setIsLoading({ ...isLoading, submit: false })
         setIsModalOpen(false)
      }
   }

   const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = () => {
            const base64String = reader.result as string
            // Remove the data:image/[type];base64, prefix
            const finalBase64 = base64String.split(',')[1]
            resolve(finalBase64)
         }
         reader.onerror = (error) => {
            console.error('Error converting to base64:', error)
            reject(error)
         }
      })
   }

   const handleDropFiles = async (files: File[]) => {
      if (files.length > 0) {
         const file = files[0]
         const url = URL.createObjectURL(file)
         setSelectedImage(url)

         const base64Image = await convertToBase64(file)
         form.setValue('b64_image', base64Image)
      }
   }

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

   React.useEffect(() => {
      return () => {
         if (selectedImage) {
            URL.revokeObjectURL(selectedImage)
         }
      }
   }, [selectedImage])

   return (
      <React.Fragment>
         <div className="min-h-screen bg-[#F3FCFF]">
            <nav className="w-full bg-white border-b border-[#DBDBDB] px-4 py-4">
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
                        <Dropzone onDropFiles={handleDropFiles} />
                        <Form {...form}>
                           <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-4"
                           >
                              <div className="grid gap-4">
                                 <FormField
                                    control={form.control}
                                    name="business_name"
                                    render={({ field }) => (
                                       <FormItem>
                                          <Label className="text-sm font-medium text-[#2F2F2F] mb-1 block">
                                             Nome da Marca
                                          </Label>
                                          <FormControl>
                                             <Input
                                                type="text"
                                                placeholder="Digite o nome da marca"
                                                className="w-full"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="business_ncl_classes"
                                    render={({ field }) => (
                                       <FormItem>
                                          <Label className="text-sm font-medium text-[#2F2F2F] mb-1 block">
                                             Classe da marca
                                          </Label>
                                          <FormControl>
                                             <Input
                                                type="text"
                                                placeholder="Digite a classe da marca"
                                                className="w-full"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid">
                                 <Button
                                    type="submit"
                                    disabled={isLoading.submit}
                                    className="bg-[#725AC2] hover:bg-[#6142C5] text-white col-span-2"
                                 >
                                    {isLoading.submit
                                       ? 'Verificando...'
                                       : 'Verificar Marca'}
                                 </Button>
                              </div>
                           </form>
                        </Form>
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
         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
               <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-semibold">
                     Verificando marca
                  </DialogTitle>
                  <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none">
                     <X className="h-6 w-6" />
                     <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
               </div>
               <LoadingAnimation messages={messages_test} duration={30000} />
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}

const messages_test = [
   'Processando algoritmos de similaridade fonética e visual...',
   'Consultando base de dados do INPI em tempo real...',
   'Aplicando métricas de distintividade conforme Art. 124 da LPI...',
   'Analisando colidência em classes correlatas NCL(12)...',
   'Executando verificação de anterioridade marcária...',
   'Processando parâmetros de confusão e associação indevida...',
   'Realizando análise semântica conforme Resolução 248/2019...',
   'Verificando possibilidade de confusão, associação ou diluição...',
   'Aplicando jurisprudência do INPI à análise comparativa...',
   'Avaliando grau de distintividade e força da marca...',
   'Executando análise gráfica, fonética e ideológica...',
   'Processando índices de semelhança conforme Manual de Marcas...',
   'Verificando coexistência com marcas de alto renome...',
   'Aplicando critérios da Convenção da União de Paris...',
   'Realizando busca de impedimentos legais Art. 124 a 126...'
]

const trademarkVerificationSchema = z.object({
   business_name: z.string().min(1, {
      message: 'O nome da marca é obrigatório'
   }),
   business_ncl_classes: z.array(z.string()).min(1, {
      message: 'Selecione pelo menos uma classe NCL'
   }),
   b64_image: z.string().min(1, {
      message: 'A imagem da marca é obrigatória'
   })
})

type TrademarkVerificationForm = z.infer<typeof trademarkVerificationSchema>

export default BrandVerification
