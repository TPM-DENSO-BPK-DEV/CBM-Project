const Card = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="text-4xl text-gray-600">{icon}</div>
      </div>
    </div>
  );
  
  export default Card;
  