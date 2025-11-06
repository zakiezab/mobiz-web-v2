"use client";

import { useState, useEffect } from "react";

interface ConsentState {
  analytics: boolean;
  functional: boolean;
}

interface ConsentContextType {
  consent: ConsentState;
  updateConsent: (type: keyof ConsentState, value: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  hasConsented: boolean;
}

const defaultConsent: ConsentState = {
  analytics: false,
  functional: false,
};

const readStoredConsent = (): {
  consent: ConsentState;
  hasConsented: boolean;
} => {
  if (typeof window === "undefined") {
    return { consent: defaultConsent, hasConsented: false };
  }

  const stored = window.localStorage.getItem("mobiz-consent");
  if (!stored) {
    return { consent: defaultConsent, hasConsented: false };
  }

  try {
    const parsed = JSON.parse(stored) as ConsentState;
    return { consent: { ...defaultConsent, ...parsed }, hasConsented: true };
  } catch (error) {
    console.warn("Failed to parse stored consent", error);
    return { consent: defaultConsent, hasConsented: false };
  }
};

export function useConsent(): ConsentContextType {
  const { consent: initialConsent, hasConsented: initialHasConsented } =
    readStoredConsent();

  const [consent, setConsent] = useState<ConsentState>(initialConsent);
  const [hasConsented, setHasConsented] = useState(initialHasConsented);

  useEffect(() => {
    // Save consent to localStorage whenever it changes
    if (hasConsented) {
      window.localStorage.setItem("mobiz-consent", JSON.stringify(consent));

      // Update Google Analytics consent
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: consent.analytics ? "granted" : "denied",
          functionality_storage: consent.functional ? "granted" : "denied",
        });
      }
    }
  }, [consent, hasConsented]);

  const updateConsent = (type: keyof ConsentState, value: boolean) => {
    setConsent((prev) => ({ ...prev, [type]: value }));
    if (!hasConsented) setHasConsented(true);
  };

  const acceptAll = () => {
    setConsent({ analytics: true, functional: true });
    setHasConsented(true);
  };

  const rejectAll = () => {
    setConsent({ analytics: false, functional: false });
    setHasConsented(true);
  };

  return {
    consent,
    updateConsent,
    acceptAll,
    rejectAll,
    hasConsented,
  };
}
