const StatsPanel = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Current Conditions</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Wave Height</p>
          <p className="text-2xl font-semibold">{data.waveHeight}m</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wave Period</p>
          <p className="text-2xl font-semibold">{data.wavePeriod}s</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-2xl font-semibold">{data.windSpeed}m/s</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wind Direction</p>
          <p className="text-2xl font-semibold">{data.windDirection}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;