'use client'

interface PartnerItem {
  name: string
  color: string
  image?: string
}

interface PartnersBarProps {
  label: string
  partners: PartnerItem[]
}

export function PartnersBar({label, partners}: PartnersBarProps) {
  return (
    <section className="bg-secondary-800 dark:bg-dark py-16">
      <div className="page-container space-y-8">
        <p className="text-center text-2xl uppercase tracking-widest text-secondary-200 dark:text-secondary-200 mb-6">
          {label}
        </p>
        <div className="grid gap-6 text-center md:grid-cols-5">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center min-h-[60px]">
              {partner.image ? (
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    console.error('Failed to load image:', partner.image);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div style={{color: partner.color}} className="uppercase text-lg font-medium">
                  {partner.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
