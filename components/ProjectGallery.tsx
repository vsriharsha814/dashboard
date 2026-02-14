"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** Paths under a "mobile" subfolder get a narrower initial width until we measure. */
function isMobileScreenshot(path: string): boolean {
  return path.includes("/mobile/");
}

const REEL_HEIGHT = 360;
const DEFAULT_MOBILE_WIDTH = Math.round((9 / 16) * REEL_HEIGHT);
const DEFAULT_DESKTOP_WIDTH = Math.round((16 / 9) * REEL_HEIGHT);

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const reelRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback(
    (src: string, e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      if (naturalHeight > 0) {
        const w = Math.round(REEL_HEIGHT * (naturalWidth / naturalHeight));
        setWidths((prev) => (prev[src] === w ? prev : { ...prev, [src]: w }));
      }
    },
    []
  );

  if (images.length === 0) return null;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };
  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  // Arrow keys: lightbox prev/next when open; reel scroll when reel is focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (selectedIndex !== null) {
          e.preventDefault();
          setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        } else if (reelRef.current) {
          e.preventDefault();
          reelRef.current.scrollBy({ left: -320, behavior: "smooth" });
        }
      } else if (e.key === "ArrowRight") {
        if (selectedIndex !== null) {
          e.preventDefault();
          setSelectedIndex((selectedIndex + 1) % images.length);
        } else if (reelRef.current) {
          e.preventDefault();
          reelRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      } else if (e.key === "Escape" && selectedIndex !== null) {
        e.preventDefault();
        setSelectedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Screenshots</h2>
        <div
          ref={reelRef}
          role="region"
          aria-label="Screenshot reel"
          tabIndex={0}
          className="overflow-x-auto overflow-y-hidden pb-3 -mx-1 px-1 outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset rounded-lg"
        >
          <div className="flex gap-4 items-center min-w-max" style={{ minHeight: REEL_HEIGHT }}>
            {images.map((img, index) => {
              const isMobile = isMobileScreenshot(img);
              const defaultWidth = isMobile ? DEFAULT_MOBILE_WIDTH : DEFAULT_DESKTOP_WIDTH;
              const width = widths[img] ?? defaultWidth;
              return (
                <button
                  key={`${index}-${img}`}
                  type="button"
                  data-index={index}
                  onClick={(e) => {
                    const i = Number((e.currentTarget as HTMLButtonElement).getAttribute("data-index"));
                    if (!Number.isNaN(i) && i >= 0 && i < images.length) openLightbox(i);
                  }}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors group bg-muted/30"
                  style={{ width, height: REEL_HEIGHT }}
                >
                  <Image
                    src={img}
                    alt={`${projectTitle} screenshot ${index + 1}`}
                    fill
                    className="object-contain group-hover:opacity-95 transition-opacity"
                    sizes={`${width}px`}
                    onLoad={(e) => handleImageLoad(img, e)}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Scroll or use arrow keys to move · click to expand · Esc to close
        </p>
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-card/90 hover:bg-card text-foreground transition-colors"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 z-10 p-2 rounded-lg bg-card/90 hover:bg-card text-foreground transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 z-10 p-2 rounded-lg bg-card/90 hover:bg-card text-foreground transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full z-0 pointer-events-none"
            aria-hidden
          >
            <Image
              src={images[selectedIndex]}
              alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-lg bg-card/90 text-sm text-muted-foreground pointer-events-none">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
