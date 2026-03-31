import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <ScrollReveal as="div" className={`section-heading section-heading-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </ScrollReveal>
  );
}
