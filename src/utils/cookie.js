import Cookies from "js-cookie";

export const Cookie = {
  get: (key) => Cookies.get(key),
  set: (key, value) => Cookies.set(key, typeof value === "object" ? JSON.stringify(value) : value),

  /** Get token */
  getToken: () => Cookies.get(import.meta.env.VITE_GG_CALENDAR_TOKEN_KEY),

  /** Set token */
  setToken: (token) => Cookies.set(import.meta.env.VITE_GG_CALENDAR_TOKEN_KEY, token),

  /** Clear token */
  clearToken: () => Cookies.remove(import.meta.env.VITE_GG_CALENDAR_TOKEN_KEY),

  /** Check has token */
  hasToken: () => Boolean(Cookies.get(import.meta.env.VITE_GG_CALENDAR_TOKEN_KEY))
}