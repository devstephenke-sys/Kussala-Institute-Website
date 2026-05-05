import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  Target, TrendingUp, Users, Globe, BookOpen, Lightbulb,
  ArrowRight, CheckCircle, Layers, Shield, BarChart3, HeartHandshake
} from "lucide-react";
import { Link } from "wouter";

function AnimatedNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const projectedStats = [
  { icon: Users, value: 1000, suffix: "+", label: "Leaders to be Trained", sub: "Over 5 years", color: "text-secondary" },
  { icon: Globe, value: 50, suffix: "+", label: "Countries to Reach", sub: "Across all regions", color: "text-white" },
  { icon: Shield, value: 200, suffix: "+", label: "Peace Initiatives", sub: "Community-level", color: "text-secondary" },
  { icon: BookOpen, value: 25000, suffix: "+", label: "Community Members", sub: "Direct beneficiaries", color: "text-white" },
  { icon: HeartHandshake, value: 30, suffix: "+", label: "Partner Organizations", sub: "Global network", color: "text-secondary" },
  { icon: BarChart3, value: 5, suffix: "", label: "Regional Offices", sub: "Planned locations", color: "text-white" },
];

const theoryOfChange = [
  {
    step: "01",
    icon: Lightbulb,
    title: "Identify & Select",
    desc: "We identify high-potential leaders from conflict-affected and underserved regions — civil servants, youth activists, community organizers, and emerging diplomats.",
  },
  {
    step: "02",
    icon: BookOpen,
    title: "Train & Equip",
    desc: "Participants undergo rigorous, structured training in strategic leadership, negotiation, conflict analysis, and governance — grounded in both theory and practice.",
  },
  {
    step: "03",
    icon: Layers,
    title: "Deploy & Apply",
    desc: "Trained leaders return to their communities and institutions, applying their skills to drive real change — mediating disputes, reforming governance, and building local resilience.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Measure & Scale",
    desc: "We track outcomes rigorously — peace agreements reached, policies reformed, communities stabilized — and use this data to continuously improve and scale our programs.",
  },
];

const outcomes = [
  {
    category: "Year 1 Targets",
    color: "bg-secondary",
    textColor: "text-secondary-foreground",
    items: [
      "Launch Strategic Leadership Training with 50 participants",
      "Establish 2 regional offices (East & West Africa)",
      "Conduct 10 community peacebuilding workshops",
      "Enroll first cohort of 20 G7 Youth Initiative scholars",
      "Publish inaugural KISLP Research Report",
    ],
  },
  {
    category: "3-Year Milestones",
    color: "bg-primary",
    textColor: "text-primary-foreground",
    items: [
      "500+ leaders trained across 25+ countries",
      "5 policy reform frameworks adopted by governments",
      "100 grassroots peace committees established",
      "Strategic partnership with African Union secured",
      "Online learning platform launched with 10,000 users",
    ],
  },
  {
    category: "5-Year Vision",
    color: "bg-muted",
    textColor: "text-foreground",
    items: [
      "1,000+ leaders trained across 50+ countries",
      "KISLP recognized as a leading global peacebuilding institution",
      "200+ measurable peace outcomes documented",
      "Self-sustaining funding model achieved",
      "Annual Global Peace Leadership Forum established",
    ],
  },
];

const pillars = [
  { icon: Target, title: "Strategic Focus", desc: "Every intervention is targeted at high-impact zones where capable leadership and conflict resolution skills are most urgently needed." },
  { icon: Globe, title: "Global Reach", desc: "From East Africa to South Asia, our programs are designed to be culturally adaptive and globally scalable." },
  { icon: Users, title: "People-Centred", desc: "We invest in individuals — believing that one well-equipped leader can transform an entire community." },
  { icon: TrendingUp, title: "Evidence-Based", desc: "All programs are designed with clear metrics, regular evaluation, and a commitment to learning and improvement." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Impact() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(ellipse at 20% 60%, hsl(43 96% 50%) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, hsl(216 73% 45%) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-secondary uppercase tracking-widest text-sm font-semibold mb-5 border border-secondary/30 px-4 py-1.5 rounded-full">
              Project Proposal
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Projected Impact &<br /><span className="text-secondary">Expected Outcomes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            KISLP is a visionary proposal designed to address a critical gap in global leadership and peacebuilding capacity. Here is what we intend to achieve.
          </motion.p>
        </div>
      </section>

      {/* ── Animated Projected Stats ── */}
      <section className="py-20 bg-primary/95 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(43 96% 50%) 0px, transparent 1px, transparent 40px, hsl(43 96% 50%) 41px)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-secondary/80 uppercase tracking-widest text-xs font-semibold mb-10"
          >
            5-Year Projected Targets
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center text-white"
          >
            {projectedStats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="group">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-4"
                >
                  <stat.icon className={`${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} size={28} />
                  <div className={`text-4xl md:text-5xl font-serif font-bold mb-1 ${stat.color}`}>
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-primary-foreground/80 text-xs uppercase tracking-widest font-medium mb-1">{stat.label}</div>
                  <div className="text-primary-foreground/40 text-xs italic">{stat.sub}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Theory of Change ── */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">How Change Happens</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Theory of Change</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-5" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our approach is built on a clear, evidence-informed logic: equipped leaders create peaceful communities, and peaceful communities enable sustainable development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connecting line desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />

            {theoryOfChange.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative bg-card border border-border rounded-2xl p-8 text-center group hover:border-secondary hover:shadow-xl transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-full bg-primary mx-auto mb-5 flex items-center justify-center relative z-10 shadow-lg"
                >
                  <step.icon className="text-secondary" size={32} />
                </motion.div>
                <div className="text-secondary/40 font-serif font-bold text-5xl absolute top-4 right-6 select-none">{step.step}</div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projected Outcomes by Phase ── */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Phased Approach</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Projected Outcomes</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outcomes.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className={`${phase.color} px-8 py-5`}>
                  <h3 className={`font-serif font-bold text-lg ${phase.textColor}`}>{phase.category}</h3>
                </div>
                <div className="bg-card p-8 space-y-4">
                  {phase.items.map((item, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + j * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle size={15} className="text-secondary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Matters ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">The Gap We Address</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Why This Proposal Matters</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Across Africa and beyond, the deficit of trained, strategic, and principled leadership remains one of the most persistent drivers of conflict, poor governance, and underdevelopment.
                </p>
                <p>
                  Existing institutions are either inaccessible to grassroots leaders or disconnected from the realities of conflict-affected communities. KISLP bridges this critical gap with a practical, inclusive, and rigorous approach.
                </p>
                <p>
                  This proposal presents a credible, scalable, and financially sustainable model to develop the next generation of peacebuilders and strategic leaders — people who will change the trajectory of their nations.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
              >
                <Link href="/donate" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-md font-bold text-sm hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg">
                  Support This Initiative <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-5"
            >
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}
                  transition={{ type: "spring", stiffness: 300 }}
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

      {/* ── Call to Action ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(circle at 10% 90%, hsl(43 96% 50% / 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 10%, hsl(43 96% 50% / 0.10) 0%, transparent 40%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Invest in the Future of <span className="text-secondary">Peace</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="text-primary-foreground/80 text-lg mb-10 font-light"
          >
            Your support transforms this proposal into reality. Partner with KISLP to equip leaders, resolve conflicts, and build lasting peace across the globe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
