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
          <p className="text-sm text-gray-600">Wind Direction</p>
          <p className="text-2xl font-semibold">{data.windDirection}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-2xl font-semibold">{data.windSpeed}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Gust Speed</p>
          <p className="text-2xl font-semibold">{data.gustSpeed}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wave Height</p>
          <p className="text-2xl font-semibold">{data.waveHeight}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Dominant Wave Period</p>
          <p className="text-2xl font-semibold">{data.dominantWavePeriod}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Average Wave Period</p>
          <p className="text-2xl font-semibold">{data.averageWavePeriod}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Dominant Wave Direction</p>
          <p className="text-2xl font-semibold">{data.dominantWaveDirection}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Sea Level Pressure</p>
          <p className="text-2xl font-semibold">{data.seaLevelPressure}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Air Tempurature (Celcius)</p>
          <p className="text-2xl font-semibold">{data.airTempC}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Surface Sea Temp (Celcius)</p>
          <p className="text-2xl font-semibold">{data.surfaceSeaTempC}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Dew Point</p>
          <p className="text-2xl font-semibold">{data.stationVisibility}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Station Visibility</p>
          <p className="text-2xl font-semibold">{data.stationVisibility}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Pressure Tendency</p>
          <p className="text-2xl font-semibold">{data.pressureTendency}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
