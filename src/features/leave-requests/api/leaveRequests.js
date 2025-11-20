import API from "@/lib/https";

// get my leave requests
export const getMyLeaveRequests = async (params = {}) => {
  const res = await API.get("/leave-requests/me", { params });
  return res.data.data;
};
export const getLeaveRequests = async (params = {}) => {
  const res = await API.get("/leave-requests", { params });
  return res.data;
}

// create leave request
export const createLeaveRequest = async (leaveRequestData) => {
  const res = await API.post("/leave-requests", leaveRequestData);
  return res.data;
};

// get leave request by id
export const getLeaveRequestById = async (leaveRequestId) => {
  const res = await API.get(`/performance-reviews/${leaveRequestId}`);
  return res.data;
}
// update leave request
export async function reviewLeaveRequest(id, status, reviewerNote) {
  return API.patch(`/leave-requests/${id}/review`, {
    status,
    reviewer_note: reviewerNote || null,
  });
}
