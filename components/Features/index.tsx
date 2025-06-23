import { MotionHighlight } from '@/components/animate-ui/effects/motion-highlight'
import { iconMap } from '@/lib/iconMap'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { TypingText } from '@/components/animate-ui/text/typing'

export default function Features({ features }: { features: any }) {
  console.log('featuresList', features)
  return (
    <>
      <h2 className="text-3xl font-bold mb-10 text-center">
        <TypingText inView text={`✨ ${features.label}`} cursor />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MotionHighlight hover className="rounded-xl">
          {features.featuresList.map((feature: any, i: any) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <div key={i} className="p-4 flex flex-col border rounded-xl">
                <AnimateIcon animateOnHover animation="path-loop">
                  <div>
                    <div className="flex items-center justify-around size-10 rounded-lg bg-blue-500/10 mb-2">
                      {Icon && <Icon className="size-5 text-blue-500" />}
                    </div>
                    <p className="text-base font-medium mb-1">
                      {feature.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </AnimateIcon>
              </div>
            )
          })}
        </MotionHighlight>
      </div>
    </>
  )
}
