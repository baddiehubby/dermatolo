// ============================================================
// SITE CONFIG - replace every [placeholder] before launching.
// Anything in [square brackets] is fake until you fill it in.
// ============================================================

export const site = {
  name: "Skin & Pain Wellness Clinic",
  doctor: "Dr. [Your Full Name]",
  credentials: "MBBS [Add FCPS / Diploma credentials]",
  pmdc: "[PMDC Registration Number]",
  whatsapp: "923001234567", // country code + number, NO + sign
  phoneDisplay: "+92 300 1234567",
  defaultMessage: "Hello! I would like to book an evening appointment.",
  address: "[Clinic address], Karachi, Pakistan",
  hours: "Mon-Sat, 5:00 PM - 9:00 PM",
  url: "https://your-clinic.vercel.app", // update after Vercel deploy
};

export function waLink(message?: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    message ?? site.defaultMessage
  )}`;
}

// ------------------------------------------------------------
// AREAS - add one entry per neighbourhood you actually serve.
// Each becomes a real page at /areas/<slug>/
// Write UNIQUE content per area. Duplicated text = Google penalty.
// ------------------------------------------------------------

export type Area = {
  slug: string;
  name: string;
  h1: string;
  intro: string;
  landmarks: string[];
  travel: string;
  message: string;
  faqs: { q: string; a: string }[];
};

export const areas: Area[] = [
  {
    slug: "gulshan-e-iqbal",
    name: "Gulshan-e-Iqbal",
    h1: "Skin & Pain Clinic in Gulshan-e-Iqbal, Karachi",
    intro:
      "Evening consultations for skin concerns and pain management, serving patients from Gulshan-e-Iqbal Block 1-19, the University Road corridor, and neighbouring Federal B. Area. Book your slot on WhatsApp before you travel - evening timings suit working patients and families.",
    landmarks: [
      "Maskan Chowrangi",
      "Civic Centre / Expo Centre",
      "NIPA Chowrangi",
      "Disco Bakery, Gulshan Block 5",
    ],
    travel:
      "The clinic is reachable via University Road and Rashid Minhas Road. If you are coming from Gulshan-e-Iqbal, message us on WhatsApp for the exact pin location and the easiest route from your block. Evening rickshaw and ride-hailing availability is good in this corridor.",
    message:
      "Hello! I am in Gulshan-e-Iqbal and would like to book an evening appointment.",
    faqs: [
      {
        q: "Do I need an appointment, or can I walk in?",
        a: "WhatsApp booking is strongly recommended. Walk-in patients are seen only if a slot is free - evening hours fill quickly.",
      },
      {
        q: "What are the clinic timings?",
        a: "Monday to Saturday, 5:00 PM to 9:00 PM. Message on WhatsApp to confirm same-day availability.",
      },
      {
        q: "How much is the consultation fee?",
        a: "Message us on WhatsApp for current fees. Please confirm the fee before visiting so there are no surprises.",
      },
      {
        q: "Where exactly is the clinic near Gulshan-e-Iqbal?",
        a: "We serve the Gulshan-e-Iqbal area in the evening. Send a WhatsApp message and we will share the exact location pin and directions from your block.",
      },
    ],
  },
  {
    slug: "north-nazimabad",
    name: "North Nazimabad",
    h1: "Skin & Pain Clinic in North Nazimabad, Karachi",
    intro:
      "Evening skin and pain consultations for residents of North Nazimabad Blocks A-K, Hyderi, and the Five Star Chowrangi catchment. Evening clinic hours mean you do not need to take leave from work - book on WhatsApp and get your slot, directions, and fee in one message.",
    landmarks: [
      "Five Star Chowrangi",
      "Hyderi Market",
      "Shahrah-e-Noor Jahan",
      "Block F & G markets",
    ],
    travel:
      "Minutes from Five Star Chowrangi and the Shahrah-e-Noor Jahan corridor. Patients coming from Blocks A-K can reach the clinic within 10-15 minutes in the evening. WhatsApp us for a live location pin before you leave home.",
    message:
      "Hello! I am in North Nazimabad and would like to book an evening appointment.",
    faqs: [
      {
        q: "Is the clinic inside North Nazimabad?",
        a: "We run evening clinics serving the North Nazimabad area. Message on WhatsApp for the exact venue and directions from your block.",
      },
      {
        q: "Can I get directions on WhatsApp?",
        a: "Yes. Send your block or nearest landmark and we will reply with a live location pin and the easiest route.",
      },
      {
        q: "What skin problems do you treat?",
        a: "Common concerns include acne, pigmentation, hair fall, allergies, and eczema. For pain, we assess back, joint, and headache complaints and build a treatment plan. Message us your concern and we will confirm if it fits the clinic's scope.",
      },
      {
        q: "Is parking available?",
        a: "Evening street parking is usually available near the clinic. Confirm details on WhatsApp before visiting.",
      },
    ],
  },
];

// ------------------------------------------------------------
// SERVICES - keep descriptions honest and within your scope.
// ------------------------------------------------------------

export const services = [
  {
    icon: "🩺",
    title: "Skin Consultation",
    desc: "Assessment of acne, pigmentation, hair fall, allergies, and other common skin concerns, with a clear treatment plan.",
  },
  {
    icon: "🧴",
    title: "Skin Procedures",
    desc: "Minor procedures only where clinically indicated. Every procedure is explained - including risks and aftercare - before consent.",
  },
  {
    icon: "🩹",
    title: "Pain Management",
    desc: "Assessment of back, joint, and headache complaints. Treatment plans combine medication, lifestyle changes, and follow-up.",
  },
  {
    icon: "📲",
    title: "WhatsApp Follow-up",
    desc: "Post-visit questions answered on WhatsApp during clinic hours, so you are never guessing about your treatment.",
  },
];
