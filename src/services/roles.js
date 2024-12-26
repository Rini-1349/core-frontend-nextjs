import apiFetch from "@/services/api";
import { getTokenClientSide } from "@/utils/session";
import { Axios } from "axios";

const BEARER_TOKEN = getTokenClientSide();

/**
 * getRolesList function
 *
 * @export
 * @async
 * @param {array} filters
 * @returns {Axios}
 */
export async function getRolesList(filters) {
  const query = new URLSearchParams({
    ...filters,
  }).toString();

  return apiFetch(`roles?${query}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });
}

/**
 * getRoleDetails function
 *
 * @export
 * @async
 * @param {number} id
 * @returns {Axios}
 */
export async function getRoleDetails(id) {
  return apiFetch(`roles/${id}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });
}

/**
 * createRole function
 *
 * @export
 * @async
 * @param {{}} data
 * @returns {Axios}
 */
export async function createRole(data) {
  return apiFetch("/roles", {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * updateRole function
 *
 * @export
 * @async
 * @param {number} id
 * @param {{}} data
 * @returns {Axios}
 */
export async function updateRole({ id, data }) {
  return apiFetch(`roles/${id}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
}
