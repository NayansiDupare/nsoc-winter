import { FadeIn } from "@/components/motion/fade-in";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { AuroraBg } from "@/components/winter/aurora-bg";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <SectionHeading
        id="contact-title"
        eyebrow="Contact"
        title="Get in touch."
        description="Questions about contributing, bringing a project, or sponsoring the season? Write to the NSoC team."
      />
      <FadeIn className="frost relative mt-12 overflow-hidden rounded-3xl p-6 md:p-10">
        <AuroraBg className="opacity-30" />
        <div className="relative">
          <ContactForm />
        </div>
      </FadeIn>
    </section>
  );
}
