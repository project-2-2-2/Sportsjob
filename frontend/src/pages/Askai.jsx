import React, { useEffect, useState } from 'react';
import axios from "axios";
const Askai = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const API_KEY = "42b5fb2d-c4bb-4a0c-bf25-f1564ce0e623";
  const API_URL = `https://cricapi.com/api/matches?apikey=42b5fb2d-c4bb-4a0c-bf25-f1564ce0e623`;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(API_URL);
        setMatches(response.data.matches);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [API_URL]);

  if (loading) {
    return <div>Loading live scores...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Live Cricket Scores</h1>
      <div className="matches">
        {matches.map((match) => (
          <div key={match.unique_id} className="match">
            <h2>
              {match["team-1"]} vs {match["team-2"]}
            </h2>
            <p>Match Type: {match.type}</p>
            <p>Status: {match.matchStarted ? "In Progress" : "Not Started"}</p>
            {match.matchStarted && (
              <p>
                Score: {match.score || "Score not available"}
              </p>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Askai;