export interface TrademarkSimilarityInput {
   business_name: string
   business_ncl_classes: string[]
   b64_image: string
}

export interface TrademarkSimilarityResponse {
   brand_name_analysis: BrandNameAnalysis[]
   consumed_tokens: number
   visual_analysis: VisualAnalysis[]
}

export interface BrandNameAnalysis {
   brand_name: string
   similarity: number
   similarity_description: string
   trademark_warning: boolean
   warning_level: WarningLevel
}

export interface VisualAnalysis {
   rpi_file_url: string
   similar_image: string
   similarity: number
   similarity_description: string
   trademark_warning: boolean
   warning_level: WarningLevel
}

export type WarningLevel = 'low' | 'medium' | 'high'
