import Button from "./Button";

export default function ServiceCard({
  title,
  price,
  text,
  items = [],
  cta,
  to,
  href,
}) {
  return (
    <div className="flex min-h-[520px] flex-col justify-between bg-[#f6f1e8] p-8 transition hover:bg-white">
      <div>
        {title && (
          <h3 className="mb-4 text-4xl font-light tracking-[-0.05em]">
            {title}
          </h3>
        )}

        {price && (
          <p className="mb-7 text-sm uppercase tracking-[0.25em] text-zinc-500">
            {price}
          </p>
        )}

        {text && (
          <p className="mb-8 leading-relaxed text-zinc-600">
            {text}
          </p>
        )}

        {items.length > 0 && (
          <div className="border-t border-zinc-300 pt-6">
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Best For
            </p>

            <ul className="space-y-3 text-zinc-700">
              {items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {cta && (
        <Button to={to} href={href} variant="outlineDark" className="mt-10">
          {cta}
        </Button>
      )}
    </div>
  );
}