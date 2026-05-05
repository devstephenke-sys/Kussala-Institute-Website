import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Target, TrendingUp, Users, Globe, BookOpen, Lightbulb,
  ArrowRight, CheckCircle, Layers, Shield, BarChart3, HeartHandshake,
  MapPin, ChevronDown
} from "lucide-react";
import { Link } from "wouter";

// ── Regional Data ────────────────────────────────────────────────────────────

const regions = [
  { id: "global",   label: "Global Overview",    flag: "🌍" },
  { id: "east",     label: "East Africa",         flag: "🇰🇪" },
  { id: "west",     label: "West Africa",         flag: "🇬🇭" },
  { id: "central",  label: "Central Africa",      flag: "🇨🇩" },
  { id: "horn",     label: "Horn of Africa",      flag: "🇸🇴" },
  { id: "southern", label: "Southern Africa",     flag: "🇿🇦" },
  { id: "north",    label: "North Africa & ME",   flag: "🇪🇬" },
] as const;

type RegionId = typeof regions[number]["id"];

interface RegionData {
  headline: string;
  subtext: string;
  context: string;
  stats: { value: number; suffix: string; label: string; sub: string }[];
  priorities: string[];
  challenges: string[];
  outcomes: { year: string; items: string[] }[];
  color: string;
  accentColor: string;
}

const regionData: Record<RegionId, RegionData> = {
  global: {
    headline: "A Global Initiative for Leadership & Peace",
    subtext: "Operating across all regions, KISLP is designed to create a worldwide network of principled, strategic leaders capable of resolving conflict and driving sustainable development.",
    context: "Conflict, fragile governance, and leadership deficits transcend borders. KISLP's global model creates a unified framework adapted to each region's unique realities.",
    stats: [
      { value: 1000, suffix: "+", label: "Leaders to be Trained", sub: "Over 5 years" },
      { value: 50, suffix: "+", label: "Countries to Reach", sub: "All continents" },
      { value: 200, suffix: "+", label: "Peace Initiatives", sub: "Community-level" },
      { value: 25000, suffix: "+", label: "Beneficiaries", sub: "Direct reach" },
      { value: 30, suffix: "+", label: "Partner Orgs", sub: "Global network" },
      { value: 5, suffix: "", label: "Regional Offices", sub: "Planned locations" },
    ],
    priorities: ["Cross-regional leadership exchange", "Global policy frameworks", "Multilateral peace dialogues", "International research partnerships", "Youth leadership pipeline"],
    challenges: ["Leadership skills deficits in post-conflict zones", "Lack of structured peacebuilding institutions", "Youth marginalization from governance", "Weak policy-practice linkages"],
    outcomes: [
      { year: "Year 1", items: ["Launch in 3 pilot regions", "50 leaders trained", "10 peace workshops", "First research report published"] },
      { year: "3 Years", items: ["500+ leaders trained", "30+ countries reached", "100 peace committees", "AU strategic partnership"] },
      { year: "5 Years", items: ["1,000+ leaders trained", "50+ countries", "Annual Global Peace Forum", "Self-sustaining funding"] },
    ],
    color: "from-blue-900 to-blue-800",
    accentColor: "text-amber-400",
  },
  east: {
    headline: "Transforming East Africa's Leadership Landscape",
    subtext: "East Africa is one of KISLP's primary regions — home to extraordinary youth potential, rapidly evolving democracies, and communities seeking durable peace.",
    context: "Countries like Kenya, Uganda, Tanzania, Rwanda and South Sudan have seen remarkable progress alongside persistent governance and conflict challenges. KISLP targets this dynamic space with tailored programs.",
    stats: [
      { value: 300, suffix: "+", label: "Leaders to be Trained", sub: "Across 6 countries" },
      { value: 6, suffix: "", label: "Countries Covered", sub: "Kenya, Uganda, TZ, RW, SS, ET" },
      { value: 60, suffix: "+", label: "Peace Initiatives", sub: "Community level" },
      { value: 8000, suffix: "+", label: "Beneficiaries", sub: "Direct impact" },
      { value: 2, suffix: "", label: "Regional Offices", sub: "Nairobi & Kampala" },
      { value: 40, suffix: "%", label: "Youth Focus", sub: "Under-35 participants" },
    ],
    priorities: ["Cross-border conflict mediation (Kenya-Ethiopia, S. Sudan)", "Youth governance & civic participation", "Women in leadership programs", "Post-election peace frameworks", "Pastoralist community dialogue"],
    challenges: ["Cross-border ethnic conflicts", "Youth unemployment driving radicalization", "Electoral violence cycles", "Weak inter-community trust", "Limited women in leadership roles"],
    outcomes: [
      { year: "Year 1", items: ["Launch in Nairobi & Kampala", "50 leaders trained", "5 cross-border workshops", "Youth cohort of 20 scholars"] },
      { year: "3 Years", items: ["200+ leaders trained", "60 peace committees established", "Women's leadership program launched", "Policy advisory board formed"] },
      { year: "5 Years", items: ["300+ leaders trained", "Regional Peace Institute established", "Recognized by EAC", "Model replicated in 3 other regions"] },
    ],
    color: "from-green-900 to-green-800",
    accentColor: "text-green-300",
  },
  west: {
    headline: "Anchoring Democracy & Peace in West Africa",
    subtext: "West Africa's democratic transitions and recurring coups underscore the urgent need for capable, principled leadership. KISLP brings structure to this critical region.",
    context: "From Ghana's democratic model to the Sahel's instability, West Africa presents both inspiration and urgency. KISLP engages this complexity with culturally grounded, regionally relevant programming.",
    stats: [
      { value: 200, suffix: "+", label: "Leaders to be Trained", sub: "Across 7 countries" },
      { value: 7, suffix: "", label: "Countries Covered", sub: "Ghana, Nigeria, Senegal, Mali + more" },
      { value: 50, suffix: "+", label: "Peace Workshops", sub: "Community & government" },
      { value: 6000, suffix: "+", label: "Beneficiaries", sub: "Direct reach" },
      { value: 1, suffix: "", label: "Regional Office", sub: "Accra, Ghana" },
      { value: 35, suffix: "%", label: "Female Participants", sub: "Gender equity target" },
    ],
    priorities: ["Coup prevention through governance strengthening", "Sahelian crisis response", "Democratic institution building", "Traditional chief & civil society engagement", "Cross-ECOWAS leadership dialogue"],
    challenges: ["Military takeovers undermining civilian governance", "Jihadist insurgencies in Sahel", "Weak democratic institutions", "Distrust between government and citizens", "Corruption at leadership level"],
    outcomes: [
      { year: "Year 1", items: ["Accra office launched", "40 leaders trained", "First Sahel-focused cohort", "Partnership with ECOWAS"] },
      { year: "3 Years", items: ["150+ leaders trained", "Democratic Leadership Academy established", "Sahel peace dialogue series", "Women leaders' network"] },
      { year: "5 Years", items: ["200+ leaders trained", "ECOWAS formal partnership", "Model governance curriculum adopted", "Annual West Africa Peace Summit"] },
    ],
    color: "from-orange-900 to-orange-800",
    accentColor: "text-orange-300",
  },
  central: {
    headline: "Healing & Rebuilding Central Africa",
    subtext: "Central Africa has experienced some of the world's most devastating conflicts. KISLP's approach here is deeply trauma-informed, community-led, and focused on reconciliation.",
    context: "The DRC, CAR, Cameroon, Chad and neighboring states have endured cycles of conflict that demand patient, specialized leadership and peacebuilding interventions over years, not months.",
    stats: [
      { value: 150, suffix: "+", label: "Leaders to be Trained", sub: "Post-conflict focus" },
      { value: 5, suffix: "", label: "Countries Covered", sub: "DRC, CAR, Cameroon, Chad, ROC" },
      { value: 40, suffix: "+", label: "Reconciliation Initiatives", sub: "Community level" },
      { value: 5000, suffix: "+", label: "Beneficiaries", sub: "Conflict-affected areas" },
      { value: 1, suffix: "", label: "Regional Office", sub: "Kinshasa, DRC" },
      { value: 50, suffix: "%", label: "Women & Youth", sub: "Priority focus group" },
    ],
    priorities: ["Post-conflict reconstruction leadership", "Trauma-informed dialogue facilitation", "Ethnic reconciliation frameworks", "Natural resource conflict resolution", "Refugee community reintegration"],
    challenges: ["Decades of armed conflict", "Humanitarian crisis leadership gaps", "Resource-driven conflicts (minerals)", "Fragile government legitimacy", "Displacement and statelessness"],
    outcomes: [
      { year: "Year 1", items: ["DRC-focused pilot launched", "30 leaders trained", "Reconciliation workshop series", "Trauma-informed curriculum developed"] },
      { year: "3 Years", items: ["100+ leaders trained", "Reconciliation network in 3 countries", "DRC peace framework published", "Youth reintegration program"] },
      { year: "5 Years", items: ["150+ leaders in 5 countries", "Regional Reconciliation Centre", "UN OCHA partnership", "Replication in other post-conflict zones"] },
    ],
    color: "from-red-900 to-red-800",
    accentColor: "text-red-300",
  },
  horn: {
    headline: "Stabilizing the Horn of Africa",
    subtext: "The Horn of Africa is one of the world's most conflict-prone regions. KISLP engages its complexity — from Somalia's state-building to Ethiopia's internal tensions — with specialist expertise.",
    context: "Somalia, Ethiopia, Eritrea, Djibouti and Sudan form a region where leadership failures have had catastrophic consequences. Structured, principled leadership development is not a luxury here — it is survival.",
    stats: [
      { value: 120, suffix: "+", label: "Leaders to be Trained", sub: "Fragile state focus" },
      { value: 5, suffix: "", label: "Countries Covered", sub: "Somalia, Ethiopia, Eritrea, DJ, Sudan" },
      { value: 30, suffix: "+", label: "Stability Initiatives", sub: "State & community" },
      { value: 4000, suffix: "+", label: "Beneficiaries", sub: "Fragile state communities" },
      { value: 1, suffix: "", label: "Regional Office", sub: "Addis Ababa, Ethiopia" },
      { value: 45, suffix: "%", label: "Diaspora Engagement", sub: "Global Somali/Ethiopian diaspora" },
    ],
    priorities: ["Somali state-building & governance", "Ethiopia-Tigray reconciliation leadership", "Diaspora engagement in peacebuilding", "Inter-clan mediation (Somalia)", "Sudan transitional governance support"],
    challenges: ["State fragility and collapse (Somalia)", "Ethnic federalism tensions (Ethiopia)", "Regional food insecurity linked to conflict", "Al-Shabaab radicalization", "Mass displacement"],
    outcomes: [
      { year: "Year 1", items: ["Addis Ababa hub established", "25 leaders trained", "Somali governance cohort launched", "Diaspora engagement program"] },
      { year: "3 Years", items: ["80+ leaders trained", "Inter-clan mediation framework deployed", "Ethiopia reconciliation program", "IGAD partnership established"] },
      { year: "5 Years", items: ["120+ leaders trained", "IGAD formal integration", "Somali peace leadership model recognized", "Annual Horn of Africa Leadership Summit"] },
    ],
    color: "from-purple-900 to-purple-800",
    accentColor: "text-purple-300",
  },
  southern: {
    headline: "Strengthening Southern Africa's Governance Future",
    subtext: "Southern Africa's relatively stable democracies mask deep inequality and leadership challenges. KISLP focuses on building next-generation governance and conflict prevention capacity.",
    context: "With maturing democracies in Botswana, Namibia and South Africa, alongside fragility in Zimbabwe, Mozambique, and Eswatini, Southern Africa needs leadership that bridges stability and transformation.",
    stats: [
      { value: 100, suffix: "+", label: "Leaders to be Trained", sub: "Governance focus" },
      { value: 6, suffix: "", label: "Countries Covered", sub: "SA, Zimbabwe, Mozambique, Zambia + more" },
      { value: 25, suffix: "+", label: "Governance Programs", sub: "Public & civil society" },
      { value: 3500, suffix: "+", label: "Beneficiaries", sub: "Direct reach" },
      { value: 1, suffix: "", label: "Regional Office", sub: "Johannesburg, South Africa" },
      { value: 40, suffix: "%", label: "Young Professionals", sub: "Under-35 leaders" },
    ],
    priorities: ["Post-apartheid reconciliation leadership", "Inequality and governance reform", "Youth leadership in established democracies", "Mozambique conflict resolution", "Zimbabwe governance transition"],
    challenges: ["Entrenched inequality undermining democracy", "Youth alienation from formal politics", "Zimbabwe's ongoing political crisis", "Mozambique insurgency", "Brain drain of capable leaders"],
    outcomes: [
      { year: "Year 1", items: ["Johannesburg office established", "20 leaders trained", "SA-Zimbabwe leadership exchange", "Inequality & governance curriculum launched"] },
      { year: "3 Years", items: ["70+ leaders trained", "Youth governance academy", "Mozambique peace program launched", "SADC partnership signed"] },
      { year: "5 Years", items: ["100+ leaders trained", "SADC integration achieved", "Southern Africa Youth Leadership Award", "Model exported globally"] },
    ],
    color: "from-teal-900 to-teal-800",
    accentColor: "text-teal-300",
  },
  north: {
    headline: "Leadership for Stability in North Africa & the Middle East",
    subtext: "The Arab Spring aftermath left a leadership vacuum across North Africa and the Middle East. KISLP works to fill this gap through structured, post-transition governance programming.",
    context: "Libya, Tunisia, Egypt, Yemen and neighboring states continue navigating post-conflict and post-authoritarian transitions. The demand for leadership development here is both immense and urgent.",
    stats: [
      { value: 80, suffix: "+", label: "Leaders to be Trained", sub: "Transition-focused" },
      { value: 5, suffix: "", label: "Countries Covered", sub: "Libya, Tunisia, Yemen, Egypt, Jordan" },
      { value: 20, suffix: "+", label: "Transition Support Programs", sub: "Governance & civil society" },
      { value: 3000, suffix: "+", label: "Beneficiaries", sub: "Transitional societies" },
      { value: 1, suffix: "", label: "Regional Office", sub: "Tunis, Tunisia" },
      { value: 50, suffix: "%", label: "Civil Society Focus", sub: "NGOs, media, academia" },
    ],
    priorities: ["Post-Arab Spring governance reconstruction", "Civil society & media leadership", "Women's leadership in conservative contexts", "Libya reconciliation dialogue", "Yemen peace process support"],
    challenges: ["Post-authoritarian institutional vacuum", "Armed factions dominating governance", "Women excluded from leadership processes", "External interference in peace processes", "Youth radicalization"],
    outcomes: [
      { year: "Year 1", items: ["Tunis office established", "15 leaders trained", "Women's leadership cohort launched", "Libyan dialogue facilitation"] },
      { year: "3 Years", items: ["50+ leaders trained", "Regional civil society network", "Arab League advisory role", "Women in governance program"] },
      { year: "5 Years", items: ["80+ leaders trained", "Arab League partnership", "Annual MENA Leadership Forum", "Gender-inclusive governance model"] },
    ],
    color: "from-yellow-900 to-yellow-800",
    accentColor: "text-yellow-300",
  },
};

// ── Animated Number ───────────────────────────────────────────────────────────

function AnimatedNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 16 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    motionVal.set(0);
    if (inView) {
      const timer = setTimeout(() => motionVal.set(target), 100);
      return () => clearTimeout(timer);
    }
  }, [inView, target, motionVal]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ── Theory of Change (static) ─────────────────────────────────────────────────

const theoryOfChange = [
  { step: "01", icon: Lightbulb, title: "Identify & Select", desc: "We identify high-potential leaders from conflict-affected and underserved regions — civil servants, youth activists, community organizers, and emerging diplomats." },
  { step: "02", icon: BookOpen,  title: "Train & Equip",    desc: "Participants undergo rigorous training in strategic leadership, negotiation, conflict analysis, and governance — grounded in both theory and practice." },
  { step: "03", icon: Layers,    title: "Deploy & Apply",   desc: "Trained leaders return to their communities, applying skills to mediate disputes, reform governance, and build local resilience." },
  { step: "04", icon: TrendingUp, title: "Measure & Scale", desc: "We track outcomes rigorously — peace agreements reached, policies reformed, communities stabilized — then improve and scale." },
];

const pillars = [
  { icon: Target,     title: "Strategic Focus",  desc: "Every intervention targets high-impact zones where leadership and conflict resolution skills are most urgently needed." },
  { icon: Globe,      title: "Global Reach",     desc: "From East Africa to the Middle East, our programs are culturally adaptive and globally scalable." },
  { icon: Users,      title: "People-Centred",   desc: "We invest in individuals — one well-equipped leader can transform an entire community." },
  { icon: TrendingUp, title: "Evidence-Based",   desc: "All programs have clear metrics, regular evaluation, and a commitment to learning and continuous improvement." },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function Impact() {
  const [activeRegion, setActiveRegion] = useState<RegionId>("global");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const data = regionData[activeRegion];
  const activeLabel = regions.find(r => r.id === activeRegion)!;

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-primary overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(ellipse at 20% 60%, hsl(43 96% 50%) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, hsl(216 73% 45%) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-secondary uppercase tracking-widest text-sm font-semibold mb-5 border border-secondary/30 px-4 py-1.5 rounded-full">
              Project Proposal
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Projected Impact &<br /><span className="text-secondary">Expected Outcomes</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            KISLP is designed to create measurable, lasting change. Select a region below to explore how this proposal will be tailored to each context.
          </motion.p>
        </div>
      </section>

      {/* ── Region Selector ──────────────────────────────────────── */}
      <section className="py-10 bg-background border-b border-border sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop tabs */}
          <div className="hidden md:flex items-center justify-center gap-2 flex-wrap">
            {regions.map((r) => (
              <motion.button
                key={r.id}
                onClick={() => setActiveRegion(r.id)}
                data-testid={`region-tab-${r.id}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                  activeRegion === r.id
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span>{r.flag}</span>
                <span>{r.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold"
              data-testid="region-dropdown-toggle"
            >
              <span className="flex items-center gap-2"><span>{activeLabel.flag}</span><span>{activeLabel.label}</span></span>
              <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  {regions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => { setActiveRegion(r.id); setDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${
                        activeRegion === r.id ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <span>{r.flag}</span><span>{r.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Regional Context + Stats ─────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Region Headline */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="text-secondary" size={20} />
                    <span className="text-secondary uppercase tracking-widest text-sm font-semibold">{activeLabel.flag} {activeLabel.label}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-5 leading-tight">{data.headline}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{data.subtext}</p>
                  <p className="text-muted-foreground leading-relaxed text-sm">{data.context}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-4">
                  <h3 className="font-serif font-bold text-foreground text-lg mb-3">Key Challenges This Region Faces</h3>
                  {data.challenges.map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="flex items-start gap-3 bg-destructive/5 border border-destructive/10 rounded-xl px-5 py-3"
                    >
                      <Shield size={15} className="text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{c}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Animated Stats */}
          <section className="py-16 bg-primary/95 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(43 96% 50%) 0px, transparent 1px, transparent 40px, hsl(43 96% 50%) 41px)" }}
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-secondary/80 uppercase tracking-widest text-xs font-semibold mb-10">
                Projected 5-Year Targets — {activeLabel.label}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-white">
                {data.stats.map((stat, i) => (
                  <motion.div
                    key={`${activeRegion}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    whileHover={{ scale: 1.07 }}
                    className="p-4 group"
                  >
                    <div className="text-4xl md:text-5xl font-serif font-bold mb-1 text-secondary">
                      <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-primary-foreground/80 text-xs uppercase tracking-widest font-medium mb-1">{stat.label}</div>
                    <div className="text-primary-foreground/40 text-xs italic">{stat.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Priorities + Phased Outcomes */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                {/* KISLP Priorities for region */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-2">Program Priorities</h3>
                  <div className="w-12 h-1 bg-secondary mb-6" />
                  <p className="text-muted-foreground text-sm mb-6">KISLP's interventions in this region will focus on the following strategic areas:</p>
                  <ul className="space-y-3">
                    {data.priorities.map((p, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle size={16} className="text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground leading-relaxed">{p}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Phased outcomes */}
                <div className="lg:col-span-3 space-y-5">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-2">Projected Outcomes</h3>
                  <div className="w-12 h-1 bg-secondary mb-6" />
                  {data.outcomes.map((phase, i) => (
                    <motion.div
                      key={`${activeRegion}-outcome-${i}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.12 }}
                      className="rounded-2xl overflow-hidden border border-border shadow-sm"
                    >
                      <div className={`px-6 py-4 ${i === 0 ? "bg-secondary" : i === 1 ? "bg-primary" : "bg-muted border-b border-border"}`}>
                        <h4 className={`font-serif font-bold ${i === 0 ? "text-secondary-foreground" : i === 1 ? "text-primary-foreground" : "text-foreground"}`}>
                          {phase.year}
                        </h4>
                      </div>
                      <div className="bg-card px-6 py-5 space-y-3">
                        {phase.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle size={14} className="text-secondary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* ── Theory of Change (always visible) ───────────────────── */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">How Change Happens</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Theory of Change</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-5" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our approach is built on a clear, evidence-informed logic: equipped leaders create peaceful communities, and peaceful communities enable sustainable development.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />
            {theoryOfChange.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }} whileHover={{ y: -6 }}
                className="relative bg-card border border-border rounded-2xl p-8 text-center group hover:border-secondary hover:shadow-xl transition-all"
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-full bg-primary mx-auto mb-5 flex items-center justify-center relative z-10 shadow-lg"
                >
                  <step.icon className="text-secondary" size={32} />
                </motion.div>
                <div className="text-secondary/30 font-serif font-bold text-5xl absolute top-4 right-6 select-none">{step.step}</div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Matters ─────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">The Gap We Address</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Why This Proposal Matters</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Across Africa and beyond, the deficit of trained, strategic, and principled leadership remains one of the most persistent drivers of conflict, poor governance, and underdevelopment.</p>
                <p>Existing institutions are either inaccessible to grassroots leaders or disconnected from the realities of conflict-affected communities. KISLP bridges this critical gap.</p>
                <p>This proposal presents a credible, scalable, and financially sustainable model to develop the next generation of peacebuilders and strategic leaders.</p>
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8">
                <Link href="/donate" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-md font-bold text-sm hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg">
                  Support This Initiative <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="grid grid-cols-2 gap-5">
              {pillars.map((pillar, i) => (
                <motion.div key={i} whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }} transition={{ type: "spring", stiffness: 300 }}
                  className="bg-card border border-border rounded-2xl p-7 group cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 group-hover:bg-secondary/15 flex items-center justify-center mb-4 transition-colors">
                    <pillar.icon className="text-primary group-hover:text-secondary transition-colors" size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-foreground mb-2 text-sm">{pillar.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <motion.div className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ backgroundImage: "radial-gradient(circle at 10% 90%, hsl(43 96% 50% / 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 10%, hsl(43 96% 50% / 0.10) 0%, transparent 40%)", backgroundSize: "200% 200%" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Invest in the Future of <span className="text-secondary">Peace</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.15 }}
            className="text-primary-foreground/80 text-lg mb-10 font-light"
          >
            Your support transforms this proposal into reality — equipping leaders, resolving conflicts, and building lasting peace across every region.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/donate" className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-primary transition-all shadow-xl">
              Donate Now <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all">
              Partner with Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
