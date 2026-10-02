import Script from "next/script";

/** Loads the AdSense loader once per page. Rendered only when a publisher ID is configured. */
export function AdSenseScript({ client }: { client: string }) {
  return (
    <Script
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
      crossOrigin="anonymous"
    />
  );
}
