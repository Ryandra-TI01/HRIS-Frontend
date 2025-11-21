import API from "../../../lib/https";

export const getSalarySlipsRequest = async (params = {}) => {
  const res = await API.get("/salary-slips", { params });
  return res.data;
};

export const createSalarySlipRequest = async (salarySlipData) => {
  const res = await API.post("/salary-slips", salarySlipData);
  return res.data;
};

export const getSalarySlipRequest = async (salaryId) => {
  const res = await API.get(`/salary-slips/${salaryId}`);
  return res.data;
};

export const updateSalarySlipRequest = async (salaryId, salarySlipData) => {
  const res = await API.put(`/salary-slips/${salaryId}`, salarySlipData);
  return res.data;
};

export const deleteSalarySlipRequest = async (salaryId) => {
  const res = await API.delete(`/salary-slips/${salaryId}`);
  return res.data;
};

export const getMySalarySlip = async () => {
  const res = await API.get("/salary-slips/me");
  return res.data.data;
};