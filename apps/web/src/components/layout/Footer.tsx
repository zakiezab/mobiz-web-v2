import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative z-10 pt-20 pb-10 bg-gray-50 dark:bg-dark text-gray-600 dark:text-gray-400">
      <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10 pb-10 border-b border-gray-200 dark:border-secondary-300/50">
          {/* Brand Column */}
          <div>
            <div className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              <Link
                href="/"
                className="text-2xl font-semibold -tracking-tight text-primary "
              >
                <img 
                  src="/logo/logo-default.svg" 
                  alt="Mobiz" 
                  width={100} 
                  height={100}
                  className="block dark:hidden"
                />
                <img 
                  src="/logo/logo-red-white.svg" 
                  alt="Mobiz" 
                  width={100} 
                  height={100}
                  className="hidden dark:block"
                />
              </Link>
            </div>
            <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-secondary-200 max-w-[360px]">
              Strategy is speculation. Execution is truth. We are the execution partner for technology leaders.
            </p>
          </div>

          
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 Mobiz. Execution Partner.
          </div>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-primary dark:hover:text-primary-300">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-primary dark:hover:text-primary-300">
              Terms
            </Link>
            <Link href="#" className="transition-colors duration-200 hover:text-primary-300">
              <Image src="images/icons/Facebook.svg" alt="Facebook" width={20} height={20} />
            </Link>
            <Link href="#" className="transition-colors duration-200 hover:text-primary-300">
              <Image src="images/icons/Youtube.svg" alt="Youtube" width={20} height={20} />
            </Link>
            <Link href="#" className="transition-colors duration-200 hover:text-primary-300">
              <Image src="images/icons/Linkedin.svg" alt="LinkedIn" width={20} height={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
