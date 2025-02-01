import React, { useState } from "react";
import { getMatchDetail } from "../pages/API.js";

const MyCard = ({ match }) => {
    const [detail, setDetail] = useState({});
    const [open, setOpen] = useState(false);
  
    // Fetch live score periodically
    useEffect(() => {
      const fetchLiveScore = async () => {
        const data = await getMatchInfo(match.id);
        if (data) {
          setDetail(data.data);
        }
      };
  
      // Fetch live score every 10 seconds
      const interval = setInterval(fetchLiveScore, 10000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, [match.id]);
  
    const showDetailBtnClicked = () => {
      setOpen(!open);
    };
  
    return (
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h3>{match.name}</h3>
        <p>Status: {detail.status || match.status}</p>
        <p>Venue: {match.venue}</p>
        <p>Date: {new Date(match.dateTimeGMT).toLocaleString()}</p>
  
        {/* Display Live Score */}
        {detail.score && (
          <div>
            <h4>Live Score</h4>
            {detail.score.map((inning, index) => (
              <div key={index}>
                <p>
                  {inning.inning}: {inning.r}/{inning.w} ({inning.o} overs)
                </p>
              </div>
            ))}
          </div>
        )}
  
        <button onClick={showDetailBtnClicked}>
          {open ? 'Hide Details' : 'Show Details'}
        </button>
  
        {open && (
          <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <h4>Match Details</h4>
            <p>Teams: {detail.teams?.join(' vs ')}</p>
            <p>Score: {JSON.stringify(detail.score)}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default MyCard;