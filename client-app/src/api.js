import axios from "axios";

// All API calls go to the Node.js + Express server
const api = axios.create({
  baseURL: "http://localhost:7000/api"
});

export default api;
