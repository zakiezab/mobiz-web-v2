declare global {
  interface Window {
    gtag: (..._args: unknown[]) => void;
  }
}

export {}
