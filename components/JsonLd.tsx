/**
 * Renders a JSON-LD script. `<` is escaped as \u003c so text such as "</script>"
 * inside a value (for example a customer review) can never close the tag early;
 * U+2028/U+2029 are escaped too. React never treats the output as HTML.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
          .replace(/</g, "\\u003c")
          .replace(/\u2028/g, "\\u2028")
          .replace(/\u2029/g, "\\u2029"),
      }}
    />
  );
}
