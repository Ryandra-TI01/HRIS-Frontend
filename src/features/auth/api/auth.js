import API from "../../../lib/https";

// LOGIN USER
export const loginRequest = async ({ email, password }) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

// LOGOUT USER
export const logoutRequest = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};