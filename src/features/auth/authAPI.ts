import { AuthRequest } from "./types";

export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

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
