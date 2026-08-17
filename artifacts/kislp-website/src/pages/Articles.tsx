import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, BookOpen, Tag } from "lucide-react";
import { fetchPublishedArticles, formatImageUrl } from "../services/api";

const staticFallbackArticles = [
  {
    id: "static-1",
    title: "Nurturing Ethical Leadership in Post-Conflict Civil Service",
    slug: "nurturing-ethical-leadership-civil-service",
    excerpt: "How systemic integrity and ethical public financial management form the bedrock of institutional stability in South Sudan and Eastern DRC.",
    featured_image: "/gallery/bishop-leaders-group.jpeg",
    author: { full_name: "Kussala Research Team" },
    published_at: "2026-05-10T10:00:00Z",
    tags: "Leadership, Civil Service",
  },
  {
    id: "static-2",
    title: "Grassroots Mediation: The Power of Community Dialogue in North Kivu",
    slug: "grassroots-mediation-community-dialogue-north-kivu",
    excerpt: "A deep dive into KUI's cross-border mediation frameworks supporting local peace committees across fragile border zones.",
    featured_image: "/gallery/peace-conference-nairobi.jpg",
    author: { full_name: "Peacebuilding Directorate" },
    published_at: "2026-05-01T10:00:00Z",
    tags: "Mediation, DRC",
  },
];

export default function Articles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Articles & Publications — Kussala Institute";
    fetchPublishedArticles(1, search)
      .then((res) => {
        if (res && res.items && res.items.length > 0) {
          setArticles(res.items);
        } else {
          setArticles(staticFallbackArticles);
        }
      })
      .catch(() => setArticles(staticFallbackArticles))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-20 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
              <BookOpen size={14} /> Institutional Publications
            </div>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight">
              Articles & Research Papers
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Explore insightful research, policy analysis, and thought leadership from Kussala Institute scholars and peace practitioners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-10">
        <div className="bg-card p-4 rounded-xl border border-border shadow-md flex items-center gap-3">
          <Search className="text-muted-foreground shrink-0" size={20} />
          <input
            type="text"
            placeholder="Search articles by title, keyword, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="p-16 text-center text-muted-foreground">Loading publications...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, idx) => (
              <motion.article
                key={article.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {article.featured_image && (
                  <div className="h-56 overflow-hidden relative bg-muted">
                    <img
                      src={formatImageUrl(article.featured_image)}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {article.tags && (
                      <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                        {article.tags.split(",")[0]}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5">
                        <User size={13} className="text-secondary" />
                        {article.author?.full_name || "KUI Scholar"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-secondary" />
                        {new Date(article.published_at || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>

                    <h2 className="font-serif font-bold text-2xl text-foreground group-hover:text-secondary transition-colors leading-snug">
                      <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-secondary font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read Full Article <ArrowRight size={16} />
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
