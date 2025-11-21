import API from "@/lib/https";

/* -----------------------------------------
 * ADMIN API
 * -----------------------------------------
 */

// Get all attendances
export const getAllAttendances = async (params = {}) => {
  const res = await API.get("/attendances", { params });
  return res.data;
};

// Get all leave requests
export const getAllLeaveRequests = async (params = {}) => {
  const res = await API.get("/leave-requests", { params });
  return res.data;
};

// Get all performance reviews
export const getAllPerformanceReviews = async (params = {}) => {
  const res = await API.get("/performance-reviews", { params });
  return res.data;
};

/* -----------------------------------------
 * EMPLOYEE API
 * -----------------------------------------
 */

export const getMyAttendances = async (params = {}) => {
  const res = await API.get("/attendances/me", { params });
  return res.data;
};

export const getMyLeaveRequests = async (params = {}) => {
  const res = await API.get("/leave-requests/me", { params });
  return res.data;
};

export const getMyPerformanceReviews = async (params = {}) => {
  const res = await API.get("/performance-reviews/me", { params });
  return res.data;
};




export const getEmployees = (params = {}) =>
  API.get("/employees", { params });
