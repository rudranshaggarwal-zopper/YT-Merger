import axios from "axios";

// eslint-disable-next-line no-undef
const API_KEY = import.meta.env.VITE_API_KEY;

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 20,
    key: API_KEY,
  },
});
