import Image from "next/image";

import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
};

type PhotoGalleryProps = {
  images: readonly GalleryImage[];
  className?: string;
};

export function PhotoGallery({ images, className }: PhotoGalleryProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[15rem] gap-3 sm:auto-rows-[18rem] md:grid-cols-2 lg:auto-rows-[20rem]",
        className,
      )}
    >
      {images.map((image, index) => (
        <figure
          className={cn(
            "group relative overflow-hidden rounded-3xl bg-sand",
            index === 0 && "row-span-2",
          )}
          key={image.src}
        >
          <Image
            alt={image.alt}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.025]"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            src={image.src}
          />
        </figure>
      ))}
    </div>
  );
}
