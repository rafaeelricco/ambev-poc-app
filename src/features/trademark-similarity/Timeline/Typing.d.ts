type SocketMessageResponse = {
   message: TimelineData[]
   status: string
   action: string
}

interface TimelineData {
   macro: {
      index: number
      label: string
      status: 'error' | 'awaiting' | 'success'
      url: string | null
      type: string
      completed: boolean
      in_progress?: boolean
   }
   micro: {
      label: string
      type: string
      status: 'error' | 'awaiting' | 'success'
   }[]
}

export type TimelineDataArray = TimelineData[]

type TimeLineProps = {
   timelineData?: TimelineData[]
}

export type Status =
   | 'success'
   | 'error'
   | 'awaiting'
   | 'in_progress'
   | 'next'
   | 'completed'

type MacroItemProps = {
   id: string
   label: string
   status?: string
   url: string | null
   ref: React.Ref<HTMLDivElement>
}

type MicroItemProps = {
   id: string
   status?: 'error' | 'awaiting' | 'success'
   label: string
   loading?: boolean
}
