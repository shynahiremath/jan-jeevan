import { Link } from "react-router-dom";
import { Leaf, HeartPulse, Wallet } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-mesh relative mx-4 mt-4 overflow-hidden rounded-[2rem] px-6 py-16 sm:mx-6 sm:px-10 sm:py-20 lg:mx-auto lg:max-w-6xl">
      <div className="orb left-[-5%] top-[10%] h-56 w-56 bg-[#b8f34a]" />
      <div className="orb right-[5%] bottom-[5%] h-64 w-64 bg-[#2ee6d6]" style={{ animationDelay: "1.5s" }} />
      <div className="orb right-[30%] top-[5%] h-40 w-40 bg-[#8b7cff]" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="anim-rise mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b8f34a] pulse-ring" />
          Built for villages · Works offline-first
        </div>
        <h1 className="anim-rise delay-1 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your village,{" "}
          <span className="shimmer-text">smarter decisions</span>
        </h1>
        <p className="anim-rise delay-2 mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg">
          Irrigation advice, yield estimates, mandi math, health triage and micro-credit guidance — clear answers in seconds.
        </p>
        <div className="anim-rise delay-3 mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/agriculture" className="btn-primary pulse-ring">
            <Leaf className="h-4 w-4" /> Start with farming
          </Link>
          <Link to="/healthcare" className="btn-ghost !border-white/20 !bg-white/10 !text-white hover:!bg-white/20">
            <HeartPulse className="h-4 w-4" /> Health check
          </Link>
          <Link to="/finance" className="btn-ghost !border-white/20 !bg-white/10 !text-white hover:!bg-white/20">
            <Wallet className="h-4 w-4" /> Finance tools
          </Link>
        </div>
        <div className="anim-rise delay-4 mt-10 flex flex-wrap justify-center gap-6 text-left">
          {[
            { n: "9", l: "Live tools" },
            { n: "3", l: "Life pillars" },
            { n: "108", l: "Emergency" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
              <p className="font-display text-2xl font-extrabold text-[#b8f34a]">{s.n}</p>
              <p className="text-xs font-medium text-white/60">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
