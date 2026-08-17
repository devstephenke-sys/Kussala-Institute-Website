import React, { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";
import { fetchImpactBySlug, formatImageUrl } from "../services/api";

export default function ImpactDetail() {
  const [, params] = useRoute("/impact/:slug");
  const slug = params?.slug || "";

  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchImpactBySlug(slug)
      .then((data) => {
        if (data) {
          setStory(data);
          document.title = `${data.title} — Kussala Impact`;
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen p-20 text-center text-muted-foreground">Loading impact story...</div>;
  }

  if (!story) {
    return (
      <div className="min-h-screen p-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif text-foreground">Impact Story Not Found</h2>
        <Link href="/impact" className="inline-flex items-center gap-2 text-secondary font-bold text-sm">
          <ArrowLeft size={16} /> Back to Impact Overview
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link href="/impact" className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary font-medium text-sm transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Regional Impact
        </Link>

        <header className="space-y-4 mb-8">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest">{story.impact_category || "Field Impact"}</span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">{story.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-semibold">
            {story.location && (
              <span className="flex items-center gap-1 text-secondary"><MapPin size={14} /> {story.location}</span>
            )}
            {story.beneficiary_info && (
              <span className="flex items-center gap-1"><Users size={14} /> {story.beneficiary_info}</span>
            )}
          </div>
        </header>

        {story.featured_image && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-lg max-h-[450px]">
            <img src={formatImageUrl(story.featured_image)} alt={story.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: story.content }} />
      </div>
    </article>
  );
}
