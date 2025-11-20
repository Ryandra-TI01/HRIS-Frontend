import API from "../../../lib/https";

// GET ALL ATTENDANCES ROLE ADMIN HR
export const getAttendancesRequest  = async (params = {}) => {
  const res = await API.get("/attendances", { params });
  return res.data;
};

// CREATE ATTENDANCE ROLE ADMIN HR, MANAGER, EMPLOYEE
export const createAttendanceRequest = async (attendanceData) => {
  const res = await API.post("/attendances", attendanceData);
  return res.data;
};

// Get my attendances (employee)
export const getMyAttendances = async (params = {}) => {
  const res = await API.get("/attendances/me", { params });
  return res.data;
};

export const checkIn = async () => {
  const res = await API.post("/attendances/check-in");
  return res.data;
};

export const checkOut = async () => {
  const res = await API.post("/attendances/check-out");
  return res.data;
};

