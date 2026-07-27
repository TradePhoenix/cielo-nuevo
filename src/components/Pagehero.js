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
        dark ? "bg-[#14211C] text-white" : "bg-[#F3EEE4] text-[#14211C]"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="ptm-rhythm-line mb-7" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        {label && (
          <p
            className={`mb-5 text-[11px] font-bold uppercase tracking-[0.18em] ${
              dark ? "text-white/55" : "text-[#E36F4F]"
            }`}
          >
            {label}
          </p>
        )}

        {title && (
          <h1 className="max-w-5xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] md:text-7xl lg:text-8xl">
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
