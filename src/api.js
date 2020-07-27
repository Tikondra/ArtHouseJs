import axios from "axios";

export const createAPI = () => {
  const api = axios.create({
    baseURL: `/wp-json/myplugin/v1`,
    timeout: 20000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
