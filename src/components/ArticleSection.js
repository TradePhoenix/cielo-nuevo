import { motion } from "framer-motion";

export default function SectionHeader({
  label,
  title,
  text,
  light = false,
  center = false,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`${center ? "mx-auto text-center" : ""} max-w-6xl ${className}`}
    >
      {label && (
        <p
          className={`mb-6 text-xs uppercase tracking-[0.35em] ${
            light ? "text-white/40" : "text-zinc-500"
          }`}
        >
          {label}
        </p>
      )}

      {title && (
        <h2
          className={`max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white" : "text-zinc-950"}`}
        >
          {title}
        </h2>
      )}

      {text && (
        <p
          className={`mt-8 max-w-3xl text-lg leading-relaxed sm:text-xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/65" : "text-zinc-600"}`}
        >
          {text}
        </p>
      )}
    </motion.div>
  );
}