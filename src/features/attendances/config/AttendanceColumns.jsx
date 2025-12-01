import { formatDate } from "../../../hooks/FormatDateTime";

export const AttendanceColumns = [
  {
    key: "no",
    label: "No",
    render: (row, index, data) => {
      const perPage = data?.per_page || 20;
      const currentPage = data?.current_page || 1;

      return (currentPage - 1) * perPage + index + 1;
    },
  },
  {
    key: "name",
    label: "Name",
    render: (row) => row.employee.name,
  },
  {
    key: "email",
    label: "Email",
    render: (row) => row.employee.email,
  },
  {
    key: "date",
    label: "Date",
    render: (row) => formatDate(row.date),
  },
  {
    key: "check_in_time",
    label: "Check In",
    render: (row) => row.check_in_time || "-",
  },
  {
    key: "check_out_time",
    label: "Check Out",
    render: (row) => row.check_out_time || "-",
  },
  {
    key: "work_hour",
    label: "Work Hour",
    render: (row) => `${row.work_hour || 0} Hour`,
  },
];
