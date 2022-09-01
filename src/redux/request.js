import axios from "axios";

const instance = axios.create({
  baseURL: "http://15.165.205.156:8080",
  headers: { Authorization: localStorage.getItem("token") },
});

export default instance;
