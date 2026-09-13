import { Link } from "react-router-dom";
import { Leaf, HeartPulse, Wallet } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container-app py-10 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-600">Rural super app</p>
          <h1 className="title text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight">
            Clear answers for farm, health & money
          </h1>
          <p className="subtitle mx-auto mt-3 max-w-lg text-base">
            Irrigation advice, yield estimates, mandi math, health triage and simple credit tools — fast and easy on any phone.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/agriculture" className="btn btn-primary">
              <Leaf className="h-4 w-4" /> Agriculture
            </Link>
            <Link to="/healthcare" className="btn btn-secondary">
              <HeartPulse className="h-4 w-4" /> Healthcare
            </Link>
            <Link to="/finance" className="btn btn-secondary">
              <Wallet className="h-4 w-4" /> Finance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
