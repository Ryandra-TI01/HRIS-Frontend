import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import MainLayoutWrapper from "./MainLayoutWrapper";
import Pagination from "./PaginationCustom";
import TableSummary from "./filters/TableSummary";
import PerPageSelect from "./PerPageSelect";

export default function CustomTable({
  data,
  visibleColumns,
  onPageChange,
  onRefresh,
  onDelete,
  columns,
  userRole,
  onPerPageChange,
  perPage = 10,
}) {
  const [loading, setLoading] = useState(false);

  const records = data?.data || []; // <--- PAGINATED DATA
  const currentPage = data?.current_page || 1;
  const lastPage = data?.last_page || 1;

  return (
    <>
      <TableSummary from={data?.from} to={data?.to} total={data?.total} />
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
            {records && records.length > 0 ? (
              records.map((row, index) => (
                <TableRow key={row.id}>
                  {columns
                    .filter((c) => visibleColumns[c.key])
                    .map((c) => (
                      <TableCell key={c.key}>
                        {c.render(row, index, data, {
                          loading,
                          setLoading,
                          onDelete,
                          onRefresh,
                          userRole,
                        })}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={"text-center p-8"}
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-4">
          <div className="flex flex-nowrap gap-4">
            <PerPageSelect perPage={perPage} onChange={onPerPageChange} />

            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </MainLayoutWrapper>
    </>
  );
}
