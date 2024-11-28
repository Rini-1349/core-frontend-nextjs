import axios, { Axios } from "axios";

/**
 * AXIOS client
 *
 * @type {Axios}
 */
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
