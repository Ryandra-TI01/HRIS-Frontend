import API from "../../../lib/https";

// Get my attendances (employee)
export const getMyAttendances = async (params = {}) => {
  const res = await API.get("/attendances/me", { params });
  return res.data;
};
