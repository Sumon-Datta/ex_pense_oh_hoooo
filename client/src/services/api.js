import axios from "axios";

const api = axios.create({
  baseURL: "https://ex-pense-oh-hoooo.onrender.com/api",
});

export default api;