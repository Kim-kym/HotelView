// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8050",
  withCredentials: true, // 쿠키(세션) 전송 옵션 추가
});

export default api;
