import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, Send, CheckCircle, Handshake, BookOpen, DollarSign, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  { icon: MapPin, label: "Physical Address", value: "South Sudan\nPlot 4979, Block 246, Muyenga" },
  { icon: Mail, label: "Official Email", value: "info@kussalainstitute.org" },
];

const partnershipTypes = [
  {
    icon: BookOpen,
    title: "Technical Partnership",
    desc: "Sharing expertise in governance and conflict analysis with KUI's research and program teams.",
  },
  {
    icon: DollarSign,
    title: "Financial Investment",
    desc: "Supporting our 2026–2029 Flagship Projects with targeted contributions from the $3.1M SLPI-FS budget.",
  },
  {
    icon: Handshake,
    title: "Strategic Alliance",
    desc: "Co-hosting regional peace dialogues and policy forums across South Sudan, DRC, and East Africa.",
  },
];

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const subjectLabels: Record<string, string> = {
  technical: "Technical Partnership",
  financial: "Financial Investment",
  strategic: "Strategic Alliance",
  programs: "Program Inquiry",
  media: "Media & Press",
  research: "Research Collaboration",
  other: "Other",
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", organization: "", subject: "", message: "" },
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
          subject: subjectLabels[values.subject] ?? values.subject,
          message: values.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch {
      setSendError("Unable to send your message. Please try again or email us directly at info@kussalainstitute.org.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/gallery/reconciliation-village-rwanda.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-primary/82" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4"
          >
            Call to Partnership
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            We welcome formal inquiries from organizations interested in becoming part of the KUI ecosystem.
          </motion.p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3">How to Engage</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Partnership Opportunities</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether through expertise, investment, or strategic alignment — there is a place for your organization in the KUI mission.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {partnershipTypes.map((pt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-secondary hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-colors">
                  <pt.icon className="text-primary group-hover:text-secondary transition-colors" size={26} />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-3">{pt.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pt.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center bg-primary/5 border border-primary/10 rounded-2xl p-8"
          >
            <p className="text-primary font-serif text-lg italic mb-3">
              "Together, we can transform the leadership landscape of the African continent and build a future defined by stability, integrity, and shared prosperity."
            </p>
            <p className="text-secondary text-sm font-semibold uppercase tracking-wider">— KUI Founding Charter</p>
          </motion.blockquote>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">Get in Touch</h2>
                <div className="w-12 h-1 bg-secondary mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Our team is here to assist you. Reach out via any of the channels below and we will respond within two business days.
                </p>
              </motion.div>

              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">{item.label}</div>
                    <div className="text-muted-foreground text-sm whitespace-pre-line">{item.value}</div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-primary rounded-2xl p-8 text-primary-foreground relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
                <h3 className="font-serif font-bold text-lg mb-3">Grassroots Mobilization</h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">
                  We invite international donors, regional governments, academic institutions, and like-minded civil society organizations to join us in transforming the leadership landscape of the African continent.
                </p>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-card border border-border rounded-2xl p-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="text-primary" size={40} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Inquiry Received</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out to KUI. A member of our team will be in touch within two business days.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-serif font-bold text-primary mb-2">Send a Formal Inquiry</h2>
                  <div className="w-12 h-1 bg-secondary mb-8" />
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" data-testid="input-name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@organization.org" data-testid="input-email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="organization" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your organization or institution" data-testid="input-organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partnership Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-subject">
                                <SelectValue placeholder="Select a partnership type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="technical">Technical Partnership</SelectItem>
                              <SelectItem value="financial">Financial Investment</SelectItem>
                              <SelectItem value="strategic">Strategic Alliance</SelectItem>
                              <SelectItem value="programs">Program Inquiry</SelectItem>
                              <SelectItem value="media">Media & Press</SelectItem>
                              <SelectItem value="research">Research Collaboration</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe how your organization wishes to engage with KUI..."
                              className="min-h-[140px] resize-none"
                              data-testid="textarea-message"
                              {...field}
                            />
                          </FormControl>
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
                        className="w-full bg-primary text-white hover:bg-primary/90 py-6 text-base font-semibold disabled:opacity-70"
                        data-testid="button-submit"
                      >
                        {sending ? (
                          <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Submit Inquiry
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
