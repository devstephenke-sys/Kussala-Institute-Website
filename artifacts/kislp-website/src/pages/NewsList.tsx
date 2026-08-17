import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import { fetchPublishedNews } from "../services/api";

const staticFallbackNews = [
  {
    id: "news-static-1",
    title: "Kussala Institute Launches Inaugural Regional Peace Summit 2026",
    slug: "kui-launches-regional-peace-summit-2026",
    excerpt: "Delegates from across East and Central Africa gather in Nairobi for high-level leadership diplomacy discussions.",
    featured_image: "/gallery/africa-women-summit.jpg",
    published_at: "2026-05-12T10:00:00Z",
    category: "Announcement",
  },
];

export default function NewsList() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "News & Press Releases — Kussala Institute";
    fetchPublishedNews()
      .then((res) => {
        if (res && res.items && res.items.length > 0) {
          setNewsItems(res.items);
        } else {
          setNewsItems(staticFallbackNews);
        }
      })
      .catch(() => setNewsItems(staticFallbackNews))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-primary text-primary-foreground py-16 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
              <Newspaper size={14} /> Institutional Media & Press
            </div>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight">News & Press Releases</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Stay informed about Kussala Institute summit announcements, institutional milestones, and regional peace initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="p-16 text-center text-muted-foreground">Loading press releases...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, idx) => (
              <motion.article
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {item.featured_image && (
                  <div className="h-48 overflow-hidden bg-muted">
                    <img src={item.featured_image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">{item.category || "Press Release"}</span>
                    <h2 className="font-serif font-bold text-xl text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                      <Link href={`/news/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{item.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(item.published_at || Date.now()).toLocaleDateString()}
                    </span>
                    <Link href={`/news/${item.slug}`} className="text-secondary font-bold text-xs flex items-center gap-1">
                      Read News <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
