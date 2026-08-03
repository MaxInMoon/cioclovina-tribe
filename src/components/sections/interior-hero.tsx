import Image from "next/image";

type InteriorHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt?: string;
};

export function InteriorHero({ eyebrow, title, intro, image, imageAlt = "" }: InteriorHeroProps) {
  return (
    <section className="relative flex min-h-[68svh] items-end overflow-hidden bg-forest text-white">
      <Image alt={imageAlt} className="object-cover" fill priority sizes="100vw" src={image} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,32,25,.32),rgba(13,32,25,.86))]" />
      <div className="site-container relative z-10 pt-40 pb-20 md:pt-48 md:pb-24">
        <p className="eyebrow text-white/70">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.04] font-semibold text-balance md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{intro}</p>
      </div>
    </section>
  );
}
