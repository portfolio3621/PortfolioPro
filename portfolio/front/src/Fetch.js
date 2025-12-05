import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URI;

async function get(path) {
  const response = await axios.get(`${BASE_URL}/${path}`, {
    withCredentials: true,
  });
  return response.data;
}

async function post(path, data) {
  const response = await axios.post(`${BASE_URL}/${path}`, data, {
    withCredentials: true,
  });
  return response.data;
}

async function put(path, data) {
  const response = await axios.put(`${BASE_URL}/${path}`, data, {
    withCredentials: true,
  });
  return response.data;
}
async function deleteData(path) {
  const response = await axios.delete(`${BASE_URL}/${path}`, {
    withCredentials: true,
  });
  return response.data;
}

export default { get, post, put, deleteData };
