/**
 * @param {number} minutes
 */
export default function ReadingTime({ minutes }) {
  if (!minutes) return null;

  return <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{minutes} Min Read</p>;
}
