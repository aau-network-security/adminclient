import axios from "axios";

// set API endpoint for the daemon read
export const BASE_URL = "https://api.haaukins.dk/v1/admin/"

export const URL_txt = "haaukins.dk" // Used for ux when url for events are shown etc.

const apiClient = axios.create({
  // set API endpoint for the daemon 
  baseURL: "https://api.haaukins.dk/v1/admin/"
});

export default apiClient;



