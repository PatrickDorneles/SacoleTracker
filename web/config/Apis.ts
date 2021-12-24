import { IMGBBURL } from "./Constants";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

export const imgBBApi = axios.create({
  baseURL: IMGBBURL,
});
