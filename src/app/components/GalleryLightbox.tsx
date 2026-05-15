"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GalleryLightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const image = index !== null ? images[index] : null;

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onClose, onChange]);

  return (
    <AnimatePresence>
      {image && (
        <>
          <motion.div
            key="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="lb-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/60 via-violet-400/40 to-transparent mb-2" />

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden glow-border neon-ring">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 rounded-full p-1.5 bg-black/50 text-white/70 hover:text-white transition"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => onChange((index! - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/50 text-white/70 hover:text-white transition"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onChange((index! + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/50 text-white/70 hover:text-white transition"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between px-1">
                <p className="text-xs text-white/50">{image.alt}</p>
                {images.length > 1 && (
                  <p className="text-xs text-white/30">{index! + 1} / {images.length}</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
