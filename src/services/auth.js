import apiFetch from "@/services/api";
import { Axios } from "axios";

/**
 * login function
 *
 * @export
 * @async
 * @param {{ username: string; password: string; }} param0
 * @param {string} param0.username
 * @param {string} param0.password
 * @returns {Axios}
 */
export async function login({ username, password }) {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

/**
 * register function
 *
 * @export
 * @async
 * @param {{}} data
 * @returns {Axios}
 */
export async function register(data) {
  data.email = data.username;
  return apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * forgotPassword function
 *
 * @export
 * @async
 * @param {string} email
 * @returns {Axios}
 */
export async function forgotPassword(email) {
  return apiFetch("/forgot-password", {
    method: "POST",
    body: JSON.stringify(email),
  });
}

/**
 * resetPassword function
 *
 * @export
 * @async
 * @param {string} password
 * @param {string} params
 * @returns {Axios}
 */
export async function resetPassword(password, params) {
  return apiFetch(`reset-password?${params}`, {
    method: "POST",
    body: JSON.stringify(password),
  });
}

/**
 * resendValidationEmail function
 *
 * @export
 * @async
 * @param {number} userId
 * @returns {Axios}
 */
export async function resendValidationEmail(userId) {
  return apiFetch(`resend-validation-email/${userId}`);
}

/**
 * verifyEmail function
 *
 * @export
 * @async
 * @param {string} params
 * @returns {Axios}
 */
export async function verifyEmail(params) {
  return apiFetch(`verify-email?${params}`);
}
