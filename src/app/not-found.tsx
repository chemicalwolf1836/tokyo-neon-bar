import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 grid-scan" />

      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="h-5 w-5 text-white/60" />
          <span
            className="neon-text font-semibold tracking-wide text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NEON KISSA
          </span>
        </div>

        <div className="neon-line mx-auto mb-6" />

        <p
          className="neon-text text-7xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          404
        </p>

        <h1 className="text-xl font-semibold text-white mb-2">
          Lost in Shinjuku
        </h1>
        <p className="text-sm text-white/50 mb-8">
          This page wandered into the neon haze and didn&apos;t come back.
        </p>

        <Link
          href="/"
          className="neon-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm bg-cyan-500/10 border border-cyan-400/25 text-cyan-100 hover:bg-cyan-500/20 transition"
        >
          Back to the bar
        </Link>
      </div>
    </main>
  );
}
