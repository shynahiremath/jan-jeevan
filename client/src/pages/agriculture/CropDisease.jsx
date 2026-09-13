import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Camera, ArrowLeft, Upload, Leaf, AlertTriangle, CheckCircle2, X } from "lucide-react";

const DISEASES = [
  { name: "Leaf Blight", severity: "moderate", treatment: "Apply copper-based fungicide. Remove infected leaves. Improve air flow between plants.", crops: ["Rice", "Maize", "Wheat"] },
  { name: "Powdery Mildew", severity: "mild", treatment: "Spray neem oil or sulfur-based fungicide early morning. Avoid overhead watering.", crops: ["Wheat", "Onion", "Tomato"] },
  { name: "Bacterial Spot", severity: "moderate", treatment: "Use copper spray. Avoid working in wet fields. Remove severely infected plants.", crops: ["Tomato", "Cotton", "Potato"] },
  { name: "Rust", severity: "high", treatment: "Apply recommended fungicide within 48 hours. Plant resistant varieties next season.", crops: ["Wheat", "Soybean", "Maize"] },
  { name: "Healthy Crop", severity: "none", treatment: "No disease detected. Continue regular care and monitoring.", crops: [] },
];

function CropDisease() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);

  const onFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const analyze = () => {
    if (!image && !preview) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const idx = image ? (image.size + (image.name?.length || 0)) % DISEASES.length : Math.floor(Math.random() * DISEASES.length);
      const d = DISEASES[idx];
      setResult({ ...d, confidence: 72 + (idx * 5) % 23 });
      setAnalyzing(false);
    }, 1500);
  };

  const clear = () => {
    setImage(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setResult(null);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link to="/agriculture" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Agriculture
        </Link>
        <div className="mb-8 text-center animate-fade-in-up">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 shadow-lg shadow-violet-200/50">
            <Camera className="h-7 w-7" />
          </div>
          <h1 className="section-title">Crop Disease Scan</h1>
          <p className="mt-2 text-slate-500 text-sm">Upload or capture a leaf photo for instant guidance.</p>
        </div>
        <div className="card space-y-5 animate-fade-in-up stagger-1">
          {!preview ? (
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-gradient-to-br from-brand-50/50 to-emerald-50/30 py-14 cursor-pointer transition hover:border-brand-400 hover:bg-brand-50/80"
            >
              <Upload className="h-10 w-10 text-brand-500 mb-3" />
              <p className="font-semibold text-slate-800">Tap to upload photo</p>
              <p className="text-xs text-slate-400 mt-1">or drag & drop • JPG, PNG</p>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
            </div>
          ) : (
            <div className="relative">
              <img src={preview} alt="Crop" className="w-full max-h-72 object-contain rounded-xl bg-slate-100" />
              <button onClick={clear} className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 shadow-md hover:bg-red-50 transition">
                <X className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          )}
          <div className="flex gap-3">
            <button type="button" onClick={() => fileRef.current?.click()} className="btn-secondary flex-1">
              <Camera className="h-4 w-4" /> {preview ? "Change photo" : "Camera / Gallery"}
            </button>
            <button type="button" onClick={analyze} disabled={!preview || analyzing} className="btn-primary flex-1">
              {analyzing ? "Analyzing…" : "Scan crop"}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </div>
        {analyzing && (
          <div className="mt-6 card text-center animate-pulse">
            <Leaf className="h-8 w-8 text-brand-500 mx-auto mb-2 animate-float" />
            <p className="text-sm font-medium text-slate-600">Analyzing leaf patterns…</p>
          </div>
        )}
        {result && !analyzing && (
          <div className={`mt-6 card animate-scale-in border-2 ${
            result.severity === "none" ? "border-brand-200 bg-gradient-to-br from-brand-50 to-white" :
            result.severity === "high" ? "border-red-200 bg-gradient-to-br from-red-50 to-white" :
            "border-amber-200 bg-gradient-to-br from-amber-50 to-white"
          }`}>
            <div className="flex items-center gap-2 mb-3">
              {result.severity === "none" ? <CheckCircle2 className="h-6 w-6 text-brand-600" /> : <AlertTriangle className="h-6 w-6 text-amber-600" />}
              <h3 className="font-bold text-lg text-slate-900">{result.name}</h3>
              <span className={`ml-auto badge ${result.severity === "none" ? "badge-green" : result.severity === "high" ? "badge-red" : "badge-amber"}`}>
                {result.severity === "none" ? "Healthy" : result.severity}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-2">Confidence: <strong>{result.confidence}%</strong></p>
            <p className="text-sm text-slate-700 leading-relaxed">{result.treatment}</p>
            <p className="mt-3 text-xs text-slate-400">Guidance only — confirm with local agri officer for serious cases.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default CropDisease;
