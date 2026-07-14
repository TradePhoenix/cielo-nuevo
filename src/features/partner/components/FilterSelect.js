export default function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.15em] text-zinc-500">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border border-zinc-300 bg-white px-3 py-2.5 text-sm normal-case tracking-normal text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
