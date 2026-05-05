import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Quote, TrendingUp, MapPin, Users, Award, Globe } from "lucide-react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <div ref={ref} className="text-5xl md:text-6xl font-serif font-bold mb-2">{count}{suffix}</div>;
}

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Leaders Trained", color: "text-white" },
  { icon: Globe, value: 30, suffix: "+", label: "Countries Reached", color: "text-secondary" },
  { icon: Award, value: 100, suffix: "+", label: "Peace Initiatives", color: "text-white" },
  { icon: TrendingUp, value: 15, suffix: "+", label: "Partner Organizations", color: "text-secondary" },
  { icon: MapPin, value: 8, suffix: "", label: "Regional Offices", color: "text-white" },
  { icon: Users, value: 12000, suffix: "+", label: "Community Members Reached", color: "text-secondary" },
];

const stories = [
  {
    name: "Grace Akinyi",
    role: "Community Mediator, Kenya",
    story: "Before joining KISLP's Community Conflict Resolution program, our village was torn apart by land disputes. After six months of training and practice, I helped broker a lasting peace agreement between three clans. KISLP gave me the tools, but more importantly, it gave me the confidence.",
  },
  {
    name: "Ambassador Kofi Mensah",
    role: "Diplomatic Envoy, Ghana",
    story: "KISLP's Strategic Leadership Training transformed how I approach negotiations. The frameworks we learned — grounded in principled dialogue and long-term thinking — have been invaluable in my work at the continental level. This is world-class training.",
  },
  {
    name: "Nadia Al-Amin",
    role: "G7 Youth Initiative Alumna",
    story: "Being selected for the G7 Youth Leadership Initiative was life-changing. I went from a passionate but directionless activist to a strategic leader running a peacebuilding NGO with operations in four countries. KISLP believed in me before I believed in myself.",
  },
];

const milestones = [
  { year: "2015", event: "KISLP Founded — First cohort of 25 leaders from East Africa" },
  { year: "2016", event: "Launch of Peacebuilding Workshops in conflict-affected zones" },
  { year: "2017", event: "G7 Youth Leadership Initiative established, first 50 scholars enrolled" },
  { year: "2018", event: "Expansion to West and Central Africa; 200+ leaders trained" },
  { year: "2019", event: "Policy Development Forum produces landmark peace governance report" },
  { year: "2020", event: "Online learning platform launched; global reach achieved" },
  { year: "2021", event: "Strategic partnership with African Union Commission formalized" },
  { year: "2022", event: "500+ cumulative leaders trained; 30+ countries represented" },
  { year: "2023", event: "KISLP Research Journal launched; 100+ peace initiatives documented" },
  { year: "2024", event: "12,000+ community members reached through grassroots programs" },
];

export default function Impact() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, hsl(43 96% 50%) 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
            Measuring Change
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Our Impact
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Every statistic represents a life changed, a community strengthened, and a step closer to a more peaceful world.
          </motion.p>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="py-20 bg-primary/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center text-white">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-4"
              >
                <stat.icon className={`${stat.color} mx-auto mb-3`} size={28} />
                <div className={stat.color}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary-foreground/70 text-xs uppercase tracking-widest font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">Voices of Change</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Success Stories</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 flex flex-col"
              >
                <Quote className="text-secondary mb-5" size={32} />
                <p className="text-muted-foreground leading-relaxed flex-1 text-sm italic mb-6">"{s.story}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold shrink-0">
                    {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{s.name}</div>
                    <div className="text-secondary text-xs font-medium">{s.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">A Decade of Progress</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Our Journey</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative flex gap-6 mb-8 md:mb-10 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : "md:flex-row"} flex-row`}
              >
                <div className="hidden md:flex items-center justify-center w-1/2" />
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-secondary border-2 border-background -translate-x-1.5 mt-1.5 md:-translate-x-1.5 shrink-0" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
                  <span className="inline-block text-secondary font-bold text-sm mb-1">{m.year}</span>
                  <p className="text-foreground font-medium leading-relaxed text-sm">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
