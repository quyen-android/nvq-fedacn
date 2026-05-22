export function saveAuthTokens(data) {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function clearAuthTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}