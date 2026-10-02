import { contact } from "@/lib/product";

const escaped = contact.phoneDisplay.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ltrRuns = new RegExp(`(Rs\\. [\\d,]+|${escaped}|Eagle Delay Spray)`, "g");

/** Wraps Latin runs (prices, phone, brand) in LTR isolates so RTL text does not reorder them. */
export function BidiText({ text }: { text: string }) {
  return (
    <>
      {text.split(ltrRuns).map((part, i) =>
        i % 2 === 1 ? (
          <bdi key={i} dir="ltr">
            {part}
          </bdi>
        ) : (
          part
        ),
      )}
    </>
  );
}
