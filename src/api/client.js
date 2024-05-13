import axios from "axios";

// set API endpoint for the daemon read
export const BASE_URL = "http://beta.haaukins.com:8080/v1/admin/"

export const URL_txt = "beta.haaukins.com" // Used for ux when url for events are shown etc.

const apiClient = axios.create({
  // set API endpoint for the daemon 
  baseURL: "http://beta.haaukins.com:8080/v1/admin"
});

export default apiClient;