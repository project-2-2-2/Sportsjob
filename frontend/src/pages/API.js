 
import axios from 'axios';

const API_KEY = "42b5fb2d-c4bb-4a0c-bf25-f1564ce0e623";
const BASE_URL = 'https://api.cricapi.com/v1';

export const getMatches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/matches`, {
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

export const getMatchInfo = async (matchId) => {
  try {
    const response = await axios.get(`${BASE_URL}/match_info`, {
      params: {
        apikey: API_KEY,
        id: matchId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching match info:', error);
    return null;
  }
};

export const getSeriesList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/series`, {
      params: {
        apikey: API_KEY,
        offset: 0,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching series list:', error);
    return null;
  }
};

 