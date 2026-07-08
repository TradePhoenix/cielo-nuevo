import { Link } from "react-router-dom";

export default function Button({ children, to, href, variant = "dark", className = "" }) {
  const base =
    "inline-block px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] transition duration-300";

  const styles = {
    dark: "bg-zinc-950 text-white hover:bg-[#d8a15f] hover:text-zinc-950",
    light: "bg-white text-zinc-950 hover:bg-[#d8a15f]",
    outlineDark:
      "border border-zinc-950 text-zinc-950 hover:bg-zinc-950 hover:text-white",
    outlineLight:
      "border border-white/30 text-white hover:bg-white hover:text-zinc-950",
  };

  const classes = `${base} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  );
}