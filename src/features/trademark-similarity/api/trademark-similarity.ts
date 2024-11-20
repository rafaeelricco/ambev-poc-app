import {
   TrademarkSimilarityInput,
   TrademarkSimilarityResponse
} from '@/types/trademark-similarity'

export async function checkTrademarkSimilarity(
   data: TrademarkSimilarityInput
): Promise<TrademarkSimilarityResponse> {
   try {
      console.log(
         'Making API request to:',
         `${process.env.NEXT_PUBLIC_API_URL}/trademark-similarity`
      )
      console.log('Request payload:', {
         business_name: data.business_name,
         business_ncl_classes: data.business_ncl_classes,
         b64_image_length: data.b64_image?.length
      })

      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/trademark-similarity`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         }
      )

      console.log('API response status:', response.status)

      if (!response.ok) {
         console.error('API error response:', {
            status: response.status,
            statusText: response.statusText
         })
         throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: TrademarkSimilarityResponse = await response.json()
      console.log('API response parsed successfully:', {
         brandAnalysisCount: result.brand_name_analysis?.length,
         visualAnalysisCount: result.visual_analysis?.length,
         consumedTokens: result.consumed_tokens
      })

      return result
   } catch (error) {
      console.error('Error in checkTrademarkSimilarity:', error)
      console.error('Error details:', {
         message: error instanceof Error ? error.message : 'Unknown error',
         stack: error instanceof Error ? error.stack : undefined
      })
      throw error
   }
}
