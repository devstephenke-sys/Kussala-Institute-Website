import React, { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { fetchArticleBySlug } from "../services/api";

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:slug");
  const slug = params?.slug || "";

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchArticleBySlug(slug)
      .then((data) => {
        if (data) {
          setArticle(data);
          document.title = `${data.title} — Kussala Institute`;
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen p-20 text-center text-muted-foreground">Loading article content...</div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen p-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif text-foreground">Article Not Found</h2>
        <p className="text-muted-foreground text-sm">The article you requested could not be loaded.</p>
        <Link href="/articles" className="inline-flex items-center gap-2 text-secondary font-bold text-sm">
          <ArrowLeft size={16} /> Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link href="/articles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary font-medium text-sm transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Publications
        </Link>

        <header className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5 text-secondary">
              <User size={14} />
              {article.author?.full_name || "KUI Scholar"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(article.published_at || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed italic font-serif border-l-4 border-secondary pl-4 py-1">
              {article.excerpt}
            </p>
          )}
        </header>

        {article.featured_image && (
          <div className="rounded-2xl overflow-hidden mb-12 shadow-lg max-h-[450px]">
            <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags && (
          <div className="mt-12 pt-6 border-t border-border flex items-center gap-2 text-xs">
            <Tag size={14} className="text-secondary" />
            <span className="font-semibold text-muted-foreground uppercase tracking-wider">Tags:</span>
            <div className="flex gap-2">
              {article.tags.split(",").map((t: string, i: number) => (
                <span key={i} className="bg-muted px-3 py-1 rounded-full text-foreground font-medium">
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
