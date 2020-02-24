import axios from "axios";

import config from "../utils/config";
import { SignUpUser } from "../interfaces/signUpUser.interface";
import { BasicUser } from "../interfaces/basicUser.interface";
import { history } from "../App";
import { Routes } from "../utils/routes";

const Axios = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: `${config.api}`
});

Axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
      history.push(Routes.SignIn)
    }
    return Promise.reject(error);
  }
);

const service = {
  signUp: (credential: SignUpUser) => Axios.post("/auth/signup", credential),
  signIn: (credential: BasicUser) => Axios.post("/auth/signin", credential),
  saveToken: (token: string) => {
    localStorage.setItem("token", token);
  },
  verifyToken: () => Axios.get("/auth/verify")
};

export default service;
