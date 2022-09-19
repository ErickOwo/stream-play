import axios from 'axios';

const optionsMultiedia = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const postData = async (url, body) => {
  const response = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const postMultimedia = async (url, body) => {
  const response = await axios.post(url, body, optionsMultiedia);
  return response.data;
};

export { postData, postMultimedia };
