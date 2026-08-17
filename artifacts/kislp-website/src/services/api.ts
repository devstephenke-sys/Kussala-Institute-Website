const API_BASE = import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchPublishedArticles(page = 1, search = "", categorySlug = "") {
  try {
    const res = await fetch(`${API_BASE}/articles?page=${page}&search=${encodeURIComponent(search)}&category_slug=${encodeURIComponent(categorySlug)}`);
    if (!res.ok) throw new Error("Failed to fetch articles");
    return await res.json();
  } catch (err) {
    console.warn("API offline or error, using fallback data:", err);
    return null;
  }
}

export async function fetchArticleBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error("Article not found");
    return await res.json();
  } catch (err) {
    console.warn("API error fetching article slug:", err);
    return null;
  }
}

export async function fetchPublishedNews(page = 1, search = "") {
  try {
    const res = await fetch(`${API_BASE}/news?page=${page}&search=${encodeURIComponent(search)}`);
    if (!res.ok) throw new Error("Failed to fetch news");
    return await res.json();
  } catch (err) {
    console.warn("API error fetching news:", err);
    return null;
  }
}

export async function fetchNewsBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/news/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error("News item not found");
    return await res.json();
  } catch (err) {
    console.warn("API error fetching news slug:", err);
    return null;
  }
}

export async function fetchPublishedImpact(page = 1, category = "") {
  try {
    const res = await fetch(`${API_BASE}/impact?page=${page}&impact_category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error("Failed to fetch impact stories");
    return await res.json();
  } catch (err) {
    console.warn("API error fetching impact:", err);
    return null;
  }
}

export async function fetchImpactBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/impact/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error("Impact story not found");
    return await res.json();
  } catch (err) {
    console.warn("API error fetching impact slug:", err);
    return null;
  }
}
