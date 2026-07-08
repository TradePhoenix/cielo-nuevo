import Button from "./Button";

export default function PageHero({
  label,
  title,
  text,
  primaryText,
  primaryTo,
  primaryHref,
  secondaryText,
  secondaryTo,
  secondaryHref,
  dark = true,
}) {
  return (
    <section
      className={`px-6 py-28 md:px-20 md:py-36 ${
        dark ? "bg-[#0b0b0a] text-white" : "bg-[#f6f1e8] text-zinc-950"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        {label && (
          <p
            className={`mb-6 text-xs uppercase tracking-[0.35em] ${
              dark ? "text-white/40" : "text-zinc-500"
            }`}
          >
            {label}
          </p>
        )}

        {title && (
          <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-8xl">
            {title}
          </h1>
        )}

        {text && (
          <p
            className={`mt-8 max-w-3xl text-lg leading-relaxed md:text-xl ${
              dark ? "text-white/65" : "text-zinc-600"
            }`}
          >
            {text}
          </p>
        )}

        {(primaryText || secondaryText) && (
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {primaryText && (
              <Button
                to={primaryTo}
                href={primaryHref}
                variant={dark ? "light" : "dark"}
              >
                {primaryText}
              </Button>
            )}

            {secondaryText && (
              <Button
                to={secondaryTo}
                href={secondaryHref}
                variant={dark ? "outlineLight" : "outlineDark"}
              >
                {secondaryText}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}