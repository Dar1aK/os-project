import { AuthRequest } from "./types";

export const userAuth = (body: AuthRequest) => {
  return fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(async (res) => {
    const resolve = await res.json();
    if (!resolve.access) {
      return Promise.reject(resolve);
    }
    return resolve;
  });
};
