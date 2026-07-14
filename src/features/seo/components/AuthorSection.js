/**
 * @param {import('../types/author').AuthorRecord} author
 */
export default function AuthorSection({ author }) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-4 border-t border-zinc-300 pt-8">
      {author.avatar ? (
        <img
          src={author.avatar}
          alt={author.name}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-sm text-white">
          {author.name.charAt(0)}
        </div>
      )}

      <div>
        <p className="font-medium text-zinc-950">{author.name}</p>
        <p className="text-sm text-zinc-500">{author.title}</p>
      </div>
    </div>
  );
}
