import { Link } from "react-router-dom";

export default function Button({ children, to, href, variant = "dark", className = "" }) {
  const base =
    "inline-flex items-center justify-center rounded-[4px] px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007C83] focus-visible:ring-offset-2";

  const styles = {
    dark: "bg-[#14211C] text-white shadow-[0_12px_28px_rgba(20,33,28,0.12)] hover:-translate-y-0.5 hover:bg-[#007C83]",
    light: "bg-[#FFFDF8] text-[#14211C] hover:-translate-y-0.5 hover:bg-[#F3BE54]",
    outlineDark:
      "border border-[#14211C] text-[#14211C] hover:bg-[#14211C] hover:text-white",
    outlineLight:
      "border border-white/35 text-white hover:border-white hover:bg-white hover:text-[#14211C]",
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
