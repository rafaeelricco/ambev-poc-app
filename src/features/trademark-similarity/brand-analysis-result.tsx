import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrademarkSimilarityResponse } from '@/types/trademark-similarity'
import { FileText, Image } from 'lucide-react'

interface BrandAnalysisResultsProps {
   data: TrademarkSimilarityResponse
}

const EmptyState = ({ message }: { message: string }) => (
   <div className="flex flex-col items-center justify-center py-8 text-gray-500">
      <p className="text-center">{message}</p>
   </div>
)

const BrandAnalysisResults: React.FC<BrandAnalysisResultsProps> = ({ data }) => {
   const getWarningColor = (level: string) => {
      switch (level) {
         case 'high':
            return {
               badge: 'bg-red-100 text-red-600',
               bg: 'bg-red-50'
            }
         case 'medium':
            return {
               badge: 'bg-yellow-100 text-yellow-600',
               bg: 'bg-yellow-50'
            }
         default:
            return {
               badge: 'bg-green-100 text-green-600',
               icon: null,
               bg: 'bg-green-50'
            }
      }
   }

   const hasTextualAnalysis = data.brand_name_analysis.length > 0
   const hasVisualAnalysis = data.visual_analysis.length > 0

   return (
      <React.Fragment>
         <div className="max-w-7xl mx-auto">
            <p className="text-[#6D6D6D] mb-6">
               Análise realizada em {new Date().toLocaleDateString()}
            </p>

            {/* Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <Card>
                  <CardContent className="pt-6">
                     <div className="text-4xl font-bold text-[#725AC2] mb-2">
                        {data.brand_name_analysis.length}
                     </div>
                     <div className="text-sm text-[#6D6D6D]">
                        Similaridades textuais
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className="pt-6">
                     <div className="text-4xl font-bold text-[#725AC2] mb-2">
                        {data.visual_analysis.length}
                     </div>
                     <div className="text-sm text-[#6D6D6D]">
                        Similaridades visuais
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className="pt-6">
                     <div className="text-4xl font-bold text-red-500 mb-2">
                        {
                           data.brand_name_analysis.filter(
                              (item) => item.warning_level === 'high'
                           ).length
                        }
                     </div>
                     <div className="text-sm text-[#6D6D6D]">
                        Alertas de alto risco
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Análise Textual */}
            <Card className="mb-8">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <FileText className="w-5 h-5" />
                     Análise de similaridade textual
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  {hasTextualAnalysis ? (
                     <div className="space-y-6">
                        {data.brand_name_analysis.map((item, index) => {
                           const warningStyle = getWarningColor(item.warning_level)
                           return (
                              <div
                                 key={index}
                                 className={`rounded-lg p-4 ${warningStyle.bg}`}
                              >
                                 <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                       {warningStyle.icon}
                                       <div>
                                          <h3 className="text-lg font-medium text-[#2F2F2F]">
                                             {item.brand_name}
                                          </h3>
                                          <Badge className={warningStyle.badge}>
                                             {(item.similarity * 100).toFixed(0)}% de
                                             similaridade
                                          </Badge>
                                       </div>
                                    </div>
                                 </div>
                                 <p className="text-[#2F2F2F] text-sm">
                                    {item.similarity_description}
                                 </p>
                              </div>
                           )
                        })}
                     </div>
                  ) : (
                     <EmptyState message="Nenhuma similaridade textual encontrada para esta marca." />
                  )}
               </CardContent>
            </Card>

            {/* Análise Visual */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Image className="w-5 h-5" />
                     Análise de similaridade visual
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  {hasVisualAnalysis ? (
                     <div className="space-y-6">
                        {data.visual_analysis.map((item, index) => {
                           const warningStyle = getWarningColor(item.warning_level)
                           return (
                              <div
                                 key={index}
                                 className={`rounded-lg p-4 space-y-4 ${warningStyle.bg}`}
                              >
                                 <div className="w-48 h-fit max-h-48 flex-shrink-0">
                                    <img
                                       src={`data:image/jpeg;base64,${item.similar_image}`}
                                       alt="Similar trademark"
                                       className="w-48 h-fit object-contain rounded-lg"
                                    />
                                 </div>
                                 <div className="flex items-start gap-6">
                                    <div className="flex-grow">
                                       <div className="flex items-center gap-3 mb-2">
                                          {warningStyle.icon}
                                          <div>
                                             <Badge className={warningStyle.badge}>
                                                {(item.similarity * 100).toFixed(0)}%
                                                de similaridade
                                             </Badge>
                                             <a
                                                href={item.rpi_file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#725AC2] text-sm ml-4 hover:underline"
                                             >
                                                Ver registro no INPI
                                             </a>
                                          </div>
                                       </div>
                                       <p className="text-[#2F2F2F] text-sm">
                                          {item.similarity_description}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           )
                        })}
                     </div>
                  ) : (
                     <EmptyState message="Nenhuma similaridade visual encontrada para esta marca." />
                  )}
               </CardContent>
            </Card>
         </div>
      </React.Fragment>
   )
}

export default BrandAnalysisResults
