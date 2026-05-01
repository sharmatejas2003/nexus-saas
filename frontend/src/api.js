import axios from "axios";

const API = axios.create({
  baseURL: "nexus-saas-production-8661.up.railway.app"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;