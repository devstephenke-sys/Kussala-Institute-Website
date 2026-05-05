import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, Star, Globe, BookOpen, ArrowRight, CheckCircle, TrendingUp, Shield, Award, Handshake } from "lucide-react";

const roadmap = [
  {
    year: "2026",
    phase: "Institutional Establishment",
    focus: "Legal registration, Board formation, and inaugural symposium.",
    outcome: "A functional and credible institutional structure.",
    color: "bg-primary",
    items: ["Legal registration completed", "Board of Trustees formed", "Inaugural symposium held", "Foundational partnerships established"],
  },
  {
    year: "2027",
    phase: "Program Expansion",
    focus: "Launching the Ethical Leadership Academy (100+ leaders) and Peace Ambassador Youth Program.",
    outcome: "Visible programmatic impact and county-level dialogue.",
    color: "bg-secondary",
    items: ["Ethical Leadership Academy launched", "100+ leaders enrolled", "Peace Ambassador Youth Program active", "County-level dialogues underway"],
  },
  {
    year: "2028",
    phase: "Regional Consolidation",
    focus: "Scaling to 300+ participants, hosting a National Conference, and launching the 'Women in Leadership' initiative.",
    outcome: "Regional recognition and policy relevance.",
    color: "bg-primary",
    items: ["300+ participants reached", "National Conference hosted", "Women in Leadership initiative launched", "Policy advisory publications released"],
  },
  {
    year: "2029",
    phase: "Policy Influence & Scale",
    focus: "Launching the African Leadership & Peace Index and securing multi-year funding.",
    outcome: "Established status as a premier regional think tank.",
    color: "bg-secondary",
    items: ["African Leadership & Peace Index launched", "Multi-year donor funding secured", "Premier regional think tank status", "Pan-African strategic partnerships"],
  },
];

const governance = [
  {
    icon: Shield,
    title: "Board of Trustees",
    responsibility: "Strategic oversight, policy approval, and financial accountability.",
    detail: "The Board provides the highest level of governance, ensuring KUI operates with integrity and in line with its founding mandate. It approves all major institutional policies and ensures financial stewardship.",
  },
  {
    icon: Award,
    title: "Executive Director",
    responsibility: "Institutional leadership, partnerships, and program supervision.",
    detail: "The Executive Director leads daily operations, manages strategic alliances across South Sudan, DRC, and East Africa, and oversees all programmatic activities in line with the 2026–2029 Strategic Plan.",
  },
  {
    icon: Handshake,
    title: "Advisory Council",
    responsibility: "Expert guidance from scholars, practitioners, and civic leaders.",
    detail: "The Advisory Council brings together diverse expertise from academia, government, civil society, and the private sector to inform KUI's research, policy positions, and strategic direction.",
  },
];

const focusAreas = [
  {
    icon: Users,
    title: "Youth Leadership & Civic Engagement",
    tag: "Youth Track",
    desc: "Empowering the next generation through structured leadership training, mentorship, and platforms for meaningful civic participation. The Peace Ambassador Youth Program targets young leaders for county-level dialogue and national advocacy.",
    features: ["Structured leadership training", "Mentorship programs", "Civic participation platforms", "Peace Ambassador Youth Program", "National Conference representation"],
    color: "primary",
  },
  {
    icon: Star,
    title: "Inclusive Capacity Building",
    tag: "Inclusion Track",
    desc: "Strengthening the agency of women and persons with disabilities (PWDs) through tailored skills development and institutional support. The 'Women in Leadership' initiative launches in 2028.",
    features: ["Women in Leadership initiative (2028)", "PWD-focused skills development", "Tailored institutional support", "Gender-responsive programming", "Inclusive policy advisory"],
    color: "secondary",
  },
  {
    icon: Globe,
    title: "Humanitarian Response & Community Resilience",
    tag: "Resilience Track",
    desc: "Providing life-saving assistance and sustainable support systems for vulnerable populations in crisis-affected areas. Grounded in ethical leadership for stable governance.",
    features: ["Crisis response frameworks", "Community resilience building", "Ethical public financial management", "Revitalized Peace Agreement support", "Local governance strengthening"],
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "TVET & Sustainable Livelihoods",
    tag: "Economic Track",
    desc: "Promoting economic independence through Competency-Based Education and Training (CBET) and market-aligned vocational schooling to address unemployment and radicalization.",
    features: ["CBET curriculum development", "Market-aligned vocational training", "Economic independence programs", "Youth employment pathways", "Private sector linkages"],
    color: "secondary",
  },
];

const flagship = {
  title: "Ethical Leadership Academy",
  subtitle: "Flagship Program — Launching 2027",
  desc: "The Ethical Leadership Academy is KUI's premier training program, targeting 100+ leaders in its inaugural cohort. Designed for emerging and established leaders in fragile and post-conflict contexts, the Academy combines strategic thinking, ethical frameworks, and peacebuilding tools.",
  features: [
    "Strategic thinking and decision-making",
    "Ethical governance frameworks",
    "Conflict analysis and mediation",
    "Policy development and advocacy",
    "Cross-regional leadership exchange",
    "African Leadership & Peace Index (2029)",
  ],
};

export default function Programs() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/gallery/youth-leadership-workshop.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%" }}
      >
        <div className="absolute inset-0 bg-primary/82" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
            Section II
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Strategic Plan 2026–2029
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Roadmap to Impact — Four phases from Institutional Establishment to Policy Influence &amp; Scale.
          </motion.p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Roadmap to Impact</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Four-Phase Strategy</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {roadmap.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className={`${phase.color} p-5 text-center`}>
                  <div className="text-3xl font-serif font-bold text-white">{phase.year}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg text-foreground mb-3">{phase.phase}</h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed"><strong className="text-foreground">Focus:</strong> {phase.focus}</p>
                  <p className="text-secondary text-sm font-semibold mb-4 italic">{phase.outcome}</p>
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle size={12} className="text-secondary shrink-0 mt-0.5" />
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

      {/* Governance Structure */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Section I</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Governance Structure</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three bodies working in concert to ensure KUI operates with integrity, accountability, and strategic purpose.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {governance.map((body, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors" />
                <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-secondary/10 transition-colors flex items-center justify-center mb-6">
                  <body.icon className="text-primary group-hover:text-secondary transition-colors" size={28} />
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-2">{body.title}</h3>
                <p className="text-secondary text-sm font-semibold mb-4 italic">{body.responsibility}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{body.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Program */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-2xl p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-secondary uppercase tracking-widest text-xs font-semibold mb-3">Flagship Program</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">{flagship.title}</h2>
              <p className="text-secondary text-sm font-semibold mb-6">{flagship.subtitle}</p>
              <p className="text-primary-foreground/80 leading-relaxed mb-8 text-lg max-w-3xl">{flagship.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flagship.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <CheckCircle size={14} className="text-secondary shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Focus Areas */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Core Programming</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Our Focus Areas</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              KUI addresses the root causes of fragility through four interconnected pillars of transformative action.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {focusAreas.map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${prog.color === "primary" ? "bg-primary/10" : "bg-secondary/15"}`}>
                    <prog.icon className={prog.color === "primary" ? "text-primary" : "text-secondary"} size={28} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1 rounded-full">{prog.tag}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{prog.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{prog.desc}</p>
                <ul className="space-y-2">
                  {prog.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className={prog.color === "primary" ? "text-primary shrink-0" : "text-secondary shrink-0"} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <TrendingUp className="mx-auto text-secondary-foreground mb-4" size={36} />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-foreground mb-4">
              Support the 2026–2029 Flagship Initiative
            </h2>
            <p className="text-secondary-foreground/80 mb-8 text-lg">
              The SLPI-FS project is our call to action. Partner with KUI to fund leadership programs, peacebuilding activities, and independent research that will shape the future of Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-primary/90">
                Financial Investment <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary/30 text-primary px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-primary/10">
                Technical Partnership
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
