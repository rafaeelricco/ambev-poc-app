import {
   TrademarkSimilarityInput,
   TrademarkSimilarityResponse
} from '@/types/trademark-similarity'

export async function checkTrademarkSimilarity(
   data: TrademarkSimilarityInput
): Promise<TrademarkSimilarityResponse> {
   try {
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

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: TrademarkSimilarityResponse = await response.json()
      return result
   } catch (error) {
      console.error('Error checking trademark similarity:', error)
      throw error
   }
}
