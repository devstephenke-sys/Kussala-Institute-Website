import { motion } from "framer-motion";
import { Target, Eye, Heart, BookOpen, Scale, Globe } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassion", desc: "We approach every conflict with empathy, recognizing the humanity in all parties involved." },
  { icon: Scale, title: "Integrity", desc: "Our work is grounded in ethical principles, transparency, and accountability at every level." },
  { icon: Globe, title: "Inclusivity", desc: "We champion diverse voices and ensure that marginalized communities have a seat at the table." },
  { icon: BookOpen, title: "Excellence", desc: "We hold ourselves to the highest standards in research, training, and peacebuilding practice." },
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
      <section className="relative py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(43 96% 50%) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(43 96% 50%) 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
            Who We Are
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            About KISLP
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Founded with the conviction that capable, ethical leaders are the cornerstone of lasting peace, KISLP has grown into a globally recognized institution for strategic leadership development.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Built on a Foundation of Peace</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                KISLP was established in response to a growing need for structured, professional development of leaders equipped to navigate the complexities of modern conflict and governance. Our founders witnessed firsthand the devastating toll that poor leadership and unresolved conflict take on communities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What began as a regional initiative has expanded into an internationally respected institution, working with governments, civil society organizations, universities, and international bodies to advance the cause of strategic leadership and durable peace.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The G7 Leadership Initiative — represented at the heart of our seal — reflects our commitment to structured, collaborative global governance, drawing lessons from the world's most successful multilateral frameworks.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: "2015", label: "Year Founded" },
                { value: "500+", label: "Leaders Trained" },
                { value: "30+", label: "Countries Reached" },
                { value: "100+", label: "Peace Initiatives" },
              ].map((stat, i) => (
                <div key={i} className="bg-muted/40 border border-border rounded-xl p-8 text-center">
                  <div className="text-4xl font-serif font-bold text-secondary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
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
              <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
              <p className="text-primary-foreground/85 leading-relaxed text-lg">
                To equip leaders at all levels with the strategic skills, ethical frameworks, and peacebuilding tools needed to foster sustainable development, resolve conflict, and build resilient societies.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="bg-secondary rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <Eye className="text-secondary-foreground mb-6" size={40} />
              <h3 className="text-2xl font-serif font-bold text-secondary-foreground mb-4">Our Vision</h3>
              <p className="text-secondary-foreground/90 leading-relaxed text-lg">
                A world where capable, compassionate, and principled leaders govern justly, where conflicts are resolved through dialogue, and where every community has the opportunity to thrive in peace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Core Values</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border border-border rounded-xl p-8 hover:border-secondary transition-all hover:shadow-md"
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

      {/* Leadership Team */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">The People Behind KISLP</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Leadership Team</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-card border-2 border-dashed border-secondary/30 rounded-2xl p-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-secondary/30 flex items-center justify-center mx-auto mb-6">
              <span className="text-secondary font-serif font-bold text-2xl">?</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-3">To Be Determined</h3>
            <p className="text-muted-foreground leading-relaxed">
              The KISLP leadership team is currently being assembled. We are recruiting exceptional individuals with deep expertise in strategic leadership, peacebuilding, diplomacy, and governance.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
