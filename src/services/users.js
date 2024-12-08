import apiFetch from "@/services/api";
import { getTokenClientSide } from "@/utils/session";
import { Axios } from "axios";

const BEARER_TOKEN = getTokenClientSide();

/**
 * getUsersList function
 *
 * @export
 * @async
 * @param {array} filters
 * @returns {Axios}
 */
export async function getUsersList(filters) {
  const query = new URLSearchParams({
    ...filters,
  }).toString();
  console.log(query);

  return apiFetch(`users?${query}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });
}

/**
 * getProfile function
 *
 * @export
 * @async
 * @returns {Axios}
 */
export async function getProfile() {
  return apiFetch(`profile`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });
}

/**
 * updateProfile function
 *
 * @export
 * @async
 * @param {{}} data
 * @returns {Axios}
 */
export async function updateProfile({ data }) {
  return apiFetch(`profile`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * getUserDetails function
 *
 * @export
 * @async
 * @param {number} id
 * @returns {Axios}
 */
export async function getUserDetails(id) {
  return apiFetch(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });
}

/**
 * createUser function
 *
 * @export
 * @async
 * @param {{}} data
 * @returns {Axios}
 */
export async function createUser(data) {
  return apiFetch("/users", {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * updateUser function
 *
 * @export
 * @async
 * @param {number} id
 * @param {{}} data
 * @returns {Axios}
 */
export async function updateUser({ id, data }) {
  return apiFetch(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * editUserPassword function
 *
 * @export
 * @async
 * @param {number} id
 * @param {{}} data
 * @returns {Axios}
 */
export async function editUserPassword({ id, data }) {
  return apiFetch(`users/${id}/edit-password`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * deleteUser function
 *
 * @export
 * @async
 * @param {number} itemId
 * @returns {Axios}
 */
export async function deleteUser(itemId) {
  return apiFetch(`users/${itemId}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    method: "DELETE",
  });
}
