/**
 * @param {(string|{src: string, alt?: string})[]} images
 */
export default function ImageGallery({ images = [] }) {
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {images.map((image) => {
        const src = typeof image === "string" ? image : image.src;
        const alt = typeof image === "string" ? "" : image.alt || "";
        return (
          <img
            key={src}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        );
      })}
    </div>
  );
}
