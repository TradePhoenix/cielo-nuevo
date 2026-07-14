export default function WelcomePanel({ partner }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Partner Dashboard</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        Welcome back, {partner.name.split(" ")[0]}.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
        Here's where your clients, referrals, and messages stand today at {partner.company}.
      </p>
    </div>
  );
}
