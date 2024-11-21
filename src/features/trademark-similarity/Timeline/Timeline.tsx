import {
   MacroItemProps,
   MicroItemProps,
   Status,
   TimeLineProps,
   TimelineData
} from '@/features/trademark-similarity/Timeline/Typing'
import { Button } from '@/src/components/ui/button'
import { Separator } from '@/src/components/ui/separator'
import { cn } from '@/src/lib/utils'

import Spinner from '@/features/trademark-similarity/Timeline/Loading/Spinner'
import React from 'react'

const Timeline: React.FC<TimeLineProps> = ({ timelineData }: TimeLineProps) => {
   const items_container_ref = React.useRef<HTMLDivElement>(null)
   const refs = React.useRef<(HTMLDivElement | null)[]>([])

   const getMacroItemStatus = (items: TimelineData[], index: number): Status => {
      const item = items[index]
      if (item.macro.in_progress) return 'in_progress'
      if (item.macro.completed) return 'success'
      return 'awaiting'
   }

   const getMicroItemStatus = (
      items: TimelineData[],
      macroIndex: number,
      microIndex: number
   ): Status => {
      const item = items[macroIndex]
      if (!item.macro.in_progress) return item.micro[microIndex].status as Status

      const microItems = item.micro

      if (microItems[microIndex].status === 'error') return 'error'

      const lastSuccessIndex = microItems.findLastIndex(
         (item) => item.status === 'success'
      )

      if (lastSuccessIndex === -1) {
         return microIndex === 0 ? 'in_progress' : 'awaiting'
      } else if (microIndex <= lastSuccessIndex) {
         return 'success'
      } else if (microIndex === lastSuccessIndex + 1) {
         return 'in_progress'
      } else {
         return 'awaiting'
      }
   }

   const [height, setHeight] = React.useState(0)

   React.useEffect(() => {
      const calcLineHeight = () => {
         if (
            timelineData &&
            Array.isArray(timelineData) &&
            timelineData.length > 0
         ) {
            let totalHeight = 0
            let allCompleted = true

            for (let i = 0; i < timelineData.length; i++) {
               const macroItem = timelineData[i]?.macro

               if (!macroItem) {
                  console.warn(`Macro item at index ${i} is undefined`)
                  continue
               }

               if (macroItem.completed && !macroItem.in_progress) {
                  const lastSuccessItem = refs.current
                     .filter(
                        (item) =>
                           item?.id &&
                           item.id.startsWith(`micro_${i}_`) &&
                           item.id.includes('success')
                     )
                     .pop()

                  if (lastSuccessItem && items_container_ref.current) {
                     const container_top =
                        items_container_ref.current.getBoundingClientRect().top
                     const item_bottom =
                        lastSuccessItem.getBoundingClientRect().bottom
                     totalHeight = Math.max(
                        totalHeight,
                        Math.abs(item_bottom - container_top)
                     )
                  }
               } else {
                  allCompleted = false
                  const inProgressOrErrorItem = refs.current?.find(
                     (item) =>
                        item?.id &&
                        item.id.startsWith(`micro_${i}_`) &&
                        (item.id.includes('in_progress') ||
                           item.id.includes('error'))
                  )

                  if (inProgressOrErrorItem && items_container_ref.current) {
                     const container_top =
                        items_container_ref.current.getBoundingClientRect().top
                     const item_top =
                        inProgressOrErrorItem.getBoundingClientRect().top
                     totalHeight = Math.max(
                        totalHeight,
                        Math.abs(item_top - container_top)
                     )
                  }
                  break
               }
            }

            if (totalHeight > 0) {
               setHeight(totalHeight + (allCompleted ? 0 : 4))
            }
         }
      }

      calcLineHeight()
   }, [timelineData])

   return (
      <React.Fragment>
         <div className="relative">
            <div ref={items_container_ref} className="relative z-20 space-y-10">
               {Array.isArray(timelineData) &&
                  timelineData.map((item, macroIndex) => {
                     const macroRefIndex = macroIndex
                     let microStartIndex =
                        timelineData.length +
                        timelineData
                           .slice(0, macroIndex)
                           .reduce((sum, item) => sum + item.micro.length, 0)

                     return (
                        <div key={macroIndex} className="space-y-4">
                           <MacroItem
                              {...item.macro}
                              id={`macro_${getMacroItemStatus(
                                 timelineData,
                                 macroIndex
                              )}`}
                              ref={(el) => {
                                 if (el) refs.current[macroRefIndex] = el
                              }}
                              status={
                                 item.macro.completed ? 'success' : item.macro.status
                              }
                              url={item.macro.url}
                           />
                           {item.micro.map((microItem, microIndex) => {
                              const refIndex = microStartIndex + microIndex
                              return (
                                 <MicroItem
                                    key={microIndex}
                                    label={microItem.label}
                                    status={
                                       microItem.status as MicroItemProps['status']
                                    }
                                    loading={
                                       getMacroItemStatus(
                                          timelineData,
                                          macroIndex
                                       ) === 'in_progress' &&
                                       getMicroItemStatus(
                                          timelineData,
                                          macroIndex,
                                          microIndex
                                       ) === 'in_progress'
                                    }
                                    id={`micro_${macroIndex}_${microIndex}_${getMicroItemStatus(
                                       timelineData,
                                       macroIndex,
                                       microIndex
                                    )}`}
                                    ref={(el) => {
                                       if (el)
                                          refs.current[refIndex] =
                                             el as HTMLDivElement
                                    }}
                                 />
                              )
                           })}
                        </div>
                     )
                  })}
            </div>
            {Array.isArray(timelineData) && (
               <React.Fragment>
                  <Separator
                     className="absolute bg-green-500 top-0 ml-[11px] w-[1.5px] z-10"
                     style={{ height: height, transition: 'height 2s' }}
                  />
                  <Separator
                     orientation="vertical"
                     className="absolute bg-gray-300/75 top-0 ml-[11px] w-[1.5px] -z-10"
                     style={{
                        height:
                           Number(items_container_ref?.current?.clientHeight || 0) -
                           4
                     }}
                  />
               </React.Fragment>
            )}
         </div>
      </React.Fragment>
   )
}

const MacroItem = React.forwardRef<HTMLDivElement, MacroItemProps>(
   ({ label, url, status = 'awaiting', id }, ref) => {
      const mapping_icons_by_status = {
         success: 'check_circle',
         error: 'dangerous',
         awaiting: 'check_circle'
      }
      return (
         <div id={id} className="flex items-center gap-2" ref={ref}>
            <span
               className={cn('material-symbols-outlined bg-white', {
                  'text-green-500': status === 'success',
                  'text-red-500': status === 'error',
                  'text-gray-500': status === 'awaiting'
               })}
               style={{
                  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
               }}
            >
               {
                  mapping_icons_by_status[
                     status as keyof typeof mapping_icons_by_status
                  ]
               }
            </span>
            <p className="text-base font-semibold text-gray-main">{label}</p>
            {url && (
               <Button
                  variant="outline"
                  className="p-0 px-2 h-6 w-fit"
                  onClick={() => {
                     if (typeof window !== 'undefined') {
                        window.open(url, '_blank')
                     }
                  }}
               >
                  <span className="text-sm">Ver na blockchain</span>
                  <span className="material-symbols-outlined !text-[16px]">
                     open_in_new
                  </span>
               </Button>
            )}
         </div>
      )
   }
)

MacroItem.displayName = 'MacroItem'

const MicroItem = React.forwardRef<HTMLDivElement, MicroItemProps>(
   ({ label, status = 'awaiting', id, loading = false }, ref) => {
      return (
         <div
            id={id}
            ref={ref}
            className={cn(
               'grid grid-flow-col justify-start items-center gap-2 ml-[6px]',
               {
                  'ml-0': loading
               }
            )}
         >
            {loading ? (
               <div className="bg-white p-[1px] ml-[4px] flex items-center">
                  <Spinner
                     size="1rem"
                     className={cn(
                        'border-transparent',
                        'after:border-r-status-green'
                     )}
                  />
               </div>
            ) : (
               <div
                  className={cn('w-3 h-3 rounded-full', {
                     'bg-green-500': status === 'success',
                     'bg-red-500': status === 'error',
                     'bg-gray-500': status === 'awaiting'
                  })}
               />
            )}
            <p className="text-sm text-gray-main">{label}</p>
         </div>
      )
   }
)

MicroItem.displayName = 'MicroItem'

export { Timeline }
