"use client";

import { useConsent } from "@/hooks/useConsent";

export function ConsentBanner() {
  const { acceptAll, rejectAll, hasConsented } = useConsent();

  // Don't show banner if user has already given consent
  if (hasConsented) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Privacy Notice:</span> We use
              cookies and similar technologies to help personalize content,
              tailor and measure ads, and provide a better experience. By
              clicking accept, you agree to this, as outlined in our{" "}
              <a
                href="/privacy"
                className="text-primary underline hover:text-primary-dark"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={rejectAll}
              className="rounded-sm border border-gray-300 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-700 transition hover:bg-gray-50"
            >
              Reject All
            </button>
            <button
              onClick={acceptAll}
              className="rounded-sm bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wide text-white transition hover:bg-primary-dark"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
