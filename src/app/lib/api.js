import axios from "axios";

const instance = axios.create({
  baseURL: "https://snomato.onrender.com/",
});

// Read cookie safely
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const cookieArr = document.cookie.split("; ");
  const cookie = cookieArr.find(row => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
}

instance.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
  
export default instance;
