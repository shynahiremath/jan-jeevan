import { useRef, useState, useEffect } from "react";
import { Camera, X } from "lucide-react";

function CameraCapture({ onImageSelected, disabled }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isStarting, setIsStarting] = useState(false);

  // Clean up camera when component unmounts
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    setIsStarting(true);

    try {
      // Prefer the back camera on mobile
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Camera error:", err);
      if (err.name === "NotAllowedError") {
        setError("Camera permission denied. Please allow camera access and try again.");
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else {
        setError("Could not open the camera. Try uploading a photo instead.");
      }
    } finally {
      setIsStarting(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File([blob], `crop-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });

        const previewUrl = URL.createObjectURL(blob);

        onImageSelected({ file, previewUrl });
        stopCamera();
      },
      "image/jpeg",
      0.85
    );
  };

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return (
      <p className="text-sm text-orange-600 text-center">
        Camera is not supported on this browser. Please upload a photo instead.
      </p>
    );
  }

  return (
    <div className="w-full">
      {!isCameraOpen ? (
        <button
          type="button"
          onClick={startCamera}
          disabled={disabled || isStarting}
          className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-5 px-4 rounded-2xl transition disabled:opacity-50"
        >
          <Camera size={24} />
          <span>{isStarting ? "Opening camera..." : "Open Camera"}</span>
        </button>
      ) : (
        <div className="relative bg-black rounded-2xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-h-80 object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6">
            <button
              onClick={takePhoto}
              className="w-16 h-16 rounded-full bg-white border-4 border-green-500 shadow-lg"
              aria-label="Take photo"
            />
            <button
              onClick={stopCamera}
              className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
              aria-label="Close camera"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}

export default CameraCapture;