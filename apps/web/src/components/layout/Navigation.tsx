"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { AnimatedThemeToggler } from "@/registry/magicui/animated-theme-toggler";
import { ScrollGradientOverlay } from "../sections/ScrollGradientOverlay";

const LINKS = [
  { href: "/#model", label: "Our Model" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/#delivered", label: "Delivered Value" },
  { href: "/#industries", label: "Industries" },
  { href: "/technology-partners", label: "Technology & Partners" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Handle smooth scrolling for anchor links only (not regular page links)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the clicked element or its parent is a link
      const link = target.closest('a');
      if (link) {
        const href = link.getAttribute("href");
        if (!href) return;
        
        // Handle anchor links (starting with "#" or "/#section" format)
        if (href.startsWith("#") || (href.startsWith("/#") && href.length > 2)) {
          e.preventDefault();
          // Extract the hash from href (handles both "#section" and "/#section")
          const hash = href.startsWith("/#") ? href.substring(2) : href.substring(1);
          const element = document.querySelector(`#${hash}`);
          if (element) {
            // Use requestAnimationFrame to ensure accurate position calculation
            window.requestAnimationFrame(() => {
              // Get the element's position relative to the document
              const elementRect = element.getBoundingClientRect();
              const elementTop = elementRect.top + window.pageYOffset;
              // Scroll to the exact top of the element
              window.scrollTo({
                top: elementTop,
                behavior: "smooth",
              });
            });
            // Close menu if open
            setMenuOpen(false);
          }
        } else {
          // For regular page links (like /services, /technology-partners, etc.), just close the menu
          // Next.js will handle the navigation normally
          setMenuOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-300 ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md" : ""
          }`}
      >
        {/* Scroll-based gradient overlay - fixed at top of viewport, fades in on scroll */}
      <ScrollGradientOverlay />
        <nav
          className={`w-full max-w-container mx-auto flex items-center px-4 md:px-16 2xl:px-6 justify-between text-sm text-dark transition-all duration-300 ${scrolled ? "py-4" : "py-7"
            }`}
        >
          <div className="z-50">
            <Link
              href="/"
              className="text-2xl font-semibold -tracking-tight text-primary "
            >
              <img 
                src="/logo/logo-white.svg" 
                alt="Mobiz" 
                width={100} 
                height={100}
                className={`hidden dark:block transition-all duration-500 ${scrolled ? "w-[90px]" : "w-[100px]"}`} 
              />
              <img 
                src="/logo/logo-default.svg" 
                alt="Mobiz" 
                width={100} 
                height={100}
                className={`block dark:hidden transition-all duration-500 ${scrolled ? "w-[90px]" : "w-[100px]"}`} 
              />
            </Link>
          </div>
          <ul className="hidden items-center gap-12">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-normal text-gray-100 tracking-wide transition-colors duration-200 hover:text-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-8 pl-4">
            {/* Theme Toggler */}
            <AnimatedThemeToggler />
            {/* Hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="relative z-50 h-14 w-14 items-center justify-center rounded-lg transition-all duration-700 bg-gray-200/50 dark:bg-secondary/10 hover:bg-gray-300/50 dark:hover:bg-secondary-100/10 px-4"
            >
              <span className={`block h-0.5 w-6 bg-secondary-800 dark:bg-secondary-100 transition-transform duration-500 ${menuOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`block my-1 h-0.5 w-6 bg-secondary-800 dark:bg-secondary-100 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-6 bg-secondary-800 dark:bg-secondary-100 transition-transform duration-500 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </nav>
      </header>
      {/* Fullscreen overlay menu - positioned outside header so it covers full viewport */}
      <div
        className={`fixed inset-0 z-40 bg-secondary-100/95 dark:bg-dark/95 w-screen h-screen transition-opacity duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex h-full w-full px-4 md:px-24 items-center justify-end">
          <ul className="flex flex-col gap-6 md:gap-10 text-3xl md:text-5xl text-right">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="tracking-wide text-gray-900 dark:text-secondary-100 transition-colors duration-200 hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button 
                href="#contact"
                className="flex items-center gap-2 hover:gap-4 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Start the conversation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
