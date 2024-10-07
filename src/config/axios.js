import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: false, // Include credentials with requests
});

const handleBefore = (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
};

const handleError = (error) => {
    console.log(error);
};

api.interceptors.request.use(handleBefore, handleError);

export default api;
