import apiFetch from "@/services/api";
import { getTokenClientSide } from "@/utils/session";
import { Axios } from "axios";

/**
 * getUsersList function
 *
 * @export
 * @async
 * @param {array} filters
 * @returns {Axios}
 */
export async function getUsersList(filters, getRoles) {
  const query = new URLSearchParams({ get_roles: getRoles ? 1 : 0, ...filters }).toString();

  return apiFetch(`users?${query}`, {
    headers: {
      Authorization: `Bearer ${getTokenClientSide()}`,
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
      Authorization: `Bearer ${getTokenClientSide()}`,
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
      Authorization: `Bearer ${getTokenClientSide()}`,
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * editProfilePassword function
 *
 * @export
 * @async
 * @param {{}} data
 * @returns {Axios}
 */
export async function editProfilePassword({ data }) {
  return apiFetch(`profile/edit-password`, {
    headers: {
      Authorization: `Bearer ${getTokenClientSide()}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * getRolesList function
 *
 * @export
 * @async
 * @returns {Axios}
 */
export async function getRolesList() {
  return apiFetch(`users/roles`, {
    headers: {
      Authorization: `Bearer ${getTokenClientSide()}`,
    },
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
      Authorization: `Bearer ${getTokenClientSide()}`,
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
      Authorization: `Bearer ${getTokenClientSide()}`,
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
      Authorization: `Bearer ${getTokenClientSide()}`,
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
      Authorization: `Bearer ${getTokenClientSide()}`,
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
      Authorization: `Bearer ${getTokenClientSide()}`,
    },
    method: "DELETE",
  });
}
