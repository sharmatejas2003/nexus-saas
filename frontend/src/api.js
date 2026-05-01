import axios from "axios";

const API = axios.create({
  baseURL: "https://nexus-saas-production-8661.up.railway.app/api", 
});

// THIS PART ATTACHES THE TOKEN
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Must have 'Bearer ' space included
  }
  return req;
});

export default API;