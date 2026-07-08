import { Link } from "react-router-dom";

export default function GuideCard({
  category,
  title,
  description,
  href,
}) {
  return (
    <Link
      to={href}
      className="flex min-h-[340px] flex-col justify-between border border-zinc-200 bg-[#f6f1e8] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
    >
      <div>
        <p className="mb-8 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
          {category}
        </p>

        <h3 className="mb-6 text-3xl font-light leading-tight tracking-[-0.04em]">
          {title}
        </h3>

        <p className="leading-relaxed text-zinc-600">
          {description}
        </p>
      </div>

      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-950">
        Read Guide →
      </p>
    </Link>
  );
}