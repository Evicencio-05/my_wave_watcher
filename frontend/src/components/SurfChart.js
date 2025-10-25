import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'chart.js';

const SurfChart = ({ stationId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/surf-data/${stationId}`)
      .then(response => setData(response.data.all))
      .catch(error => console.error('Error fetching data:', error));
  }, [stationId]);

  return (
    <div className="p-4">
      <h2 className="text-xl">Wave Height for {stationId}</h2>
      {/* Chart.js integration here */}
    </div>
  );
};

export default SurfChart;
