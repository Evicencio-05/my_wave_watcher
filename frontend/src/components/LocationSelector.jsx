const LocationSelector = ({ selectedStation, onStationChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="station" className="block text-sm font-medium text-gray-700 mb-2">
        Select Buoy Station
      </label>
      <select
        id="station"
        value={selectedStation}
        onChange={(e) => onStationChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="46087">46087 - Huntington Beach</option>
        <option value="46086">46086 - San Clemente</option>
        <option value="46025">46025 - Santa Monica Basin</option>
        <option value="46011">46011 - Santa Maria</option>
      </select>
    </div>
  );
};

export default LocationSelector;