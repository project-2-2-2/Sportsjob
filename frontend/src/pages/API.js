import axios from 'axios';

const API_KEY = "42b5fb2d-c4bb-4a0c-bf25-f1564ce0e623";
const BASE_URL = 'https://api.cricapi.com/v1/currentMatches';

export const getMatches = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        offset: 0,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return null;
  }
};

export const getScores = async () => {
  try {
    const matches = await getMatches();
    if (matches && matches.data) {
      const scores = matches.data.map(match => ({
        id: match.id,
        name: match.name,
        status: match.status,
        score: match.score,
      }));
      return scores;
    } else {
      console.error('No matches found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching scores:', error);
    return null;
  }
};

// Example usage:
(async () => {
  const scores = await getScores();
  if (scores) {
    console.log('Live Scores:', scores);
  } else {
    console.log('Failed to fetch scores');
  }
})();