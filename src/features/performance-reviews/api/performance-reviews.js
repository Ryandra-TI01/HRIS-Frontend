import API from "../../../lib/https";

export const getPerformancesRequest = async (params = {}) => {
  const res = await API.get("/performance-reviews", { params });
  return res.data;
};

export const createPerformanceRequest = async (performanceData) => {
  const res = await API.post("/performance-reviews", performanceData);
  return res.data;
}

export const getPerformanceByIdRequest = async (performanceId) => {
  const res = await API.get(`/performance-reviews/${performanceId}`);
  return res.data;
}

export const updatePerformanceRequest = async (performanceId, performanceData) => {
  const res = await API.put(`/performance-reviews/${performanceId}`, performanceData);
  return res.data;
}

export const deletePerformanceRequest = async (performanceId) => {
  const res = await API.delete(`/performance-reviews/${performanceId}`);
  return res.data;
}
<<<<<<< HEAD


// Employee API
export const getMyPerformanceReviews = async (params = {}) => {
  const res = await API.get("/performance-reviews/me", { params });
  return res.data.data || [];
};
=======
>>>>>>> cd5d679c01e444dde8b27dbddfddf89ffe57feff
