import API from "../../../lib/https";

export const getEmployeesRequest = async (params = {}) => {
  const res = await API.get("/employees", { params });
  return res.data;
};

export const createEmployeeRequest = async (employeeData) => {
  const res = await API.post("/employees", employeeData);
  return res.data;
}

export const getEmployeeByIdRequest = async (employeeId) => {
  const res = await API.get(`/employees/${employeeId}`);
  return res.data;
}

export const updateEmployeeRequest = async (employeeId, employeeData) => {
  const res = await API.put(`/employees/${employeeId}`, employeeData);
  return res.data;
}

export const deleteEmployeeRequest = async (employeeId) => {
  const res = await API.delete(`/employees/${employeeId}`);
  return res.data;
}

export const getManagersRequest = async () => {
  const res = await API.get("/employees/managers");
  return res.data;
}