import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, Shield, BookOpen, MessageSquare, FileText, Star, ArrowRight, CheckCircle } from "lucide-react";

const programs = [
  {
    icon: Users,
    title: "Strategic Leadership Training",
    tag: "Core Program",
    duration: "6 Months",
    description: "An immersive, rigorous curriculum designed for emerging and established leaders. Participants gain advanced skills in strategic thinking, organizational management, ethical decision-making, and cross-cultural communication.",
    features: ["Executive coaching sessions", "Case studies from global conflicts", "Simulation-based learning", "International guest lecturers", "Alumni mentorship network"],
    color: "primary",
  },
  {
    icon: Shield,
    title: "Peacebuilding Workshops",
    tag: "Intensive Training",
    duration: "2-4 Weeks",
    description: "Hands-on workshops that equip participants with practical mediation, dialogue facilitation, and reconciliation skills. Delivered in partnership with communities experiencing active or post-conflict situations.",
    features: ["Conflict analysis frameworks", "Community dialogue facilitation", "Trauma-informed approaches", "Grassroots implementation tools", "Field visits and community engagement"],
    color: "secondary",
  },
  {
    icon: Star,
    title: "G7 Youth Leadership Initiative",
    tag: "Youth Track",
    duration: "12 Months",
    description: "Named after the G7 mandate embedded in our founding charter, this initiative identifies and develops exceptional young leaders (ages 18-35) from underrepresented regions, providing them a global stage and comprehensive support.",
    features: ["International exchange programs", "Mentorship by senior diplomats", "Seed grants for peace projects", "UN and AU accreditation", "Global leadership summits"],
    color: "primary",
  },
  {
    icon: MessageSquare,
    title: "Community Conflict Resolution",
    tag: "Community Program",
    duration: "Ongoing",
    description: "At the grassroots level, this program trains local leaders, chiefs, women's groups, and faith leaders in principled negotiation and community dialogue. Real change starts at home.",
    features: ["Localized training modules", "Women and youth focus", "Traditional leaders integration", "Dispute resolution clinics", "Community peace committees"],
    color: "secondary",
  },
  {
    icon: FileText,
    title: "Policy Development Forums",
    tag: "Policy Track",
    duration: "Year-round",
    description: "Convening policymakers, academics, and civil society actors to co-create evidence-based policy frameworks. KISLP bridges the gap between research and actionable governance reform.",
    features: ["Policy briefs and white papers", "Government advisory services", "Legislative reform workshops", "Regional policy summits", "International partnerships"],
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "Research & Publications",
    tag: "Knowledge Hub",
    duration: "Ongoing",
    description: "KISLP produces rigorous academic and practitioner research on leadership, peacebuilding, and governance, contributing to the global body of knowledge and informing practice worldwide.",
    features: ["Peer-reviewed journal", "Annual state of peace report", "Case study library", "Webinars and podcasts", "Open access resources"],
    color: "secondary",
  },
];

export default function Programs() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, hsl(43 96% 50%) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
            What We Offer
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Our Programs
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Comprehensive, evidence-based programs designed to develop transformative leaders and build lasting peace at every level of society.
          </motion.p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {programs.map((prog, i) => (
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
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1 rounded-full">{prog.tag}</span>
                    <span className="text-xs text-muted-foreground">{prog.duration}</span>
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{prog.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{prog.description}</p>
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-secondary-foreground mb-4"
          >
            Ready to Join a Program?
          </motion.h2>
          <p className="text-secondary-foreground/80 mb-8 text-lg">
            Contact us to learn more about eligibility, application processes, and upcoming cohorts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-primary/90">
              Get in Touch <ArrowRight size={20} />
            </Link>
            <Link href="/donate" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary/30 text-primary px-8 py-4 rounded-md font-bold text-lg transition-all hover:bg-primary/10">
              Support Our Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
