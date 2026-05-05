import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryItems = [
  {
    src: "/gallery/peace-conference-nairobi.jpg",
    title: "Global Peace Leadership Conference",
    location: "Nairobi, Kenya — 2024",
    category: "Conferences",
  },
  {
    src: "/gallery/peace-leadership-highlights.jpg",
    title: "Leadership Summit Highlights",
    location: "Africa — 2024",
    category: "Conferences",
  },
  {
    src: "/gallery/youth-leadership-workshop.jpg",
    title: "Youth Capacity Building Workshop",
    location: "African Union — CIEFFA",
    category: "Youth",
  },
  {
    src: "/gallery/youth-peace-programme.jpg",
    title: "Youth for Peace Programme",
    location: "UNESCO Intercultural Leadership",
    category: "Youth",
  },
  {
    src: "/gallery/women-leaders-africa.jpg",
    title: "African Women Leaders Network",
    location: "African Union",
    category: "Women",
  },
  {
    src: "/gallery/africa-women-summit.jpg",
    title: "Africa Women Summit",
    location: "Health & Empowerment Initiative",
    category: "Women",
  },
  {
    src: "/gallery/reconciliation-village-rwanda.jpg",
    title: "Reconciliation Village",
    location: "Bugesera, Rwanda",
    category: "Community",
  },
  {
    src: "/gallery/reconciliation-nyamata.jpg",
    title: "Community Reconciliation",
    location: "Nyamata, Rwanda",
    category: "Community",
  },
];

const categories = ["All", "Conferences", "Youth", "Women", "Community"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };
  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/peace-conference-nairobi.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-primary/75" />
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
            Moments of leadership, dialogue, and transformation from across Africa and beyond.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-10 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-md bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
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

      {/* Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.35 }}
                  className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer bg-card border border-border hover:shadow-xl transition-shadow"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <ZoomIn size={16} className="text-secondary" />
                      <span className="text-secondary text-xs font-semibold uppercase tracking-wider">{item.category}</span>
                    </div>
                    <p className="text-white font-semibold text-sm leading-tight">{item.title}</p>
                    <p className="text-white/70 text-xs mt-0.5">{item.location}</p>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.location}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No images in this category.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                className="w-full rounded-xl object-contain max-h-[75vh] shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-white font-semibold text-lg">{filtered[lightboxIndex].title}</p>
                <p className="text-white/60 text-sm">{filtered[lightboxIndex].location}</p>
              </div>

              <button
                onClick={closeLightbox}
                className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
