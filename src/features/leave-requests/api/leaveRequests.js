import api from "@/lib/https";

// get my leave requests
export const getMyLeaveRequests = async (params = {}) => {
  const res = await api.get("/leave-requests/me", { params });
  return res.data.data;
};

// create leave request
export const createLeaveRequest = async (payload) => {
  const res = await api.post("/leave-requests", payload);
  return res.data;
};
