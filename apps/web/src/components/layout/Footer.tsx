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

          {/* What We Execute Column */}
          <div>
            <h4 className="text-sm tracking-wider uppercase text-gray-500 dark:text-secondary-300 mb-6">
              What We Execute
            </h4>
            <Link
              href="/#services"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Cloud Transformation
            </Link>
            <Link
              href="/#services"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              AI & Data Platforms
            </Link>
            <Link
              href="/#services"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Digital Product Engineering
            </Link>
            <Link
              href="/#services"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Core System Modernization
            </Link>
          </div>

          {/* About Mobiz Column */}
          <div>
            <h4 className="text-sm tracking-wider uppercase text-gray-500 dark:text-secondary-300 mb-6">
              About Mobiz
            </h4>
            <Link
              href="/#model"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Our Model
            </Link>
            <Link
              href="/#delivered"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Delivered Value
            </Link>
            <Link
              href="#"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Thought Leadership
            </Link>
            <Link
              href="#"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Careers
            </Link>
          </div>

          {/* Industries Column */}
          <div>
            <h4 className="text-sm tracking-wider uppercase text-gray-500 dark:text-secondary-300 mb-6">
              Industries
            </h4>
            <Link
              href="/#industries"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Financial Services
            </Link>
            <Link
              href="/#industries"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Healthcare
            </Link>
            <Link
              href="/#industries"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Manufacturing
            </Link>
            <Link
              href="/#industries"
              className="block text-sm font-light text-gray-600 dark:text-secondary-200 mb-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-primary-300"
            >
              Energy & Utilities
            </Link>
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
