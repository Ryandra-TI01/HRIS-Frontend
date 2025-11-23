import API from "@/lib/https";

export const getAdminDashboard = async () => {
  const response = await API.get("/dashboard/admin");
  return response.data;
};

export const getManagerDashboard = async () => {
  const response = await API.get("/dashboard/manager");
  return response.data;
};

export const getEmployeeDashboard = async () => {
  const response = await API.get("/dashboard/employee");
  return response.data;
};

