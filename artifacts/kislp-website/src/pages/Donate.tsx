import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Star, Globe, CheckCircle, CreditCard, Building2 } from "lucide-react";
import { useState } from "react";

const tiers = [
  {
    icon: Heart,
    name: "Supporter",
    amount: 25,
    color: "border-border hover:border-secondary",
    impact: "Funds learning materials for one leader-in-training for a full month.",
    perks: ["Certificate of Appreciation", "Quarterly Newsletter", "Community Access"],
  },
  {
    icon: Shield,
    name: "Advocate",
    amount: 100,
    color: "border-secondary bg-secondary/5",
    impact: "Sponsors a grassroots community dialogue session, bringing peace to a village.",
    perks: ["All Supporter benefits", "KISLP Annual Report", "Exclusive Webinar Access", "Name in Annual Report"],
    featured: true,
  },
  {
    icon: Star,
    name: "Champion",
    amount: 500,
    color: "border-border hover:border-primary",
    impact: "Funds one full scholarship for a youth participant in our G7 Leadership Initiative.",
    perks: ["All Advocate benefits", "1-on-1 Impact Call", "Dedicated Impact Report", "Invitation to Annual Gala"],
  },
  {
    icon: Globe,
    name: "Partner",
    amount: 1000,
    color: "border-border hover:border-primary",
    impact: "Co-funds an entire Peacebuilding Workshop in a conflict-affected community.",
    perks: ["All Champion benefits", "Co-branding Opportunities", "Board Acknowledgement", "Custom Partnership Agreement"],
  },
];

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  amount: z.string().min(1, "Please enter an amount"),
  dedication: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Donate() {
  const [selectedTier, setSelectedTier] = useState<number | null>(1);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", amount: "100", dedication: "" },
  });

  function selectTier(idx: number, amount: number) {
    setSelectedTier(idx);
    form.setValue("amount", String(amount));
  }

  function onSubmit(_values: FormValues) {
    setSubmitted(true);
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, hsl(43 96% 50%) 0%, transparent 65%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
            Make a Difference
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Support Our Mission
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Your generosity directly funds leadership training, peacebuilding workshops, and youth empowerment programs. Every contribution matters.
          </motion.p>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">Why Give to KISLP?</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your donation is an investment in peace — one that pays dividends for generations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "100% Transparency", desc: "Every dollar is tracked and reported. Our annual financial statements are publicly available." },
              { title: "Proven Impact", desc: "500+ trained leaders in 30+ countries. Your contribution funds measurable, documented change." },
              { title: "Tax Deductible", desc: "KISLP is a registered non-profit organization. Donations may be tax-deductible in your jurisdiction." },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-muted/30 border border-border rounded-xl"
              >
                <CheckCircle className="text-secondary shrink-0 mt-0.5" size={22} />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Tiers */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">Giving Tiers</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the level of support that works for you. Every gift, in any amount, creates real change.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <motion.button
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => selectTier(i, tier.amount)}
                data-testid={`tier-${tier.name.toLowerCase()}`}
                className={`text-left rounded-2xl border-2 p-7 transition-all cursor-pointer w-full ${tier.color} ${selectedTier === i ? "border-secondary ring-2 ring-secondary/30 shadow-md" : ""} ${tier.featured ? "relative" : ""}`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <tier.icon className="text-primary" size={22} />
                </div>
                <div className="text-3xl font-serif font-bold text-primary mb-1">${tier.amount}</div>
                <div className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">{tier.name}</div>
                <p className="text-muted-foreground text-xs leading-relaxed mb-5">{tier.impact}</p>
                <ul className="space-y-2">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle size={12} className="text-secondary shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form + Bank Info */}
      <section className="py-24 bg-background">
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
                    Your generosity is deeply appreciated. Our team will be in touch within 24 hours to confirm your donation and impact.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="text-secondary" size={24} />
                    <h2 className="text-2xl font-serif font-bold text-primary">Make a Donation</h2>
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
                      <FormField control={form.control} name="amount" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Donation Amount (USD)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                              <Input type="number" min="1" className="pl-7" data-testid="input-amount" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="dedication" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dedication (Optional)</FormLabel>
                          <FormControl><Input placeholder="In memory of, or in honor of..." data-testid="input-dedication" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 text-base font-bold" data-testid="button-donate">
                        <Heart size={18} className="mr-2" />
                        Complete Donation
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Your information is secure and will never be shared. Donations are used exclusively for KISLP programs.
                      </p>
                    </form>
                  </Form>
                </>
              )}
            </motion.div>

            {/* Bank Transfer */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-8">
              <div className="bg-primary rounded-2xl p-10 text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="text-secondary" size={28} />
                  <h3 className="text-xl font-serif font-bold">Bank Transfer</h3>
                </div>
                <p className="text-primary-foreground/80 text-sm mb-6">
                  For larger donations or organizational transfers, please use the bank details below and email us your transfer confirmation.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Bank Name", value: "Equity Bank Kenya" },
                    { label: "Account Name", value: "Kussala Institute for Strategic Leadership" },
                    { label: "Account Number", value: "0123456789012" },
                    { label: "Branch Code", value: "031" },
                    { label: "Swift Code", value: "EQBLKENA" },
                    { label: "Reference", value: "DONATION-[Your Name]" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-start text-sm border-b border-primary-foreground/10 pb-3 last:border-0">
                      <span className="text-primary-foreground/60">{row.label}</span>
                      <span className="text-white font-semibold text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-8">
                <h3 className="font-serif font-bold text-primary text-lg mb-3">Other Ways to Give</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Mobile Money: M-Pesa — Paybill 123456, Account: KISLP",
                    "PayPal: donate@kislp.org",
                    "Cryptocurrency: Contact us for wallet addresses",
                    "Corporate matching: Contact partnerships@kislp.org",
                    "Bequests and legacy giving: estate@kislp.org",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-secondary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
