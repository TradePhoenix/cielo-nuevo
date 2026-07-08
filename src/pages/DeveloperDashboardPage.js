import React from "react";

export default function DeveloperDashboardPage() {
  const sections = [
    {
      title: "Website",
      links: [
        ["🏠 Home", "/"],
        ["📖 Guides", "/guides"],
        ["📞 Mexico Fit Call", "/mexico-fit-call"],
        ["📄 Free Guide", "/free-guide"],
        ["💼 Work With Path To Mexico", "/work-with-path-to-mexico"],
      ],
    },
    {
      title: "Guide Articles",
      links: [
        ["Cost of Living", "/guides/cost-of-living-playa-del-carmen"],
        ["Temporary Residency", "/guides/temporary-residency-mexico"],
        ["Healthcare", "/guides/healthcare-in-mexico-for-canadians"],
        ["Best Areas", "/guides/best-areas-to-live-in-playa-del-carmen"],
        ["Relocation Checklist", "/guides/mexico-relocation-checklist"],
        ["Remote Workers", "/guides/remote-workers-moving-to-mexico"],
        ["Retiring", "/guides/retiring-in-mexico"],
        ["Moving to Tulum", "/guides/moving-to-tulum"],
        ["Moving to Playa", "/guides/moving-to-playa-del-carmen"],
      ],
    },
    {
      title: "Legal",
      links: [
        ["Privacy Policy", "/privacy-policy"],
        ["Terms of Service", "/terms-of-service"],
      ],
    },
    {
      title: "External",
      links: [
        ["🌎 Live Website", "https://pathtomexico.com"],
        ["⚛️ Localhost", "http://localhost:3000"],
        ["🐙 GitHub", "https://github.com/TradePhoenix/cielo-nuevo-react"],
        ["▲ Vercel", "https://vercel.com/dashboard"],
        ["🎨 Canva", "https://canva.com"],
        ["📅 Calendly", "https://calendly.com"],
        ["📧 Gmail", "https://mail.google.com"],
        ["💬 WhatsApp", "https://web.whatsapp.com"],
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f1e8] px-6 py-20 text-zinc-950 md:px-20">
      <div className="mx-auto max-w-7xl">

        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-zinc-500">
          Path To Mexico
        </p>

        <h1 className="text-5xl font-light tracking-[-0.05em] md:text-8xl">
          Developer Dashboard
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-zinc-600">
          Your private control center for building, testing, publishing,
          and managing Path To Mexico.
        </p>

        <div className="mt-20 grid gap-10">

          {sections.map((section) => (
            <section key={section.title}>

              <h2 className="mb-6 text-3xl font-light">
                {section.title}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {section.links.map(([title, url]) => (
                  <a
                    key={title}
                    href={url}
                    target={url.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="border border-zinc-300 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-950 hover:shadow-xl"
                  >
                    <div className="text-lg font-medium">
                      {title}
                    </div>

                    <div className="mt-3 text-sm text-zinc-500 break-all">
                      {url}
                    </div>
                  </a>
                ))}

              </div>

            </section>
          ))}

        </div>

        <div className="mt-24 rounded-xl border border-zinc-300 bg-white p-10">

          <h2 className="mb-5 text-3xl font-light">
            🚀 CEO Mode
          </h2>

          <p className="max-w-3xl text-lg leading-relaxed text-zinc-600">
            Future versions of this dashboard will include website analytics,
            Google Search Console, SEO tracking, article publishing,
            connector management, lead tracking, revenue metrics,
            deployment status, and project management.
          </p>

        </div>

      </div>
    </main>
  );
}