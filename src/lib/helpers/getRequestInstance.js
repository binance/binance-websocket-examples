import axios from 'axios';

// const BASEURL = 'https://api.binance.com';

const getRequestInstance = (config) => {
  console.log(config);
  return axios.create({
    // baseURL: BASEURL,
    ...config,
  });
};

export default getRequestInstance;
