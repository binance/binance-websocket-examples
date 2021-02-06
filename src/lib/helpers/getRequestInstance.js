import axios from 'axios';

const getRequestInstance = (config) => {
  return axios.create({
    ...config,
  });
};

export default getRequestInstance;
