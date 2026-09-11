import Header from "../components/Header";
import Footer from "../components/Footer";

function Finance() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">💰</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Finance</h1>
        <p className="text-gray-600">Coming soon: EMI calculator, fraud detector, dashboard.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Finance;