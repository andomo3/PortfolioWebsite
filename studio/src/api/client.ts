import axios from "axios";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()!.split(";").shift();
  }
  return undefined;
}

export const api = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrf = getCookie("csrftoken");
  if (csrf) {
    config.headers["X-CSRFToken"] = csrf;
  }
  return config;
});
