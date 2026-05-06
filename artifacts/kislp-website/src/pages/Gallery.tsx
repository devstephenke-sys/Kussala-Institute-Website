import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  {
    src: "/gallery/bishop-flowers-community.jpeg",
    title: "Bishop Welcomed by the Community",
    location: "South Sudan — Diocese of Tombura-Yambio",
    category: "Founder",
  },
  {
    src: "/gallery/bishop-portrait-robes.jpeg",
    title: "Bishop Kussala — Founder of KUI",
    location: "Diocese of Tombura-Yambio",
    category: "Founder",
  },
  {
    src: "/gallery/bishop-community-walk.jpeg",
    title: "Walking With the People",
    location: "South Sudan",
    category: "Founder",
  },
  {
    src: "/gallery/bishop-community-wave.jpeg",
    title: "Celebrating With the Faithful",
    location: "Diocese of Tombura-Yambio",
    category: "Founder",
  },
  {
    src: "/gallery/bishop-children-embrace.jpeg",
    title: "With the Children of South Sudan",
    location: "South Sudan",
    category: "Community",
  },
  {
    src: "/gallery/bishop-children-village.jpeg",
    title: "Joyful with Village Children",
    location: "South Sudan",
    category: "Community",
  },
  {
    src: "/gallery/bishop-community-listening.jpeg",
    title: "Listening to the Community",
    location: "Village Dialogue — South Sudan",
    category: "Community",
  },
  {
    src: "/gallery/bishop-outdoor-gathering.jpeg",
    title: "Outdoor Community Gathering",
    location: "South Sudan",
    category: "Community",
  },
  {
    src: "/gallery/bishop-harvest-field.jpeg",
    title: "Blessing the Harvest",
    location: "Agricultural Visit — South Sudan",
    category: "Community",
  },
  {
    src: "/gallery/bishop-crossing-river.jpeg",
    title: "In Service — Crossing to the People",
    location: "South Sudan",
    category: "Community",
  },
  {
    src: "/gallery/bishop-speaking-mic.jpeg",
    title: "Bishop Addresses the Community",
    location: "South Sudan",
    category: "Leadership",
  },
  {
    src: "/gallery/bishop-leaders-group.jpeg",
    title: "Meeting With Local Leaders",
    location: "Diocese of Tombura-Yambio",
    category: "Leadership",
  },
  {
    src: "/gallery/bishop-military-dialogue.jpeg",
    title: "Dialogue with Military Command",
    location: "Peace Engagement — South Sudan",
    category: "Peacebuilding",
  },
  {
    src: "/gallery/bishop-military-group.jpeg",
    title: "Peace Engagement with Security Forces",
    location: "South Sudan",
    category: "Peacebuilding",
  },
];

const categories = ["All", "Founder", "Community", "Leadership", "Peacebuilding"];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  const goTo = useCallback(
    (idx: number, direction: number) => {
      setDir(direction);
      setCurrent((idx + filtered.length) % filtered.length);
    },
    [filtered.length]
  );

  const prev = () => goTo(current - 1, -1);
  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  useEffect(() => {
    setCurrent(0);
  }, [activeCategory]);

  useEffect(() => {
    const id = setInterval(() => next(), 5000);
    return () => clearInterval(id);
  }, [next]);

  const item = filtered[current] ?? filtered[0];

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/bishop-community-wave.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-primary/78" />
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-secondary uppercase tracking-widest text-sm font-semibold mb-3"
          >
            Our Work in Action
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-primary-foreground/80 text-lg max-w-xl mx-auto"
          >
            Moments of leadership, dialogue, and transformation — from community walks to peace negotiations across South Sudan and Africa.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-md bg-background/95">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Slider */}
      {item && (
        <section className="bg-[#0a0f1e] py-0">
          {/* Main slide */}
          <div className="relative w-full" style={{ height: "clamp(380px, 60vw, 680px)" }}>
            <AnimatePresence custom={dir} initial={false}>
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.title}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.src + "-caption"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="inline-block bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                    {item.category}
                  </span>
                  <p className="text-white font-serif font-bold text-xl md:text-3xl leading-tight drop-shadow">
                    {item.title}
                  </p>
                  <p className="text-white/65 text-sm mt-1">{item.location}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrow buttons */}
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 border border-white/20 text-white rounded-full p-3 md:p-4 transition-all backdrop-blur-sm z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 border border-white/20 text-white rounded-full p-3 md:p-4 transition-all backdrop-blur-sm z-10"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute top-5 right-6 bg-black/40 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              {current + 1} / {filtered.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="bg-[#0a0f1e] px-4 py-5 overflow-x-auto">
            <div className="flex gap-3 justify-center min-w-max mx-auto">
              {filtered.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => goTo(idx, idx > current ? 1 : -1)}
                  className={`relative shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                    idx === current
                      ? "ring-2 ring-secondary opacity-100 scale-105"
                      : "opacity-45 hover:opacity-70"
                  }`}
                  style={{ width: 90, height: 60 }}
                  aria-label={img.title}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 pb-6">
            {filtered.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx, idx > current ? 1 : -1)}
                className={`rounded-full transition-all duration-300 ${
                  idx === current ? "bg-secondary w-6 h-2" : "bg-white/30 w-2 h-2 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
