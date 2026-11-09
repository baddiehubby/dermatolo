import Script from "next/script";

/**
 * Consent-aware analytics stubs.
 * Scripts load ONLY when the corresponding env vars are set — never invent tracking IDs.
 *
 * Vercel / .env:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
 *   NEXT_PUBLIC_META_PIXEL_ID=1234567890
 *
 * TODO: wire a cookie consent banner before enabling in production if required in your market.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

  if (!gaId && !metaId) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {metaId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaId}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
