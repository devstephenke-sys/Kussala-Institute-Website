import { motion } from "framer-motion";
import { Target, Eye, Shield, Star, HeartHandshake, Users, Award, Handshake, Download } from "lucide-react";

const coreValues = [
  { icon: Shield, title: "Integrity", desc: "Grounded in ethical principles, transparency, and accountability at every level of operation." },
  { icon: Star, title: "Strategic Excellence", desc: "Holding ourselves to the highest standards in research, training, and peacebuilding practice." },
  { icon: HeartHandshake, title: "Peace & Reconciliation", desc: "Committed to dialogue, mediation, and sustainable frameworks for long-term peace." },
  { icon: Eye, title: "Human Dignity", desc: "Recognizing and upholding the inherent worth and rights of every individual we serve." },
  { icon: Award, title: "Accountability", desc: "Taking responsibility for outcomes and maintaining openness with all stakeholders." },
  { icon: Users, title: "Collaboration", desc: "Partnering with governments, civil society, academia, and communities to amplify impact." },
  { icon: Handshake, title: "Service Leadership", desc: "Leading not for prestige, but in service to communities and the greater good of society." },
];

const governance = [
  {
    title: "Board of Trustees",
    responsibility: "Strategic oversight, policy approval, and financial accountability.",
    detail: "The Board provides the highest level of governance, ensuring KISLP operates with integrity and in line with its founding mandate.",
  },
  {
    title: "Executive Director",
    responsibility: "Institutional leadership, partnerships, and program supervision.",
    detail: "The Executive Director leads daily operations, manages strategic alliances, and oversees all programmatic activities across regions.",
  },
  {
    title: "Advisory Council",
    responsibility: "Expert guidance from scholars, practitioners, and civic leaders.",
    detail: "The Advisory Council brings together diverse expertise to inform KISLP's research, policy positions, and strategic direction.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/gallery/women-leaders-africa.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-primary/82" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
            Founding Charter
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            About KISLP
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            An independent, non-partisan, research-driven, and action-oriented institute established to shape ethical leaders and advance strategic thinking.
          </motion.p>
        </div>
      </section>

      {/* Preamble */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp}>
              <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Preamble</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Our Founding Conviction</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Recognizing that fragile and post-conflict societies require ethical leadership, strong institutions, and sustainable peace frameworks; Affirming that development without integrity, governance without accountability, and leadership without strategic foresight cannot secure justice or stability.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                We hereby establish KISLP as an <strong className="text-foreground">independent, non-partisan, research-driven, and action-oriented</strong> institute dedicated to forming the leaders Africa and the world urgently need.
              </p>
              <blockquote className="border-l-4 border-secondary pl-6 py-2 italic text-primary font-medium text-lg">
                "Strategic Leadership is the foundation; Sustainable Peace is the harvest."
              </blockquote>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-5">
              <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-1">Articles of Operation</p>
              {[
                { label: "Status", text: "KISLP is a non-profit, non-partisan research and policy institute with full legal personality." },
                { label: "Vision", text: "To be a leading African institute shaping ethical leaders and advancing strategic thinking for just, stable, and flourishing societies." },
                { label: "Mission", text: "To form visionary leaders, conduct independent research, provide strategic conflict solutions, and equip institutions with policy-relevant knowledge." },
                { label: "Core Values", text: "Integrity, Strategic Excellence, Peace & Reconciliation, Human Dignity, Accountability, Collaboration, and Service Leadership." },
              ].map((art, i) => (
                <div key={i} className="bg-muted/40 border border-border rounded-xl p-6">
                  <div className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">{art.label}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{art.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div {...fadeUp} className="bg-primary text-primary-foreground rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
              <Target className="text-secondary mb-6" size={40} />
              <p className="text-secondary uppercase tracking-widest text-xs font-semibold mb-2">Mission</p>
              <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
              <p className="text-primary-foreground/85 leading-relaxed text-lg">
                To form visionary leaders, conduct independent research, provide strategic conflict solutions, and equip institutions with policy-relevant knowledge.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="bg-secondary rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <Eye className="text-secondary-foreground mb-6" size={40} />
              <p className="text-secondary-foreground/70 uppercase tracking-widest text-xs font-semibold mb-2">Vision</p>
              <h3 className="text-2xl font-serif font-bold text-secondary-foreground mb-4">Our Vision</h3>
              <p className="text-secondary-foreground/90 leading-relaxed text-lg">
                To be a leading African institute shaping ethical leaders and advancing strategic thinking for just, stable, and flourishing societies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Core Values</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Core Values</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group border border-border rounded-xl p-7 hover:border-secondary transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-secondary/10 flex items-center justify-center mb-5 transition-colors">
                  <v.icon className="text-primary group-hover:text-secondary transition-colors" size={24} />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
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
            <p className="text-muted-foreground max-w-xl mx-auto">Three bodies working in concert to ensure KISLP operates with integrity, accountability, and strategic purpose.</p>
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
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="font-serif font-bold text-primary text-lg">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">{body.title}</h3>
                <p className="text-secondary text-sm font-semibold mb-4 italic">{body.responsibility}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{body.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Proposal */}
      <section className="py-16 bg-background border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-8 bg-primary rounded-2xl p-10 text-center sm:text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-16 h-16 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
              <Download className="text-secondary" size={30} />
            </div>
            <div className="flex-1">
              <p className="text-secondary uppercase tracking-widest text-xs font-semibold mb-1">Official Proposal</p>
              <h3 className="text-xl font-serif font-bold text-white mb-1">Download Our Full Proposal Presentation</h3>
              <p className="text-primary-foreground/70 text-sm">Founding Charter, Strategic Plan 2026–2029, SLPI-FS Donor Proposal, and Regional Focus.</p>
            </div>
            <a
              href="/KISLP-Proposal-Presentation.pptx"
              download="KISLP-Proposal-Presentation.pptx"
              className="shrink-0 inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-white hover:text-primary transition-colors shadow-lg"
            >
              <Download size={16} />
              Download
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
