import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Adjust this to your Django backend URL
const USERNAME = 'CBM_Admin';
const PASSWORD = '1qaz@WSX';

const fetchAuthHeader = () => {
  const base64Credentials = btoa(`${USERNAME}:${PASSWORD}`);
  return `Basic ${base64Credentials}`;
};

export const fetchData = async (start, end, nodeId, currentType) => {
  try {
    const params = new URLSearchParams({
      start: start,
      end: end,
      node_id: nodeId,
      current_type: currentType
    });

    console.log('Fetching data with params:', params.toString());

    const response = await axios.get(`${API_URL}/api/cbm_raw_data/?${params.toString()}`, {
      headers: {
        'Authorization': fetchAuthHeader(),
      },
    });

    console.log('API Response:', response.data);
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results;
    } else {
      console.error('Invalid data structure received from API:', response.data);
      throw new Error('Invalid data structure received from API');
    }
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    throw error;
  }
};