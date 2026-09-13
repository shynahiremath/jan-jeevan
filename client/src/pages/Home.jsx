import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import PillarCard from "../components/PillarCard";

function Home() {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: "🌾",
      title: t("pillars.agriculture.title"),
      description: t("pillars.agriculture.description"),
      path: "/agriculture",
      variant: "agriculture",
      features: ["Smart Irrigation recommendations", "Crop Yield Prediction", "Direct-to-Market Logistics"],
    },
    {
      icon: "🩺",
      title: t("pillars.healthcare.title"),
      description: t("pillars.healthcare.description"),
      path: "/healthcare",
      variant: "healthcare",
      features: ["Remote Health Check", "Local Health Watch alerts", "Digital Patient Records"],
    },
    {
      icon: "💰",
      title: t("pillars.finance.title"),
      description: t("pillars.finance.description"),
      path: "/finance",
      variant: "finance",
      features: ["Micro-Credit Scoring", "Assisted Digital Payments", "Community Savings"],
    },
    {
      icon: "🏛️",
      title: t("pillars.schemes.title"),
      description: t("pillars.schemes.description"),
      path: "/schemes",
      variant: "schemes",
      features: ["Find schemes you qualify for", "Simple eligibility check"],
    },
  ];

  return (
    <Layout>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="section-title mb-3">{t("helpQuestion")}</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Choose a pillar to get practical help designed for rural communities.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={p.path} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.07}s` }}>
              <PillarCard {...p} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Home;
