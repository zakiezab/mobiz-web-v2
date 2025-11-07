interface RecognitionItem {
  label: string
  title: string
  source: string
}

interface RecognitionBarProps {
  items: RecognitionItem[]
}

export function RecognitionBar({items}: RecognitionBarProps) {
  return (
    <section className="bg-white dark:bg-dark py-16">
      <div className="mx-auto w-full max-w-container px-4 md:px-24 text-center">
        <div className="grid gap-16 md:grid-cols-3 rounded-3xl p-8 bg-gradient-to-l from-gray-50 dark:from-secondary-300/10 to-gray-100 dark:to-secondary-600/10 border border-gray-200 dark:border-secondary-200/20">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-base uppercase tracking-wider text-gray-500 dark:text-secondary-300 mb-5">
                {item.label}
              </div>
              <div className="!font-metrophobic text-3xl text-gray-900 dark:text-secondary-100 leading-tight tracking-tighter mb-2">
                {item.title}
              </div>
              <div className="text-base text-gray-600 dark:text-secondary-200">
                {item.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
