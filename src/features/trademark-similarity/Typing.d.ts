export interface Brand {
   id: number
   name: string
   type: 'Nominativa' | 'Mista' | 'Figurativa'
   status: 'healthy' | 'similar' | 'identical'
   lastCheck: string
   processNumber: string
   validUntil: string
   specialStatus?: string
   nclClass: string
   conflicts: string[]
}
