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