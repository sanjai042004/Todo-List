import axios from "axios";

export const API = axios.create({
  baseURL: "https://todobackend-0imq.onrender.com/api/",
});
