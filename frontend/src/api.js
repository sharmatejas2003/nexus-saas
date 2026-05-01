import axios from "axios";

const API = axios.create({
  // Make sure this is your LIVE backend URL from Railway
  baseURL: "https://nexus-saas-production-8661.up.railway.app/api", 
});

// This interceptor attaches the token to every outgoing request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;