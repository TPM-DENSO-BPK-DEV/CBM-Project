// utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';
const USERNAME = 'CBM_Admin';
const PASSWORD = '1qaz@WSX';

const fetchAuthHeader = () => {
  const base64Credentials = btoa(`${USERNAME}:${PASSWORD}`);
  return `Basic ${base64Credentials}`;
};

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/cbm_raw_data/`, {
      headers: {
        Authorization: fetchAuthHeader(),
      },
    });
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results;
    } else {
      throw new Error('Invalid data structure received from API');
    }
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    throw error;
  }
};