import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Handshake, CheckCircle, CreditCard, Building2, DollarSign, Quote, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const partnershipTiers = [
  {
    icon: Heart,
    name: "Technical Partner",
    tag: "Expertise",
    desc: "Share your expertise in governance, conflict analysis, or peacebuilding with KUI's research and program teams.",
    benefits: ["Advisory Council contribution", "Co-authorship on research publications", "Recognition in annual reports", "Invitation to policy forums"],
    color: "border-border hover:border-secondary",
  },
  {
    icon: DollarSign,
    name: "Financial Investor",
    tag: "Investment",
    desc: "Invest in the 2026–2029 SLPI-FS flagship project and directly fund the next generation of African leaders.",
    benefits: ["Dedicated impact reporting", "Named donor recognition", "Board acknowledgement", "Co-branding on funded programs"],
    color: "border-secondary bg-secondary/5",
    featured: true,
  },
  {
    icon: Handshake,
    name: "Strategic Ally",
    tag: "Alliance",
    desc: "Co-host regional peace dialogues and policy forums across South Sudan, DRC, and East Africa.",
    benefits: ["Joint event co-hosting", "Shared communications platforms", "Cross-organizational referrals", "Strategic MOU formalization"],
    color: "border-border hover:border-primary",
  },
];

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  organization: z.string().optional(),
  amount: z.string().min(1, "Please enter an amount"),
  category: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Donate() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", organization: "", amount: "", category: "" },
  });

  async function onSubmit(values: FormValues) {
    setSending(true);
    setSendError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          organization: values.organization || "Not provided",
          subject: "Donation / Partnership Interest",
          message: [
            `Proposed Contribution (USD): ${values.amount}`,
            `Partnership Type: ${values.category || "Not provided"}`,
            "",
            "This inquiry was submitted from the Invest in KUI page.",
          ].join("\n"),
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch {
      setSendError("Unable to send your inquiry. Please try again or email us directly at info@kussalainstitute.org.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/gallery/peace-leadership-highlights.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
            Section IV — Flagship Donor Proposal
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
          >
            Invest in KUI
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-secondary font-semibold mb-4 text-lg"
          >
            SLPI-FS — Strategic Leadership and Peacebuilding Initiative for Fragile Societies
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Sustainable peace is only possible through evidence-based policy and ethical capacity building. Join us as a partner in this historic initiative.
          </motion.p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">The Challenge</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Breaking the Vicious Cycle</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Fragile societies face a <strong className="text-foreground">"vicious cycle"</strong> of weak institutions and leadership deficits. KUSSALA Institute proposes that sustainable peace is only possible through evidence-based policy and ethical capacity building — addressing root causes, not symptoms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Motivating Quote */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="text-secondary mx-auto mb-5 opacity-60" size={36} />
          <motion.blockquote
            {...fadeUp}
            className="text-xl md:text-3xl font-serif font-bold text-white mb-5 leading-relaxed"
          >
            "Your investment does not just fund a program — it plants a seed of peace that will grow for generations."
          </motion.blockquote>
          <p className="text-secondary font-semibold tracking-widest text-xs uppercase">— KUSSALA Institute (KUI)</p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">How to Partner</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Three Ways to Join KUI</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether through expertise, investment, or strategic alignment — your engagement transforms lives and builds the Africa we all deserve.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnershipTiers.map((tier, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative rounded-2xl border-2 p-8 transition-all ${tier.color} ${tier.featured ? "shadow-lg" : ""}`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Primary Mode
                  </div>
                )}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <tier.icon className="text-primary" size={26} />
                </div>
                <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{tier.tag}</div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">{tier.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{tier.desc}</p>
                <ul className="space-y-2">
                  {tier.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle size={12} className="text-secondary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Your Support Matters */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { num: "01", heading: "You Shape History", body: "Africa's post-conflict societies are at a turning point. Your partnership helps write a new chapter — one defined by integrity, stability, and shared prosperity." },
              { num: "02", heading: "You Empower Leaders", body: "Every dollar invested develops ethical leaders who carry your values into government, civil society, and communities for decades to come." },
              { num: "03", heading: "You Build Lasting Peace", body: "KUI's research-driven model addresses root causes, not symptoms. Your support creates ripple effects that reach communities, borders, and generations." },
            ].map((item, i) => (
              <div key={i} className="bg-muted/40 border border-border rounded-2xl p-8">
                <div className="text-4xl font-serif font-bold text-secondary/40 mb-4">{item.num}</div>
                <h3 className="font-serif font-bold text-xl text-primary mb-3">{item.heading}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div {...fadeUp} className="bg-card border border-border rounded-2xl p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Heart className="text-primary" size={36} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Thank You!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Your support for KUSSALA Institute is deeply appreciated. Our team will be in touch within 24 hours to discuss your partnership.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="text-secondary" size={24} />
                    <h2 className="text-2xl font-serif font-bold text-primary">Express Your Interest</h2>
                  </div>
                  <div className="w-12 h-1 bg-secondary mb-8" />
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="donation-form">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="Your name" data-testid="input-donor-name" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input type="email" placeholder="your@email.com" data-testid="input-donor-email" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="organization" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization (Optional)</FormLabel>
                          <FormControl><Input placeholder="Donor organization or institution" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="amount" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proposed Contribution (USD)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                              <Input type="number" min="1" className="pl-7" placeholder="0" data-testid="input-amount" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partnership Type (Optional)</FormLabel>
                          <FormControl><Input placeholder="e.g. Technical Partner, Financial Investor, Strategic Ally..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      {sendError && (
                        <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 text-sm text-destructive">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <span>{sendError}</span>
                        </div>
                      )}
                      <Button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 text-base font-bold disabled:opacity-70"
                        data-testid="button-donate"
                      >
                        {sending ? (
                          <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Heart size={18} className="mr-2" />
                            Submit Partnership Interest
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Your inquiry will be directed to our team at info@kussalainstitute.org for a formal response.
                      </p>
                    </form>
                  </Form>
                </>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-8">
              <div className="bg-primary rounded-2xl p-10 text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="text-secondary" size={28} />
                  <h3 className="text-xl font-serif font-bold">Formal Inquiries</h3>
                </div>
                <p className="text-primary-foreground/80 text-sm mb-6">
                  Organizations interested in formal financial investment or multi-year partnerships should contact KUI directly.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Official Contact", value: "Bishop Kussala Barani Hiiboro Edwardo" },
                    { label: "Official Email", value: "info@kussalainstitute.org" },
                    { label: "Physical Address", value: "South Sudan, Plot 4979, Block 246, Muyenga" },
                    { label: "Project Reference", value: "SLPI-FS 2026–2029" },
                  ].map((row, i) => (
                    <div key={i} className="flex flex-col text-sm border-b border-primary-foreground/10 pb-3 last:border-0">
                      <span className="text-primary-foreground/60 text-xs uppercase tracking-wider">{row.label}</span>
                      <span className="text-white font-semibold mt-0.5">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-8">
                <Quote className="text-secondary mb-4" size={24} />
                <blockquote className="font-serif text-lg text-primary font-bold italic mb-3 leading-relaxed">
                  "We recognize that the road to sustainable peace is a collective journey. We cannot achieve this vision in isolation."
                </blockquote>
                <p className="text-muted-foreground text-sm">— KUSSALA Institute Founding Charter</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
