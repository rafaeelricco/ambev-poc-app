import * as React from 'react'

interface LoadingAnimationProps {
   messages: string[]
   duration?: number
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
   messages,
   duration = 20000
}) => {
   const phrasesRef = React.useRef<SVGGElement>(null)
   const loaderWrapperRef = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      const phrasesElement = phrasesRef.current
      if (!phrasesElement) return

      const startTime = Date.now()
      const verticalSpacing = 50
      let currentY = 0

      const checks = messages.map((_, i) => {
         return {
            check: document.getElementById(`loadingCheckSVG-${i}`),
            circle: document.getElementById(`loadingCheckCircleSVG-${i}`)
         }
      })

      const easeInOut = (t: number) => {
         const period = 200
         return (Math.sin(t / period + 100) + 1) / 2
      }

      const animateLoading = () => {
         const now = Date.now()
         currentY -= 1.35 * easeInOut(now)
         phrasesElement.setAttribute('transform', `translate(0 ${currentY})`)

         checks.forEach((check, i) => {
            const colorChangeBoundary = -i * verticalSpacing + verticalSpacing + 15
            if (currentY < colorChangeBoundary && check.circle && check.check) {
               const alpha = Math.max(
                  Math.min(1 - (currentY - colorChangeBoundary + 15) / 30, 1),
                  0
               )
               check.circle.setAttribute('fill', `rgba(114, 90, 194, ${alpha})`)
               const checkColor = [
                  Math.round(255 * (1 - alpha) + 120 * alpha),
                  Math.round(255 * (1 - alpha) + 154 * alpha)
               ]
               check.check.setAttribute(
                  'fill',
                  `rgba(255, ${checkColor[0]}, ${checkColor[1]}, 1)`
               )
            }
         })

         if (
            now - startTime < duration &&
            currentY > -messages.length * verticalSpacing
         ) {
            requestAnimationFrame(animateLoading)
         } else {
            // Animation completed
            loaderWrapperRef.current?.classList.add('loaded')
         }
      }

      requestAnimationFrame(animateLoading)
   }, [messages, duration])

   return (
      <div id="loader-wrapper" ref={loaderWrapperRef}>
         <div id="page">
            <div id="phrase_box">
               <svg width="100%" height="100%">
                  <defs>
                     <style type="text/css">
                        {`
                @font-face {
                  font-family: "Proxima";
                  src: url('');
                }
                `}
                     </style>
                  </defs>
                  <g width="100%" height="100%">
                     <g id="phrases" ref={phrasesRef}>
                        {messages.map((message, index) => (
                           <React.Fragment key={index}>
                              <text
                                 fill="black"
                                 x={50}
                                 y={30 + index * 50}
                                 fontSize={18}
                                 fontFamily="Arial"
                              >
                                 {message}...
                              </text>
                              <g
                                 transform={`translate(10, ${
                                    index * 50 + 10
                                 }) scale(0.9)`}
                              >
                                 <circle
                                    id={`loadingCheckCircleSVG-${index}`}
                                    fill="rgba(255,255,255,0)"
                                    cx={16}
                                    cy={16}
                                    r={15}
                                 />
                                 <polygon
                                    id={`loadingCheckSVG-${index}`}
                                    points="21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708"
                                    fill="whi"
                                 />
                                 <path
                                    d="M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z"
                                    fill="white"
                                 />
                              </g>
                           </React.Fragment>
                        ))}
                     </g>
                  </g>
               </svg>
            </div>
         </div>
      </div>
   )
}

export default LoadingAnimation
