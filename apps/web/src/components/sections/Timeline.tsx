interface TimelineDeliverable {
  title: string
}

interface TimelineItem {
  number: string
  phase: string
  title: string
  description: string
  deliverables: TimelineDeliverable[]
}

interface TimelineProps {
  label: string
  title: string
  items: TimelineItem[]
}

export function Timeline({label, title, items}: TimelineProps) {
  return (
    <section className="bg-gray-50 py-24 md:py-32">
      <div className="page-container">
        <div className="section-header mb-20">
          <p className="section-label">{label}</p>
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-10 top-0 h-full w-0.5 bg-gray-200 md:left-12" />
          
          <div className="space-y-20">
            {items.map((item, index) => (
              <div key={index} className="relative grid gap-12 md:grid-cols-[80px_1fr] md:gap-16">
                {/* Timeline marker */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-white text-xl font-semibold text-primary md:h-20 md:w-20">
                  {item.number}
                </div>
                
                {/* Timeline content */}
                <div className="space-y-6 pt-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    {item.phase}
                  </div>
                  <h3 className="text-2xl font-medium text-dark md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 md:text-lg">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {item.deliverables.map((deliverable, deliverableIndex) => (
                      <span
                        key={deliverableIndex}
                        className="rounded-sm border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
                      >
                        {deliverable.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}