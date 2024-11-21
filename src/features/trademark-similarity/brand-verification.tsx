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
import { TrademarkSimilarityResponse } from '@/src/types/trademark-similarity'
import { zodResolver } from '@hookform/resolvers/zod'
import {
   AlertCircle,
   AlertTriangle,
   Bell,
   CheckCircle,
   Edit,
   Eye,
   PlusCircle,
   Settings,
   Trash2,
   User,
   X
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Timeline } from './Timeline/Timeline'
import { TimelineData } from './Timeline/Typing'
import { Brand } from './Typing'

import BrandAnalysisResults from './brand-analysis-result'

const initialTimelineData: TimelineData[] = [
   {
      macro: {
         index: 0,
         label: 'Análise Inicial',
         status: 'awaiting',
         url: null,
         type: 'init',
         completed: false,
         in_progress: false
      },
      micro: [
         {
            label: 'Processando algoritmos de similaridade fonética e visual...',
            type: 'similarity',
            status: 'awaiting'
         },
         {
            label: 'Executando análise gráfica, fonética e ideológica...',
            type: 'analysis',
            status: 'awaiting'
         },
         {
            label: 'Aplicando métricas de distintividade conforme Art. 124 da LPI...',
            type: 'legal',
            status: 'awaiting'
         }
      ]
   },
   {
      macro: {
         index: 1,
         label: 'Análise de Colidência',
         status: 'awaiting',
         url: null,
         type: 'collision',
         completed: false,
         in_progress: false
      },
      micro: [
         {
            label: 'Analisando colidência em classes correlatas NCL(12)...',
            type: 'class_check',
            status: 'awaiting'
         },
         {
            label: 'Consultando base de dados do INPI em tempo real...',
            type: 'database',
            status: 'awaiting'
         },
         {
            label: 'Verificando possibilidade de confusão, associação ou diluição...',
            type: 'confusion',
            status: 'awaiting'
         }
      ]
   },
   {
      macro: {
         index: 2,
         label: 'Verificações Especiais',
         status: 'awaiting',
         url: null,
         type: 'special',
         completed: false,
         in_progress: false
      },
      micro: [
         {
            label: 'Verificando coexistência com marcas de alto renome...',
            type: 'highend',
            status: 'awaiting'
         },
         {
            label: 'Executando verificação de conflitos com indicações geográficas...',
            type: 'geographical',
            status: 'awaiting'
         },
         {
            label: 'Analisando potencial de confusão junto ao público consumidor...',
            type: 'consumer',
            status: 'awaiting'
         }
      ]
   },
   {
      macro: {
         index: 3,
         label: 'Registro Blockchain',
         status: 'awaiting',
         url: 'https://busca.inpi.gov.br/result',
         type: 'blockchain',
         completed: false,
         in_progress: false
      },
      micro: [
         {
            label: 'Preparando dados para registro em blockchain...',
            type: 'preparation',
            status: 'awaiting'
         },
         {
            label: 'Registrando análise na rede blockchain...',
            type: 'registration',
            status: 'awaiting'
         },
         {
            label: 'Gerando comprovante de registro digital...',
            type: 'receipt',
            status: 'awaiting'
         }
      ]
   }
]

const BrandVerification: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = React.useState(false)
   const [showResults, setShowResults] = React.useState(false)
   const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
   const [nclClassTemp, setNclClassTemp] = React.useState('')
   const [apiResponse, setApiResponse] =
      React.useState<TrademarkSimilarityResponse | null>(null)
   const [brands] = React.useState<Brand[]>([
      {
         id: 2,
         name: 'BRAHMA',
         type: 'Mista',
         status: 'healthy',
         lastCheck: '2024-03-19',
         processNumber: '829097732',
         validUntil: '2030-02-17',
         nclClass: '32',
         conflicts: []
      },
      {
         id: 3,
         name: 'Antártica Soda Limonada',
         type: 'Mista',
         status: 'healthy',
         lastCheck: '2024-03-19',
         processNumber: '922577340',
         validUntil: '2032-03-03',
         nclClass: '32',
         conflicts: []
      },
      {
         id: 4,
         name: 'Sukita guaraná',
         type: 'Mista',
         status: 'healthy',
         lastCheck: '2024-03-19',
         processNumber: '922316287',
         validUntil: '2032-01-25',
         nclClass: '32',
         conflicts: []
      }
   ])
   const [timelineData, setTimelineData] =
      React.useState<TimelineData[]>(initialTimelineData)

   const form = useForm<TrademarkVerificationForm>({
      resolver: zodResolver(trademarkVerificationSchema),
      defaultValues: {
         business_name: '',
         business_ncl_classes: [],
         b64_image: ''
      }
   })

   const handleNclKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         addNclClass()
      }
   }

   const addNclClass = () => {
      if (nclClassTemp && nclClassTemp.trim() !== '') {
         const newClasses = nclClassTemp
            .split(',')
            .map((cls) => cls.trim())
            .filter(
               (cls) =>
                  cls !== '' && !form.getValues('business_ncl_classes').includes(cls)
            )

         if (newClasses.length > 0) {
            form.setValue('business_ncl_classes', [
               ...(form.getValues('business_ncl_classes') || []),
               ...newClasses
            ])
         }
         setNclClassTemp('')
      }
   }

   const removeNclClass = (indexToRemove: number) => {
      const currentClasses = form.getValues('business_ncl_classes')
      form.setValue(
         'business_ncl_classes',
         currentClasses.filter((_, index) => index !== indexToRemove)
      )
   }

   const getRandomDelay = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
   }

   const updateMicroStep = (
      stageIndex: number,
      microIndex: number,
      status: 'success' | 'awaiting' | 'error'
   ) => {
      setTimelineData((prev) =>
         prev.map((stage, index) => {
            if (index === stageIndex) {
               return {
                  ...stage,
                  micro: stage.micro.map((item, mIndex) => ({
                     ...item,
                     status: mIndex === microIndex ? status : item.status
                  }))
               }
            }
            return stage
         })
      )
   }

   const updateTimelineStage = async (
      stageIndex: number,
      status: 'success' | 'awaiting' | 'error',
      totalTime: number = 5000
   ) => {
      // Set initial state
      setTimelineData((prev) =>
         prev.map((stage, index) => {
            if (index === stageIndex) {
               return {
                  ...stage,
                  macro: {
                     ...stage.macro,
                     status,
                     completed: false,
                     in_progress: status === 'awaiting'
                  },
                  micro: stage.micro.map((item) => ({
                     ...item,
                     status: 'awaiting'
                  }))
               }
            }
            return stage
         })
      )

      // Process micro steps
      if (status === 'awaiting') {
         const stage = timelineData[stageIndex]
         const microSteps = stage.micro.length
         const microDelays: number[] = []

         // Generate random delays that sum up to totalTime
         let remainingTime = totalTime
         for (let i = 0; i < microSteps - 1; i++) {
            const maxDelay = remainingTime - (microSteps - i - 1) * 500 // Ensure minimum 500ms for remaining steps
            const delay = getRandomDelay(500, maxDelay)
            microDelays.push(delay)
            remainingTime -= delay
         }
         microDelays.push(remainingTime)

         // Process each micro step
         for (let i = 0; i < microSteps; i++) {
            await new Promise((resolve) => setTimeout(resolve, microDelays[i]))
            updateMicroStep(stageIndex, i, 'success')
         }

         // Update macro status after all micro steps are complete
         setTimelineData((prev) =>
            prev.map((stage, index) => {
               if (index === stageIndex) {
                  return {
                     ...stage,
                     macro: {
                        ...stage.macro,
                        status: 'success',
                        completed: true,
                        in_progress: false
                     }
                  }
               }
               return stage
            })
         )
      }
   }

   async function onSubmit(data: TrademarkVerificationForm) {
      try {
         setIsModalOpen(true)
         setShowResults(false)

         // Stage 1: Initial Analysis
         await updateTimelineStage(0, 'awaiting', 5000)

         // Stage 2: Collision Analysis
         const payload = {
            business_name: data.business_name,
            business_ncl_classes: data.business_ncl_classes,
            b64_image: data.b64_image
         }
         await updateTimelineStage(1, 'awaiting', 5000)

         // Stage 3: Special Verifications
         await updateTimelineStage(2, 'awaiting', 5000)
         const result = await checkTrademarkSimilarity(payload)
         setApiResponse(result)

         // Stage 4: Blockchain Registration
         await updateTimelineStage(3, 'awaiting', 3000)

         await new Promise((resolve) => setTimeout(resolve, 2000))

         toast.success('Marca verificada com sucesso!', { duration: 10000 })
         setShowResults(true)
         form.reset()
         setSelectedImage(null)
         setTimelineData(initialTimelineData)
      } catch (error) {
         // Update current stage to error
         const currentStage = timelineData.findIndex(
            (stage) => stage.macro.status === 'awaiting' || stage.macro.in_progress
         )
         if (currentStage !== -1) {
            updateTimelineStage(currentStage, 'error')
         }

         console.error('Verification failed:', error)
         toast.error('Erro ao verificar a marca')
      } finally {
         setIsModalOpen(false)
      }
   }

   const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = () => {
            const base64String = reader.result as string
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
                              Caroline Nunes
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
                                             <div className="space-y-2">
                                                <div className="flex">
                                                   <Input
                                                      type="text"
                                                      placeholder="Digite a classe da marca"
                                                      className="w-full"
                                                      value={nclClassTemp}
                                                      onChange={(e) =>
                                                         setNclClassTemp(
                                                            e.target.value
                                                         )
                                                      }
                                                      onKeyDown={handleNclKeyDown}
                                                   />
                                                   <Button
                                                      type="button"
                                                      variant="outline"
                                                      className="ml-2 px-2 py-0 border-[#725AC2] hover:bg-[#ECE7FF] flex items-center gap-1"
                                                      onClick={addNclClass}
                                                   >
                                                      <PlusCircle className="w-3 text-[#725AC2]" />
                                                      <span className="font-semibold text-xs text-[#725AC2]">
                                                         Adicionar
                                                      </span>
                                                   </Button>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                   {field.value.map((cls, index) => (
                                                      <div
                                                         key={index}
                                                         className="border rounded-md border-[#DBDBDB] flex items-center px-2 py-1 bg-white"
                                                      >
                                                         <X
                                                            className="w-4 h-4 text-[#6D6D6D] hover:text-red-500 cursor-pointer mr-1"
                                                            onClick={() =>
                                                               removeNclClass(index)
                                                            }
                                                         />
                                                         <span className="text-sm text-[#2F2F2F]">
                                                            {cls}
                                                         </span>
                                                      </div>
                                                   ))}
                                                </div>
                                             </div>
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid">
                                 <Button
                                    type="submit"
                                    className="bg-[#725AC2] hover:bg-[#6142C5] text-white col-span-2"
                                 >
                                    Verificar marca
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
                     <div className="hidden md:block overflow-x-auto">
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
                     <div className="md:hidden space-y-4">
                        {brands.map((brand) => {
                           const statusInfo = getStatusInfo(brand.status)

                           return (
                              <div
                                 key={brand.id}
                                 className="bg-white rounded-lg shadow p-4 space-y-3"
                              >
                                 <div className="flex justify-between items-start">
                                    <div>
                                       <h3 className="font-medium text-gray-900">
                                          {brand.name}
                                       </h3>
                                       <p className="text-sm text-gray-600">
                                          {brand.type}
                                       </p>
                                    </div>
                                    <div className="flex gap-2">
                                       <button className="p-1.5 hover:bg-gray-100 rounded-full">
                                          <Eye className="w-4 h-4 text-[#725AC2]" />
                                       </button>
                                       <button className="p-1.5 hover:bg-gray-100 rounded-full">
                                          <Edit className="w-4 h-4 text-[#725AC2]" />
                                       </button>
                                       <button className="p-1.5 hover:bg-gray-100 rounded-full">
                                          <Trash2 className="w-4 h-4 text-red-500" />
                                       </button>
                                    </div>
                                 </div>

                                 <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                       <span className="text-sm text-gray-600">
                                          Status:
                                       </span>
                                       <Badge className={statusInfo.badgeColor}>
                                          {statusInfo.label}
                                       </Badge>
                                    </div>

                                    <div className="flex justify-between items-center">
                                       <span className="text-sm text-gray-600">
                                          Última verificação:
                                       </span>
                                       <span className="text-sm">
                                          {new Date(
                                             brand.lastCheck
                                          ).toLocaleDateString()}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           )
                        })}
                     </div>
                  </CardContent>
               </Card>
            </main>
         </div>
         <Dialog
            open={isModalOpen}
            onOpenChange={(open) => {
               setIsModalOpen(open)
               setTimelineData(initialTimelineData)
            }}
         >
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
               <div>
                  <Timeline timelineData={timelineData} />
               </div>
            </DialogContent>
         </Dialog>
         <Dialog
            open={showResults}
            onOpenChange={(open) => {
               setShowResults(open)
               setTimelineData(initialTimelineData)
            }}
         >
            <DialogContent>
               <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-semibold">
                     Resultado da verificação
                  </DialogTitle>
                  <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none">
                     <X className="h-6 w-6" />
                     <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
               </div>
               <div>
                  {apiResponse && <BrandAnalysisResults data={apiResponse} />}
               </div>
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}

const trademarkVerificationSchema = z.object({
   business_name: z.string().min(1, {
      message: 'O nome da marca é obrigatório'
   }),
   business_ncl_classes: z.array(z.string()).min(1, {
      message: 'Informe pelo menos uma classe NCL'
   }),
   b64_image: z.string().optional()
})

type TrademarkVerificationForm = z.infer<typeof trademarkVerificationSchema>

export default BrandVerification
