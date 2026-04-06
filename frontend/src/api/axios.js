// We create one axios instance for the whole app
// This way we don't repeat the base URL everywhere

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Change this to your backend URL
});

export default api;
