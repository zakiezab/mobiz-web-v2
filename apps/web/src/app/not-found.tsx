import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Mobiz",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-[600px] text-center">
        <div className="mb-8">
          <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-gray-500 mb-6">
            ERROR 404
          </p>
          <h1 className="text-5xl md:text-6xl font-extralight leading-tight tracking-tighter text-dark mb-6">
            Page Not Found
          </h1>
          <p className="text-xl font-light leading-relaxed text-gray-600 max-w-prose mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-block text-[15px] font-medium text-white bg-dark px-10 py-[18px] border-2 border-dark rounded-sm transition-all duration-200 hover:bg-transparent hover:text-dark"
          >
            Return Home
          </Link>
          <Link
            href="/execution"
            className="inline-block text-[15px] font-medium text-dark px-10 py-[18px] border-2 border-dark rounded-sm transition-all duration-200 hover:bg-dark hover:text-white"
          >
            Our Execution
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm font-light text-gray-500">
            Need help?{" "}
            <Link
              href="/#contact"
              className="text-dark underline hover:no-underline"
            >
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
