import React, { useEffect, useState } from 'react';
import { getSeriesList } from './API';

const Askai = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const data = await getSeriesList();
      if (data && data.data) {
        setSeries(data.data);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div>
      <h2>Series List</h2>
      {series.map((s) => (
        <div key={s.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{s.name}</h3>
          <p>Start Date: {s.startDate}</p>
          <p>End Date: {s.endDate}</p>
        </div>
      ))}
    </div>
  );
};

export default Askai;