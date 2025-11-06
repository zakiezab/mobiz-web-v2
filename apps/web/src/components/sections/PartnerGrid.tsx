

import type {TechnologyPartner} from '@/lib/sanity.types'

interface PartnerGridProps {
  partners: TechnologyPartner[]
}

export function PartnerGrid({partners}: PartnerGridProps) {
  return (
    <div className="grid gap-8 border-t border-gray-200 pt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {partners.map((partner, index) => (
        <div
          key={partner._id || index}
          className="rounded-sm border border-gray-100 bg-white p-8 text-center"
        >
          {/* Partner logo placeholder - will be replaced with actual image when Sanity is populated */}
          <div className="mb-6 flex h-10 items-center justify-center">
            <div className="h-10 w-20 rounded bg-gray-100 text-sm font-semibold text-gray-400 flex items-center justify-center">
              {partner.name || 'Partner'}
            </div>
          </div>
          
          {partner.excerpt && (
            <p className="mb-4 text-sm text-gray-600 leading-relaxed">
              {partner.excerpt}
            </p>
          )}
          
          {partner.categories && partner.categories.length > 0 && (
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {partner.categories.join(' • ')}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}