/**
 * @param {{pros: string[], cons: string[]}} value
 */
export default function ProsAndCons({ pros = [], cons = [] }) {
  if (!pros.length && !cons.length) return null;

  return (
    <div className="grid gap-px overflow-hidden border border-zinc-300 bg-zinc-300 sm:grid-cols-2">
      <div className="bg-white p-6 md:p-8">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-zinc-500">Strengths</p>
        <ul className="space-y-3 leading-relaxed text-zinc-700">
          {pros.map((item) => (
            <li key={item}>+ {item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-[#f4f0e8] p-6 md:p-8">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-zinc-500">Tradeoffs</p>
        <ul className="space-y-3 leading-relaxed text-zinc-700">
          {cons.map((item) => (
            <li key={item}>− {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
