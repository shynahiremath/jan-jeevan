import { useState } from "react";
import VoiceInput from "./VoiceInput";
import VoiceOutput from "./VoiceOutput";

// Combined demo: speak → see it echoed back → tap "Play it back" to
// hear it. This is what the Phase 10 test page uses. Later phases
// reuse VoiceInput / VoiceOutput individually inside real features.
function VoiceAssistant() {
  const [heardText, setHeardText] = useState("");

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <VoiceInput onResult={setHeardText} />
      {heardText && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-700 font-medium">You said:</p>
          <p className="text-lg text-gray-900">{heardText}</p>
          <VoiceOutput text={heardText} label="Play it back" />
        </div>
      )}
    </div>
  );
}

export default VoiceAssistant;