import { motion } from "framer-motion";

/**
 * Cinematic guide hero. With a heroImage, renders it full-bleed under a
 * dark gradient (the same visual language as the homepage/Blueprint
 * heroes); without one, falls back to the flat dark header ArticleLayout
 * already uses, so guides that don't have a photo yet still look finished.
 */
export default function Hero({ eyebrow, title, description, heroImage }) {
  return (
    <header className="relative overflow-hidden bg-[#080807] px-6 pb-20 pt-36 text-white md:px-20 md:pb-28 md:pt-44">
      {heroImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="presentation"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-[#080807]/70 to-[#080807]/20" />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative mx-auto max-w-5xl"
      >
        {eyebrow && (
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{eyebrow}</p>
        )}

        {title && (
          <h1 className="text-5xl font-light leading-[0.98] tracking-[-0.06em] md:text-8xl">
            {title}
          </h1>
        )}

        {description && (
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/60">{description}</p>
        )}
      </motion.div>
    </header>
  );
}
