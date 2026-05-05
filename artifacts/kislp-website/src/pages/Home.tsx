import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Users, Award } from "lucide-react";
import logoPath from "/kislp-logo.jpeg";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary to-background"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <img src={logoPath} alt="KISLP Logo" className="h-32 md:h-48 w-auto rounded-full shadow-2xl border-4 border-secondary/50" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Nurturing Leaders and <span className="text-secondary">Peace Building</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-primary-foreground/80 mb-10 max-w-3xl mx-auto font-light"
          >
            The Kussala Institute for Strategic Leadership and Peacebuilding empowers global changemakers to navigate complexity, resolve conflict, and forge a sustainable future.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/programs" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-muted shadow-lg">
              Explore Programs <ArrowRight size={20} />
            </Link>
            <Link href="/donate" className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-secondary/90 hover:scale-105 active:scale-95 shadow-lg border border-secondary">
              Support Our Mission
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="text-5xl font-serif font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">Leaders Trained</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6"
            >
              <div className="text-5xl font-serif font-bold text-secondary mb-2">30+</div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">Countries Reached</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-5xl font-serif font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">Peace Initiatives</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Our Core Pillars</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Through strategic education and community engagement, KISLP addresses the root causes of conflict while building the capacity for sustainable governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Diplomacy", desc: "Equipping leaders with high-level negotiation and international relations skills." },
              { icon: Shield, title: "Conflict Resolution", desc: "Mediating disputes and designing frameworks for long-term reconciliation." },
              { icon: Users, title: "Youth Empowerment", desc: "Cultivating the next generation of visionary ethical leaders." },
              { icon: Award, title: "Policy Development", desc: "Advising governments and institutions on impactful peacebuilding strategies." }
            ].map((item, idx) => (
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
                <h3 className="text-xl font-bold text-foreground mb-3 font-serif">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Invest in Global Peace</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 font-light">
            Your support enables us to train more leaders, mediate conflicts, and build resilient communities worldwide. Join us in shaping a more peaceful tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-secondary text-secondary-foreground px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-white hover:text-primary shadow-xl">
              Become a Partner
            </Link>
            <Link href="/contact" className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
