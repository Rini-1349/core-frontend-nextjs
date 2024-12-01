import apiFetch from "@/services/api";
import { getTokenClientSide } from "@/utils/session";
import { Axios } from "axios";

const BEARER_TOKEN = getTokenClientSide();

/**
 * resendValidationEmail function
 *
 * @export
 * @async
 * @param {number} userId
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
