/**
 * @param {import('../types/guide').ComparisonTableData} data
 */
export default function ComparisonTable({ columns = [], rows = [] }) {
  if (!columns.length || !rows.length) return null;

  return (
    <div className="overflow-x-auto border border-zinc-300">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-300 bg-white/60">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="p-4 text-xs uppercase tracking-[0.2em] text-zinc-500"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row[0] || rowIndex} className="border-b border-zinc-300 last:border-b-0 odd:bg-[#f4f0e8]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-4 text-zinc-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
