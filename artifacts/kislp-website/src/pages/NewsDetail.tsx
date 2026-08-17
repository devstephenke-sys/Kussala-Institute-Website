import React, { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar } from "lucide-react";
import { fetchNewsBySlug, formatImageUrl } from "../services/api";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug || "";

  const [newsItem, setNewsItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchNewsBySlug(slug)
      .then((data) => {
        if (data) {
          setNewsItem(data);
          document.title = `${data.title} — Kussala News`;
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen p-20 text-center text-muted-foreground">Loading news item...</div>;
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen p-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif text-foreground">News Item Not Found</h2>
        <Link href="/news" className="inline-flex items-center gap-2 text-secondary font-bold text-sm">
          <ArrowLeft size={16} /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link href="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary font-medium text-sm transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Press Releases
        </Link>

        <header className="space-y-4 mb-8">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest">{newsItem.category || "Press Release"}</span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">{newsItem.title}</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={14} />
            {new Date(newsItem.published_at || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        </header>

        {newsItem.featured_image && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-lg max-h-[450px]">
            <img src={formatImageUrl(newsItem.featured_image)} alt={newsItem.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
      </div>
    </article>
  );
}
