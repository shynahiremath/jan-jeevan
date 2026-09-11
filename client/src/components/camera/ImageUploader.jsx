import { useRef } from "react";
import { Upload } from "lucide-react";

function ImageUploader({ onImageSelected, disabled }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG or WebP image.");
      return;
    }

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large. Please choose a photo under 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onImageSelected({
        file,
        previewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-700 font-medium py-5 px-4 rounded-2xl transition disabled:opacity-50"
      >
        <Upload size={24} />
        <span>Upload from Gallery</span>
      </button>
    </div>
  );
}

export default ImageUploader;