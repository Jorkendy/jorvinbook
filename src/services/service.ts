import axios from "axios";

import config from "../utils/config";
import { SignUpUser } from "../interfaces/signUpUser.interface";
import { BasicUser } from "../interfaces/basicUser.interface";

const Axios = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: `${config.api}`
});

const service = {
  signUp: (credential: SignUpUser) => Axios.post("/auth/signup", credential),
  signIn: (credential: BasicUser) => Axios.post("/auth/signin", credential)
};

export default service;
