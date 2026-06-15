import { Link } from "react-router-dom";

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f4f0e8] px-6 py-24 text-zinc-950 md:px-20">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          ← Back To Path To Mexico
        </Link>

        <h1 className="mt-12 text-5xl font-light tracking-[-0.05em] md:text-7xl">
          Privacy Policy
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-600">
          <p>
            Path To Mexico respects your privacy. Information submitted through this website may be used to respond to inquiries, provide relocation guidance, share requested resources, and improve our services.
          </p>

          <p>
            We may collect your name, email address, phone number, current location, relocation timeline, and details you choose to share through forms or direct communication.
          </p>

          <p>
            We do not sell personal information. Information may be shared only when necessary with trusted independent professionals if you request introductions or support.
          </p>

          <p>
            This website may use analytics and tracking tools to understand visitor behavior and improve the site experience.
          </p>

          <p>
            By using this website, you agree to this privacy policy. For questions, contact Path To Mexico directly.
          </p>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicyPage;
