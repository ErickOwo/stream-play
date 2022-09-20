import axios from 'axios';

const optionsMultiedia = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const postData = async (url, body) => {
  const response = await axios.post(url, body, options);
  return response.data;
};

const postMultimedia = async (url, body) => {
  const response = await axios.post(url, body, optionsMultiedia);
  return response.data;
};

const getData = async (url) => {
  const response = await axios(url);
  return response.data;
};

export { postData, postMultimedia, getData };
