/* IA §5.3 per-vertical deltas as data — five pages, one template, zero
   duplicated structure (EA §7). Slugs are frozen identifiers (IA §2). */

export const VERTICAL_SLUGS = [
  "med-spas",
  "salons",
  "dental",
  "gyms",
  "premium-services",
] as const;

export type VerticalSlug = (typeof VERTICAL_SLUGS)[number];

export interface Vertical {
  slug: VerticalSlug;
  name: string;
  short: string;
  tileHeadline: string;
  tileLine: string;
  heroPromise: string;
  heroSub: string;
  /** AEO answer block (ai-search-optimization.md §4.2): 40–70 words, self-contained. */
  answer: string;
  pains: string[];
  calcDefaults: { bookings: number; noShowPerTen: number; ticket: number };
  flagship: { title: string; steps: string[] };
  weekOne: string[];
  faq: { q: string; a: string }[];
}

export const verticals: Record<VerticalSlug, Vertical> = {
  "med-spas": {
    slug: "med-spas",
    name: "Med Spas & Aesthetic Clinics",
    short: "med spa",
    tileHeadline: "A three-thousand-dirham consultation shouldn't die in an unanswered DM.",
    tileLine: "Every enquiry answered in seconds, qualified, and booked.",
    heroPromise: "Every enquiry answered. Every consultation booked.",
    heroSub:
      "High-ticket treatments live or die on response time. YanForge answers in seconds, qualifies in chat, and books the consultation before your competitor's reception opens.",
    answer:
      "Med spas in the UAE lose high-ticket consultations to slow follow-up, not to competitors' quality. YanForge connects your enquiries, WhatsApp, booking and client records into one system that replies in seconds, qualifies leads in chat, and books consultations automatically — then follows up until the client shows.",
    pains: [
      "A AED 3,000 enquiry arrives at 9pm. By morning, she's booked somewhere that answered.",
      "Consultation no-shows burn practitioner hours you can't bill back.",
      "Follow-ups after a consult depend on whoever remembers to send them.",
      "You spend on ads, but nobody can say which enquiries became revenue.",
    ],
    calcDefaults: { bookings: 25, noShowPerTen: 2, ticket: 1500 },
    flagship: {
      title: "The 9pm enquiry, handled end to end",
      steps: [
        "An Instagram enquiry lands at 9:04pm. The system replies in eight seconds.",
        "Two qualifying questions, answered in chat. She's a fit.",
        "Two consultation slots offered. She takes Thursday 6pm.",
        "Deposit taken in the thread. Reminder scheduled.",
        "She shows. Your consult calendar shows where she came from and what she's worth.",
      ],
    },
    weekOne: [
      "We map your enquiry channels and consult flow — nothing changes yet.",
      "Instant-reply and reminder automations go live alongside your current process.",
      "You watch the first enquiries get answered in seconds, with your team untouched.",
    ],
    faq: [
      {
        q: "Is automated follow-up appropriate for medical services?",
        a: "Yes — with consent, discretion and the official WhatsApp Business API. Messages are opt-in, clinical claims stay out of automations, and every template is reviewed for the standards your license holds you to.",
      },
      {
        q: "Can it qualify leads before they reach my coordinators?",
        a: "That's the point. The system asks your qualifying questions in chat, so coordinators open conversations that are already worth their time.",
      },
      {
        q: "We run on a practice-management system already.",
        a: "We connect to what works and replace only what leaks. Your PMS usually stays; the layer that answers, books and follows up is what we add.",
      },
    ],
  },
  salons: {
    slug: "salons",
    name: "Salons",
    short: "salon",
    tileHeadline: "A no-show doesn't just cost the slot. It costs the client you turned away for it.",
    tileLine: "Reminders and deposits that keep chairs full.",
    heroPromise: "Full chairs. Fewer no-shows. A calmer front desk.",
    heroSub:
      "Your bookings live in DMs, WhatsApp and a paper diary — and every gap between them leaks money. YanForge makes them one system that books, reminds and refills automatically.",
    answer:
      "Salons in the UAE cut no-shows by moving reminders, deposits and rebooking onto WhatsApp — automatically. YanForge connects your Instagram enquiries, WhatsApp, booking calendar and client list into one system, so slots confirm themselves, cancellations refill from your waitlist, and regulars are invited back before they drift.",
    pains: [
      "She confirmed yesterday. She didn't come. The chair sat empty for an hour.",
      "Your receptionist answers WhatsApp between shampoos — bookings live in her pocket.",
      "A cancellation at 2pm stays empty at 5pm, while your waitlist never hears about it.",
      "Your best regular hasn't been in for eight weeks. Nobody noticed.",
    ],
    calcDefaults: { bookings: 120, noShowPerTen: 2, ticket: 250 },
    flagship: {
      title: "The cancellation that fills itself",
      steps: [
        "A client cancels her 5pm on WhatsApp at 1:40pm.",
        "The system offers the slot to your waitlist — automatically, in order.",
        "Maryam takes it at 1:52pm and pays her deposit in the chat.",
        "Reminder at 2pm. One-tap confirm.",
        "The chair never sat empty, and nobody at the desk lifted a finger.",
      ],
    },
    weekOne: [
      "We connect your calendar and WhatsApp — your team keeps working exactly as today.",
      "Reminders with one-tap confirm go live on this week's bookings.",
      "You see the first no-show saved before we've changed anything else.",
    ],
    faq: [
      {
        q: "My clients book by DM. Will they actually use this?",
        a: "They keep messaging exactly as they do now — the difference is the reply comes in seconds and ends in a confirmed booking. Nothing new to download, nothing to learn.",
      },
      {
        q: "Do deposits scare clients away?",
        a: "Deposits filter the bookings that were never going to show. Most salons see the calendar get more honest, not smaller — and you choose where deposits apply.",
      },
      {
        q: "We use Fresha. Do we have to leave it?",
        a: "No. If your booking tool works, we connect it and build the layers it's missing — instant replies, waitlist refill, reactivation.",
      },
    ],
  },
  dental: {
    slug: "dental",
    name: "Dental Clinics",
    short: "dental clinic",
    tileHeadline: "Your next month of revenue is already sitting in your recall list.",
    tileLine: "Automatic recalls and reactivation that bring lapsed patients back.",
    heroPromise: "Recalls that happen. Chairs that stay full.",
    heroSub:
      "Six-month check-ups are your most predictable revenue — and the easiest to lose to a busy front desk. YanForge runs recall and reactivation automatically, on the app your patients answer.",
    answer:
      "Dental clinics in the UAE fill empty chair time by automating recalls and reactivation on WhatsApp. YanForge connects your appointment book, patient list and WhatsApp so six-month recalls send themselves, lapsed patients get a respectful win-back sequence, and gaps in the schedule refill without the front desk chasing anyone.",
    pains: [
      "Hundreds of patients are past their six-month recall — and the list grows every week.",
      "The front desk means to call them. The front desk is also checking in a family of five.",
      "A cancelled crown appointment leaves ninety minutes of chair time worth thousands.",
      "Patients who left a good visit never got asked for the review that wins the next patient.",
    ],
    calcDefaults: { bookings: 60, noShowPerTen: 2, ticket: 500 },
    flagship: {
      title: "The recall list, working itself",
      steps: [
        "Sunday 9am: the system finds every patient past their recall date.",
        "Each gets a personal WhatsApp — their name, their dentist, two slot options.",
        "Rashid books Tuesday 7pm in two taps.",
        "Reminder the day before; he confirms with one tap.",
        "After the visit: a thank-you and a review request, timed right.",
      ],
    },
    weekOne: [
      "We map your recall backlog and appointment flow — read-only, zero disruption.",
      "Reminders go live on existing appointments; the desk feels the calls drop first.",
      "The first recall batch goes out and the bookings arrive by themselves.",
    ],
    faq: [
      {
        q: "What about insurance patients?",
        a: "Recall and reminder flows carry your insurance instructions — what to bring, what's covered — so the desk answers fewer repeat questions, not more.",
      },
      {
        q: "Is patient data safe in this?",
        a: "Messaging runs on the official WhatsApp Business API with opt-in consent, and your patient records stay in your system — we connect, we don't copy your database into a marketing tool.",
      },
      {
        q: "Our practice software has reminders built in.",
        a: "SMS and email reminders get ignored; WhatsApp gets answered. We connect to your practice software and move the conversation to where your patients actually reply.",
      },
    ],
  },
  gyms: {
    slug: "gyms",
    name: "Gyms & Studios",
    short: "gym",
    tileHeadline: "Members don't quit at the front desk. They quit quietly, at home, in week six.",
    tileLine: "See the fade before it becomes a cancellation.",
    heroPromise: "Grow memberships. Catch the quiet quitters.",
    heroSub:
      "Churn doesn't announce itself — attendance just fades. YanForge watches the pattern, reaches out at the right moment, and turns trial passes into members while your coaches coach.",
    answer:
      "Gyms and studios in the UAE reduce churn by catching attendance fade early. YanForge connects your membership system, class bookings and WhatsApp so missed-visit streaks trigger a personal check-in, trials get a proper follow-up sequence, and win-back offers reach lapsed members automatically — before the cancellation email arrives.",
    pains: [
      "A member's visits drop from three a week to zero. The first you hear is the cancellation.",
      "Trial passes leave excited — and never hear from you again.",
      "Class no-shows block spots that waitlisted members wanted.",
      "Renewals depend on whoever remembers to chase them.",
    ],
    calcDefaults: { bookings: 200, noShowPerTen: 2, ticket: 90 },
    flagship: {
      title: "The quiet quitter, caught in week three",
      steps: [
        "Omar's visits drop off after week two. The system notices the streak break.",
        "He gets a human-sounding check-in from his coach's name — not a promo blast.",
        "He books Thursday's class from the chat.",
        "His spot is confirmed; the waitlist stays honest.",
        "Your dashboard shows saves like this, in members and dirhams.",
      ],
    },
    weekOne: [
      "We connect your membership and class systems — read-only first.",
      "Class reminders and waitlist automation go live.",
      "The attendance-fade watchlist starts populating; you see who you'd have lost.",
    ],
    faq: [
      {
        q: "We already use a gym management app.",
        a: "Keep it. We connect to it and add the layer it doesn't do — conversational follow-up on WhatsApp that members actually answer.",
      },
      {
        q: "Won't automated check-ins feel fake?",
        a: "They're written in your coaches' voice, sent at moments that make sense, and capped so nobody gets pestered. The fake-feeling version is the mass blast — that's what we replace.",
      },
      {
        q: "Can it handle class packages and renewals?",
        a: "Yes — expiry-aware nudges before packages run out, and renewal conversations that open in chat instead of at the front desk on a busy evening.",
      },
    ],
  },
  "premium-services": {
    slug: "premium-services",
    name: "Premium Services",
    short: "premium service business",
    tileHeadline: "Your service is five-star. Your follow-up should be too.",
    tileLine: "Concierge-grade systems your clients feel but never see.",
    heroPromise: "An operation as premium as the brand.",
    heroSub:
      "Your clients expect the Ritz; your back office runs on sticky notes. YanForge builds the invisible system — instant response, flawless follow-up, quiet precision — that premium clients assume you already have.",
    answer:
      "Premium service businesses in the UAE protect their brand by making operations as polished as the service. YanForge connects enquiries, booking, client history and WhatsApp into one discreet system: every message answered in your tone within seconds, every appointment confirmed and remembered, every VIP treated like the system knows them — because it does.",
    pains: [
      "A referral worth a fortune messages on a Friday. The reply comes Sunday.",
      "Your best clients repeat their preferences every visit, because the notes live in someone's head.",
      "Follow-up after a first visit is the difference between a client and a customer — and it's ad hoc.",
      "Discounting feels off-brand, but you have no other lever when months go quiet.",
    ],
    calcDefaults: { bookings: 30, noShowPerTen: 1, ticket: 1200 },
    flagship: {
      title: "The referral, received properly",
      steps: [
        "A referred client messages Friday evening. The reply lands in seconds, in your voice.",
        "She's offered times that actually suit her — the system checked.",
        "Confirmation, directions, a discreet reminder. No forms, no apps.",
        "Her preferences from visit one are on file for visit two.",
        "A month later, a personal follow-up — not a promotion — brings her back.",
      ],
    },
    weekOne: [
      "We map your client journey end to end, quietly.",
      "Instant response and confirmation flows go live in your tone of voice.",
      "Your client notes move from heads and notebooks into one place your team shares.",
    ],
    faq: [
      {
        q: "Will automation cheapen how our brand feels?",
        a: "Done badly, yes — which is why everything is written in your voice, capped in frequency, and invisible as automation. What clients feel is that you're impossibly responsive.",
      },
      {
        q: "Our clientele values privacy.",
        a: "So does the system: official WhatsApp Business API, opt-in consent, no data leaving your control, and no client ever addressed by a template that feels like one.",
      },
      {
        q: "We're not a salon — does this still fit?",
        a: "If you take appointments and your clients are worth keeping, the system fits. The audit maps your specific journey before anything is proposed.",
      },
    ],
  },
};

export const verticalList: Vertical[] = VERTICAL_SLUGS.map((s) => verticals[s]);
