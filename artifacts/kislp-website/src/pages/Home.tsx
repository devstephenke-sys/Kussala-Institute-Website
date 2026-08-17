import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Users, Heart, Zap, BookOpen, Download, FileDown, Quote, Scale } from "lucide-react";
import logoPath from "/kislp-logo.jpeg";

const focusAreas = [
  {
    icon: Scale,
    title: "Ethical Governance & Accountability",
    desc: "Strengthening transparent institutions, integrity in public life, and accountable leadership as the bedrock of sustainable peace and inclusive development.",
  },
  {
    icon: Users,
    title: "Youth Leadership & Civic Engagement",
    desc: "Empowering the next generation through structured leadership training, mentorship, and platforms for meaningful civic participation.",
  },
  {
    icon: Heart,
    title: "Inclusive Capacity Building",
    desc: "Strengthening the agency of women and persons with disabilities (PWDs) through tailored skills development and institutional support.",
  },
  {
    icon: Zap,
    title: "Humanitarian Response & Community Resilience",
    desc: "Providing life-saving assistance and sustainable support systems for vulnerable populations in crisis-affected areas.",
  },
  {
    icon: BookOpen,
    title: "TVET & Sustainable Livelihoods",
    desc: "Promoting economic independence through Competency-Based Education and Training (CBET) and market-aligned vocational schooling.",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary"
        style={{ backgroundImage: "url('/gallery/peace-conference-nairobi.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/88 via-primary/82 to-primary/96" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <img src={logoPath} alt="KUI Logo" className="h-32 md:h-48 w-auto rounded-full shadow-2xl border-4 border-secondary/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3"
          >
            Motto: Strategic Leadership. Sustainable Peace.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
          >
            Kussala Institute for <span className="text-secondary">Strategic Leadership</span> and Peacebuilding
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg md:text-xl text-primary-foreground/85 mb-5 max-w-3xl mx-auto font-light"
          >
            An independent, non-partisan, research-driven, and action-oriented institute forming visionary leaders and advancing strategic thinking for just, stable, and flourishing societies.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base text-primary-foreground/70 mb-10 max-w-2xl mx-auto font-light italic"
          >
            The road to sustainable peace begins with one courageous decision — to lead with integrity and purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/programs" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-muted shadow-lg">
              Strategic Plan 2026–2029 <ArrowRight size={20} />
            </Link>
            <Link href="/donate" className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-secondary/90 hover:scale-105 active:scale-95 shadow-lg border border-secondary">
              Become a Partner
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { value: "100+", label: "Leaders — Year 1 Target", sub: "Ethical Leadership Academy" },
              { value: "300+", label: "Participants by 2028", sub: "Regional Consolidation Phase" },
              { value: "4", label: "Focus Regions", sub: "South Sudan · DRC · East Africa · Central Africa" },
              { value: "2029", label: "African Leadership & Peace Index", sub: "Premier Regional Think Tank" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-muted-foreground uppercase tracking-widest text-xs font-semibold mb-1">{stat.label}</div>
                <div className="text-muted-foreground/60 text-xs">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">What We Do</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Our Focus Areas</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              KUI addresses root causes of fragility through five interconnected pillars of action, led by ethical governance and accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {focusAreas.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                  <item.icon className="text-primary group-hover:text-secondary transition-colors" size={28} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 font-serif">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="text-secondary mx-auto mb-6 opacity-60" size={48} />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-4xl font-serif font-bold text-white mb-6 leading-relaxed"
          >
            "Strategic Leadership is the foundation; Sustainable Peace is the harvest."
          </motion.blockquote>
          <p className="text-secondary font-semibold tracking-widest text-sm uppercase">— Kussala Institute for Peace Building</p>
        </div>
      </section>

      {/* Table of Contents / What's Inside */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Explore KUI</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">What We Cover</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Founding Charter", desc: "Our Preamble, Articles of Operation, Vision, Mission, and Core Values.", href: "/about" },
              { num: "02", title: "Governance Structure", desc: "Board of Trustees, Executive Director, and Advisory Council roles.", href: "/about" },
              { num: "03", title: "Strategic Plan 2026–2029", desc: "Four-phase roadmap from Institutional Establishment to Policy Influence.", href: "/programs" },
              { num: "04", title: "Flagship Donor Proposal", desc: "SLPI-FS project with $3.1M budget summary across five categories.", href: "/donate" },
              { num: "05", title: "Regional Focus", desc: "Contextual adaptation for South Sudan, DRC, East Africa, and the Central African Region.", href: "/impact" },
              { num: "06", title: "Call to Partnership", desc: "Technical, financial, and strategic alliance opportunities.", href: "/contact" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <Link href={item.href} className="block group bg-card border border-border rounded-2xl p-8 hover:border-secondary hover:shadow-md transition-all h-full">
                  <div className="text-4xl font-serif font-bold text-secondary/30 group-hover:text-secondary/60 transition-colors mb-4">{item.num}</div>
                  <h3 className="font-serif font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Proposal Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-10 bg-card border border-border rounded-2xl p-10 shadow-sm"
          >
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/10 border border-secondary/20 flex items-center justify-center">
              <FileDown className="text-primary" size={38} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-secondary uppercase tracking-widest text-xs font-semibold mb-2">Official Document</p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2">KUI Project Proposal Presentation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Download the full KUI proposal — including the Founding Charter, Strategic Plan 2026–2029, SLPI-FS Flagship Donor Proposal, and Regional Focus for South Sudan, DRC, East Africa, and the Central African Region.
              </p>
            </div>
            <div className="flex-shrink-0">
              <motion.a
                href="/KISLP-Proposal-Presentation.pptx"
                download="KISLP-Proposal-Presentation.pptx"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:bg-secondary/90 transition-colors"
              >
                <Download size={20} />
                Download Proposal
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden" style={{ backgroundImage: "url('/gallery/youth-leadership-workshop.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-primary/88" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Call to Partnership</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-4 font-light">
            We invite international donors, regional governments, academic institutions, and civil society organizations to join us.
          </p>
          <p className="text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Together, we can transform the leadership landscape of the African continent and build a future defined by stability, integrity, and shared prosperity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-secondary text-secondary-foreground px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-white hover:text-primary shadow-xl">
              Financial Investment
            </Link>
            <Link href="/contact" className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-white/10">
              Strategic Alliance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
