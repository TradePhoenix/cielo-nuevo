import CTASection from "../../../components/CTASection";

/**
 * Thin, guide-context wrapper around the site's existing CTASection —
 * reuses its exact markup/styling rather than re-implementing a CTA block,
 * with copy defaults that read naturally at the end of a guide.
 */
export default function GuideCTA({
  label = "Start Here",
  title = "You do not have to figure it out alone.",
  text = "Path To Mexico helps you turn a guide like this into an actual plan, with trusted local support along the way.",
  primaryText = "Build My Mexico Blueprint",
  primaryTo = "/my-mexico-blueprint",
  secondaryText = "Book A Mexico Fit Call",
  secondaryTo = "/mexico-fit-call",
}) {
  return (
    <CTASection
      label={label}
      title={title}
      text={text}
      primaryText={primaryText}
      primaryTo={primaryTo}
      secondaryText={secondaryText}
      secondaryTo={secondaryTo}
    />
  );
}
