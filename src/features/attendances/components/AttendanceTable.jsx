import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatTime, formatDate } from "../../../components/FormatDateTime";
import MainLayoutWrapper from "../../../components/MainLayoutWrapper";

export default function AttadanceTable({
  data,
  visibleColumns,
  onPageChange,
}) {
  const attadances = data?.data ?? [];
  const currentPage = data?.current_page ?? 1;
  const lastPage = data?.last_page ?? 1;

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "date", label: "Date" },
    { key: "check_in_time", label: "Check In" },
    { key: "check_out_time", label: "Check Out" },
    { key: "work_hour", label: "Work Hour" },
  ];

  return (
    <MainLayoutWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            {columns
              .filter((c) => visibleColumns[c.key])
              .map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {attadances.map((attd) => (
            <TableRow key={attd.id}>
              {visibleColumns.name && <TableCell>{attd?.employee.user.name}</TableCell>}
              {visibleColumns.email && <TableCell>{attd?.employee.user.email}</TableCell>}
              {visibleColumns.date && <TableCell>{formatDate(attd.date)}</TableCell>}
              {visibleColumns.check_in_time && <TableCell>{formatTime(attd.check_in_time)}</TableCell>}
              {visibleColumns.check_out_time && (<TableCell>{formatTime(attd.check_out_time ?? "-")}</TableCell>)}
              {visibleColumns.work_hour && (<TableCell>{attd.work_hour ?? "-"}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            />
          </PaginationItem>

          {[...Array(lastPage)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i + 1}
                onClick={() => onPageChange(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              disabled={currentPage >= lastPage}
              onClick={() => onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </MainLayoutWrapper>
  );
}
