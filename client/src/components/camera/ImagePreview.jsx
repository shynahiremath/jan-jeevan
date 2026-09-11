function ImagePreview({ imageUrl, onClear }) {
  if (!imageUrl) return null;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <img
        src={imageUrl}
        alt="Selected crop"
        className="w-full rounded-2xl border border-gray-200 object-cover max-h-80"
      />
      <button
        onClick={onClear}
        className="absolute top-3 right-3 bg-red-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold shadow-md hover:bg-red-600"
        aria-label="Remove image"
      >
        ×
      </button>
    </div>
  );
}

export default ImagePreview;