import { Component } from "react";

// Top-level safety net. Error boundaries must be class components — there is
// no hook equivalent. Without this, any uncaught render error anywhere in
// the tree unmounts the whole app and leaves a blank white screen with no
// way back in.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f0e8] px-6 py-24 text-center text-zinc-950 md:px-20">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Path To Mexico</p>
          <h1 className="mt-6 max-w-2xl text-5xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            Something went wrong.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600">
            This page hit an unexpected error. Reloading usually fixes it.
          </p>
          <a
            href="/"
            className="mt-10 inline-flex bg-zinc-950 px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Return Home
          </a>
        </main>
      );
    }
    return this.props.children;
  }
}
