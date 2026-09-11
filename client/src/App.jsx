import Header from "./components/Header";
import Hero from "./components/Hero";
import PillarCard from "./components/PillarCard";
import Footer from "./components/Footer";

const pillars = [
  {
    icon: "🌾",
    title: "Agriculture",
    description: "Weather, mandi prices, crop help",
    color: "border-green-200 bg-green-50",
  },
  {
    icon: "🏥",
    title: "Healthcare",
    description: "Symptom check, hospitals, reports",
    color: "border-red-200 bg-red-50",
  },
  {
    icon: "💰",
    title: "Finance",
    description: "EMI calculator, fraud check, schemes",
    color: "border-yellow-200 bg-yellow-50",
  },
  {
    icon: "🏛️",
    title: "Govt. Schemes",
    description: "Find schemes you may qualify for",
    color: "border-blue-200 bg-blue-50",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Hero />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          What do you need help with today?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <PillarCard
              key={pillar.title}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              color={pillar.color}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;