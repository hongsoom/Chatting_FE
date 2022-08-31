import axios from "axios";

const instance = axios.create({
  baseURL: "15.165.205.156",
  headers: { Authorization: localStorage.getItem("token") },
});

export default instance;
