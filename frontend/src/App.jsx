import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/tailwind.css';
import LocationSelector from './components/LocationSelector.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import SurfChart from './components/SurfChart.jsx';

function App() {
  const [selectedStation, setSelectedStation] = useState('46087');
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/surf-data/${selectedStation}`);
        setCurrentData(response.data.latest);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch data');
        console.error('Error fetching surf data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedStation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌊 My Wave Watcher</h1>
          <p className="text-gray-600">Real-time NOAA buoy data visualization</p>
        </header>

        <div className="mb-6">
          <LocationSelector 
            selectedStation={selectedStation} 
            onStationChange={setSelectedStation} 
          />
        </div>

        {loading && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Loading surf data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && currentData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatsPanel data={currentData} />
            <SurfChart stationId={selectedStation} />
          </div>
        )}

        {!loading && !error && !currentData && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No data available for this station</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
