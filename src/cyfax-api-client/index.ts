import axios from "axios";

const cyfaxApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CYFAX_API_BASE_URL,
});

export default cyfaxApiClient;
