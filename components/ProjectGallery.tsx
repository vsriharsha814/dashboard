"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Screenshots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <button
              key={img}
              onClick={() => openLightbox(index)}
              className="relative aspect-video rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors group"
            >
              <Image
                src={img}
                alt={`${projectTitle} screenshot ${index + 1}`}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-lg bg-card/90 hover:bg-card text-foreground transition-colors"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 p-2 rounded-lg bg-card/90 hover:bg-card text-foreground transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 p-2 rounded-lg bg-card/90 hover:bg-card text-foreground transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-card/90 text-sm text-muted-foreground">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
