import API from "../../../lib/https";

export const getMySalarySlip = async () => {
  const res = await API.get("/salary-slips/me");
  return res.data.data;
};