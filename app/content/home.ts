/* Homepage content, mirroring docs/copy/homepage.md — the copy deck governs
   these strings (EA §3: no strings in components). */

export const hero = {
  overline: "The growth operating system for UAE service businesses",
  h1: "Your business, engineered to grow.",
  sub: "One connected system — website, booking, CRM, AI and WhatsApp — that fills your calendar and keeps clients coming back.",
  caption: "Booked at 9:47pm. Nobody was at the desk.",
  chips: ["WhatsApp-native", "Built for salons, clinics, gyms & spas"],
};

export const problem = {
  h2: "Ten tools. None of them talk to each other.",
  story: [
    "It's 9:47 on a Tuesday night.",
    "A woman in Jumeirah finds your salon on Instagram. She loves your work. She sends a DM: “Do you have anything tomorrow?”",
    "Nobody answers. Everyone went home at nine.",
    "At 9:52 she messages the salon down the road. They'd gone home too.",
    "But their system hadn't.",
  ],
  leadIn:
    "You never see the bookings you lose this way. They don't show up in any report. They just quietly happen — every night, every lunch rush, every Friday. And the leaks don't stop at 9pm:",
  leaks: [
    "A client no-shows. The slot she held stays empty — and the client you turned away for it booked somewhere else.",
    "A promotion runs. The month feels busy. The numbers don't move, and nobody can tell you why.",
    "Your best client hasn't been in for eight weeks. Nobody noticed.",
    "Your bookings live in your receptionist's pocket, answered between appointments.",
  ],
  close: "This isn't a marketing problem. It's a system problem. And system problems don't get fixed by posting more.",
};

export const journey = {
  h3: "Watch a single client move through the system.",
  steps: [
    { label: "LEAD", text: "Maryam messages at 9pm. The system replies in eight seconds." },
    { label: "BOOKED", text: "She takes Thursday 6pm. Deposit paid inside the chat." },
    { label: "SHOWED UP", text: "Reminder at 3pm, confirmed with one tap. The slot never wobbled." },
    { label: "RETURNED", text: "Four weeks later: “Time for your touch-up, Maryam?” She rebooks in under a minute." },
    { label: "TRACKED", text: "You see the whole thread: where she came from, what she spent, when she's due back. In dirhams, not dashboards." },
  ],
};

export const honesty = {
  overline: "The honest part",
  h3: "We're new. Here's exactly what that means for you.",
  body: [
    "YanForge doesn't have a wall of client logos yet. We won't rent one, and we won't invent numbers — you've met agencies that do.",
    "What we have is the system you just watched run, and a founding offer built on a simple trade: our first five partners take a smaller bet, and get more in return.",
  ],
  gets: [
    "Founding pricing, locked — it never goes up while you're with us.",
    "The engineers who built your system in your WhatsApp. Not an account manager.",
    "First claim on our attention as we grow.",
  ],
  ask: "We ask one thing back: we measure everything, and your results — the good and the hard — become the case studies on this page.",
  close: "Five businesses. That's not marketing scarcity — it's how many we can operate properly at once.",
};

export const pillars = [
  {
    title: "Engineered & operated.",
    text: "Agencies hand over a website and disappear. We build your system, then run it with you, month after month — because a machine nobody operates is just another invoice.",
  },
  {
    title: "Built for here.",
    text: "WhatsApp-first. Ramadan-aware. Bilingual-ready. Designed for how business actually works in the UAE — not adapted from a template made for somewhere else.",
  },
  {
    title: "Measured in revenue.",
    text: "We don't report clicks and impressions. We report bookings kept, clients returned, and dirhams recovered. If you can't see it in your calendar, it doesn't count.",
  },
];

export const processSteps = [
  { n: "01", label: "AUDIT", text: "Thirty minutes. We map exactly where your revenue leaks. The blueprint is yours to keep — work with us or don't." },
  { n: "02", label: "BLUEPRINT", text: "Your system on paper: what we connect, what we replace, what it should return, what it costs. No surprises after." },
  { n: "03", label: "FORGE", text: "We build. You run your business. Your team feels nothing until it's ready." },
  { n: "04", label: "LAUNCH", text: "Phased, running alongside what you have. No big bang. No lost bookings. No staff mutiny." },
  { n: "05", label: "OPTIMISE", text: "Every month we look at the numbers with you and tighten what the data says to tighten." },
];

export const faq = [
  {
    q: "Do we have to throw away the tools we already use?",
    a: "No — and be suspicious of anyone who says yes on day one. If Fresha, Zenoti, or your calendar is working, we connect it. We only replace what's actively leaking money, and the blueprint tells you which is which before anything changes.",
  },
  {
    q: "Will this disrupt my business while it's being set up?",
    a: "Your team keeps working exactly as they do today while we build. The new system runs alongside the old one before anything switches over, in phases. There is no week where the phones go quiet.",
  },
  {
    q: "How long until it's running?",
    a: "The first automations — reminders, instant replies — typically go live within weeks, not months. The full system rolls out in phases, and your blueprint includes the exact sequence for your business. We'd rather give you a real timeline in the audit than a fake one on a website.",
  },
  {
    q: "What does it cost, really?",
    a: "Every engagement starts with the free audit, which tells you which system fits and what it should return before you commit a dirham. Pricing is transparent and agreed in the blueprint — nothing appears later.",
  },
  {
    q: "My business is small. Is this overkill?",
    a: "Starter exists exactly for this. And honestly: if the audit shows your leaks are too small to justify a system, we'll say so and part as friends. It happens, and we'd rather be the people who told you the truth.",
  },
  {
    q: "Is automated WhatsApp even allowed?",
    a: "Yes — when it's done properly. We build on the official WhatsApp Business API, with client opt-in and consent handled the way UAE regulation expects. No grey-market bulk senders, no risking the number your business runs on.",
  },
  {
    q: "What if it doesn't work?",
    a: "We measure everything monthly, together, against the blueprint's targets. Engagements are phased so you're never locked into a promise we haven't kept yet. And you keep the audit blueprint from day one regardless.",
  },
];
