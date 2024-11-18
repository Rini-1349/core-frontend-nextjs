import apiFetch from "@/services/api";

export async function login({ username, password }) {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function register(data) {
  data.email = data.username;
  return apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function forgotPassword(email) {
  console.log(email);
  return apiFetch("/forgot-password", {
    method: "POST",
    body: JSON.stringify(email),
  });
}

export async function resetPassword(password, params) {
  console.log(params);
  console.log(password);
  return apiFetch(`reset-password?${params}`, {
    method: "POST",
    body: JSON.stringify(password),
  });
}

export async function resendValidationEmail(userId) {
  console.log(userId);
  return apiFetch(`resend-validation-email/${userId}`);
}

export async function verifyEmail(params) {
  console.log(params);
  return apiFetch(`verify-email?${params}`);
}
