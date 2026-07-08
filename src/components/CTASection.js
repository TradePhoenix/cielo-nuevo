import Button from "./Button";

export default function CTASection({
  label = "Start Here",
  title,
  text,
  primaryText = "Book A Mexico Fit Call",
  primaryTo = "/mexico-fit-call",
  secondaryText,
  secondaryTo,
}) {
  return (
    <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
      <div className="mx-auto max-w-4xl">
        {label && (
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            {label}
          </p>
        )}

        {title && (
          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {title}
          </h2>
        )}

        {text && (
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            {text}
          </p>
        )}

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button to={primaryTo} variant="light">
            {primaryText}
          </Button>

          {secondaryText && secondaryTo && (
            <Button to={secondaryTo} variant="outlineLight">
              {secondaryText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}