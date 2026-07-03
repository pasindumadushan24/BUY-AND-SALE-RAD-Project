import axios from "axios";

const api = axios.create({
  baseURL: "https://gracious-liberation-production-245a.up.railway.app/api",
});

export default api;