import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.10:8282",
  headers: {
    "Content-type": "application/json",
  },
});
