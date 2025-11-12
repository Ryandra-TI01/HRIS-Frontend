import API from "../../../lib/https";

// LOGIN USER
export const loginRequest = async ({ email, password }) => {
  const res = await API.post("/login", { email, password });
  return res.data;
};

// LOGOUT USER
export const logoutRequest = async ({ token }) => {
  const res = await API.post("/logout");
  return res.data;
};
