import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: localStorage.getItem("token") },
});

export default instance;
