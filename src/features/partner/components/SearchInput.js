export default function SearchInput({ value, onChange, placeholder = "Search" }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 sm:w-64"
    />
  );
}
