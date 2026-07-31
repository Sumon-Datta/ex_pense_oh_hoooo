import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
  // baseURL: "http://10.62.233.207:5000/api"
});

export default api;