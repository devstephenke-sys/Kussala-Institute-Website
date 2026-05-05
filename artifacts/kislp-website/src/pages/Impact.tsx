import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, CheckCircle, TrendingUp, Shield, Globe, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const regions = [
  {
    id: "south-sudan",
    flag: "🇸🇸",
    label: "South Sudan",
    subtitle: "From Fragility to State-Building",
    overview: "In South Sudan, KISLP recognizes the urgent need to move beyond transitional governance toward permanent institutional stability.",
    context: "South Sudan faces a critical juncture as it implements the Revitalized Peace Agreement (R-ARCSS). The path to stability requires a new generation of civil servants and local leaders equipped with ethical governance skills and strategic leadership capacity.",
    focus: "Training the next generation of civil servants in ethical public financial management.",
    intervention: "Supporting the implementation of the Revitalized Peace Agreement (R-ARCSS) through leadership workshops for state and local authorities.",
    priorities: [
      "Ethical public financial management training",
      "R-ARCSS implementation support",
      "Leadership workshops for state authorities",
      "Local government capacity building",
      "Post-conflict institutional strengthening",
    ],
    outcomes: [
      { phase: "Phase 1 (2026)", items: ["Legal registration and office establishment", "First cohort of civil servant training", "R-ARCSS workshop series launched"] },
      { phase: "Phase 2 (2027–28)", items: ["100+ civil servants trained", "State-level dialogue mechanisms active", "Public financial management frameworks published"] },
      { phase: "Phase 3 (2029)", items: ["Recognized policy advisory role", "Sustainable institution with local staff", "Multi-year government partnership"] },
    ],
    image: "/gallery/reconciliation-village-rwanda.jpg",
    color: "from-primary to-primary/80",
    icon: Shield,
  },
  {
    id: "drc",
    flag: "🇨🇩",
    label: "DR Congo",
    subtitle: "Strengthening Governance in the East",
    overview: "Given the complex security landscape in Eastern DRC, KISLP's operations will focus on the nexus between natural resource governance and conflict.",
    context: "The Eastern DRC — particularly North and South Kivu — is one of the world's most protracted conflict zones, driven in large part by competition over natural resources and the fragmentation of governance. KISLP brings a structured, evidence-based approach to this volatile environment.",
    focus: "Cross-border mediation and community-based reconciliation in North and South Kivu.",
    intervention: "Developing strategic frameworks for security sector reform (SSR) and accountability in extractive industries.",
    priorities: [
      "Cross-border mediation — North & South Kivu",
      "Community-based reconciliation programs",
      "Security sector reform (SSR) frameworks",
      "Accountability in extractive industries",
      "Local governance and conflict-sensitive development",
    ],
    outcomes: [
      { phase: "Phase 1 (2026)", items: ["Community dialogue networks established", "First SSR framework consultations", "Cross-border mediation pilots launched"] },
      { phase: "Phase 2 (2027–28)", items: ["Reconciliation programs in 3+ communities", "SSR policy recommendations published", "Extractive industry accountability charter drafted"] },
      { phase: "Phase 3 (2029)", items: ["Regional SSR model adopted", "Sustained cross-border peace networks", "International partner recognition"] },
    ],
    image: "/gallery/peace-conference-nairobi.jpg",
    color: "from-amber-900 to-amber-800",
    icon: Globe,
  },
  {
    id: "east-africa",
    flag: "🌍",
    label: "East African Region",
    subtitle: "Regional Integration & Leadership Diplomacy",
    overview: "As the East African Community (EAC) expands, KISLP will act as a regional hub for harmonizing peace and security policies.",
    context: "The EAC's expansion presents both an opportunity and a challenge: member states must develop shared frameworks for peace, security, and governance. KISLP bridges national leadership development with regional policy harmonization through its Leadership Diplomacy approach.",
    focus: "Enhancing the capacity of the EAC's peace and security architecture.",
    intervention: "Promoting 'Leadership Diplomacy' among member states to address transboundary conflicts and displacement.",
    priorities: [
      "EAC peace and security architecture capacity",
      "Leadership Diplomacy among member states",
      "Transboundary conflict resolution",
      "Regional displacement and migration governance",
      "Pan-African Leadership & Peace Index (2029)",
    ],
    outcomes: [
      { phase: "Phase 1 (2026)", items: ["EAC partnership framework established", "First Leadership Diplomacy cohort launched", "Regional symposium hosted"] },
      { phase: "Phase 2 (2027–28)", items: ["National Conference on Regional Peace", "Women in Leadership initiative launched", "Policy harmonization working groups formed"] },
      { phase: "Phase 3 (2029)", items: ["African Leadership & Peace Index published", "Recognized EAC think tank partner", "Multi-year regional funding secured"] },
    ],
    image: "/gallery/youth-peace-programme.jpg",
    color: "from-green-900 to-green-800",
    icon: Users,
  },
];

export default function Impact() {
  const [active, setActive] = useState(0);
  const region = regions[active];

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/gallery/peace-conference-nairobi.jpg')", backgroundSize: "cover", backgroundPosition: "center 20%" }}
      >
        <div className="absolute inset-0 bg-primary/82" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Regional Focus &amp; Contextual Adaptation
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            KISLP's programs are designed for — and adapted to — the specific realities of South Sudan, the DRC, and the East African Region.
          </motion.p>
        </div>
      </section>

      {/* Region Tabs */}
      <section className="py-4 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-md bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 justify-center py-4">
          {regions.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                active === i
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              <span>{r.flag}</span>
              {r.label}
            </button>
          ))}
        </div>
      </section>

      {/* Region Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={region.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
        >
          {/* Region Hero Banner */}
          <section
            className="relative py-20"
            style={{ backgroundImage: `url('${region.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-primary/78" />
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="text-secondary" size={22} />
                <span className="text-secondary uppercase tracking-widest text-xs font-bold">{region.flag} {region.label}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{region.subtitle}</h2>
              <p className="text-primary-foreground/85 text-lg max-w-3xl leading-relaxed">{region.overview}</p>
            </div>
          </section>

          {/* Context + Focus */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                <div>
                  <p className="text-secondary uppercase tracking-widest text-xs font-bold mb-3">Context</p>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-5">Understanding the Landscape</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">{region.context}</p>

                  <div className="bg-muted/40 border border-border rounded-xl p-6 mb-6">
                    <p className="text-secondary uppercase tracking-widest text-xs font-bold mb-2">Focus</p>
                    <p className="text-foreground font-medium leading-relaxed">{region.focus}</p>
                  </div>
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                    <p className="text-secondary uppercase tracking-widest text-xs font-bold mb-2">Intervention</p>
                    <p className="text-foreground font-medium leading-relaxed">{region.intervention}</p>
                  </div>
                </div>

                <div>
                  <p className="text-secondary uppercase tracking-widest text-xs font-bold mb-3">Strategic Priorities</p>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-5">Key Areas of Action</h3>
                  <ul className="space-y-3 mb-10">
                    {region.priorities.map((p, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex items-start gap-3 bg-card border border-border rounded-xl px-5 py-4"
                      >
                        <CheckCircle className="text-secondary shrink-0 mt-0.5" size={18} />
                        <span className="text-foreground text-sm font-medium">{p}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Phased Outcomes */}
          <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="text-secondary uppercase tracking-widest text-xs font-bold mb-3">2026–2029 Roadmap</p>
                <h3 className="text-3xl font-serif font-bold text-primary">Phased Outcomes — {region.label}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {region.outcomes.map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-primary p-5">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-secondary" size={18} />
                        <span className="font-serif font-bold text-white">{phase.phase}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle size={14} className="text-secondary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* Conclusion CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4">Section VI — Conclusion</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">A Collective Journey</h2>
          <p className="text-primary-foreground/80 text-lg mb-4 max-w-3xl mx-auto leading-relaxed">
            The Kussala Institute for Strategic Leadership and Peacebuilding was founded on the conviction that peace is not merely the absence of war, but the presence of justice and ethical governance.
          </p>
          <p className="text-primary-foreground/70 text-base mb-10 max-w-3xl mx-auto leading-relaxed">
            In the face of the unique challenges currently facing South Sudan, the DRC, and East Africa, the need for a home-grown, research-driven leadership institute has never been more critical. We recognize that the road to sustainable peace is a collective journey. We cannot achieve this vision in isolation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-secondary text-secondary-foreground px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-white hover:text-primary shadow-xl">
              Partner With Us <ArrowRight size={18} className="inline ml-1" />
            </Link>
            <Link href="/contact" className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-white/10">
              Send a Formal Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
