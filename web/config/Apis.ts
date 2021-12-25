import axios from "axios"

import { IMGBBURL } from "./Constants"

export const api = axios.create({
	baseURL: "/api"
})

export const imgBBApi = axios.create({
	baseURL: IMGBBURL
})
