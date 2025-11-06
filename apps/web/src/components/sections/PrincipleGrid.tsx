interface Principle {
  title: string
  description: string
}

interface PrincipleGridProps {
  label: string
  title: string
  principles: Principle[]
}

export function PrincipleGrid({label, title, principles}: PrincipleGridProps) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="page-container">
        <div className="section-header mb-20">
          <p className="section-label">{label}</p>
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <div key={index} className="border-t-2 border-primary pt-8">
              <h3 className="mb-4 text-xl font-medium text-dark md:text-2xl">
                {principle.title}
              </h3>
              <p className="text-base text-gray-600 md:text-lg">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}