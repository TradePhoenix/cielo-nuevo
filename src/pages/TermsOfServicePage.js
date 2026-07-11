import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#f4f0e8] px-6 py-24 text-zinc-950 md:px-20">
      <SEO
        title="Terms of Service"
        description="Path To Mexico's terms of service."
        path="/terms-of-service"
      />
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          ← Back To Path To Mexico
        </Link>

        <h1 className="mt-12 text-5xl font-light tracking-[-0.05em] md:text-7xl">
          Terms Of Service
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-600">
          <p>
            Path To Mexico provides relocation guidance, local insight, educational content, and introductions to independent professionals.
          </p>

          <p>
            Path To Mexico is not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Any legal, tax, immigration, financial, or real estate services are provided by independent qualified professionals.
          </p>

          <p>
            Information on this website is for general educational purposes only and should not be treated as professional advice.
          </p>

          <p>
            Users are responsible for verifying current laws, residency requirements, costs, contracts, and professional qualifications before making decisions.
          </p>

          <p>
            By using this website or submitting an inquiry, you agree that Path To Mexico is not liable for decisions made based on website content or third-party introductions.
          </p>
        </div>
      </div>
    </main>
  );
}

export default TermsOfServicePage;
