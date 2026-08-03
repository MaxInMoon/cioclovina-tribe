import { InteriorHero } from "@/components/sections/interior-hero";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: string;
  statusNotice: string;
  sections: LegalSection[];
};

export function LegalDocument({
  eyebrow,
  title,
  intro,
  statusNotice,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <InteriorHero
        eyebrow={eyebrow}
        image="/images/hero/forest-arrival-road.webp"
        intro={intro}
        title={title}
      />
      <section className="section bg-cream">
        <div className="site-container max-w-4xl">
          <p className="rounded-2xl border border-rust/25 bg-rust/5 p-6 text-sm leading-7 text-ink-muted">
            {statusNotice}
          </p>
          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-serif text-3xl font-semibold md:text-4xl">{section.title}</h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-ink-muted">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
