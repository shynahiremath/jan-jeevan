function PillarCard({ icon, title, description, color }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-md hover:shadow-xl transition cursor-pointer border-2 ${color}`}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default PillarCard;