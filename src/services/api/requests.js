import axios from 'axios';

const postData = async (url, body) => {
  const response = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export { postData };
