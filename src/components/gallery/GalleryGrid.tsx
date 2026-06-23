import Image from "next/image";
import type { GalleryImage } from "@/types/content";

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {images.map((img) => (
        <article
          key={img.id}
          className="card-minimal mb-6 break-inside-avoid overflow-hidden p-0"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="p-5">
            <span className="text-xs font-medium uppercase tracking-wider text-accent">
              {img.location}
            </span>
            <h3 className="mt-1 font-semibold text-heading">{img.caption}</h3>
            <p className="mt-2 text-xs text-ink/50">© {img.credit}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
