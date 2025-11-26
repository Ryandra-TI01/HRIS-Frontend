import API from "../../../lib/https";

export const getProfileRequest = async () => {
  const res = await API.get("/me/profile");
  return res.data;
};