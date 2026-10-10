import { site } from "@/data/site";
import { Bilingual } from "@/components/bilingual";

export function AnnouncementBar() {
  return (
    <div className="bg-[#c9a227] px-4 py-2 text-center text-[12px] font-semibold tracking-wide text-[#070708]">
      <Bilingual value={site.announcement} />
    </div>
  );
}
