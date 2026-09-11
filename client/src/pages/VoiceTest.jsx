import Header from "../components/Header";
import Footer from "../components/Footer";
import VoiceAssistant from "../components/voice/VoiceAssistant";

function VoiceTest() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full text-center">
        <div className="text-5xl mb-2">🎤</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Voice Test</h1>
        <p className="text-gray-500 text-sm mb-6">
          Tap the microphone, speak a sentence, then tap "Play it back" to hear it
          read aloud. Change your language from the header to test Hindi / Marathi / Kannada.
        </p>
        <VoiceAssistant />
      </main>
      <Footer />
    </div>
  );
}

export default VoiceTest;