import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomPagination({
  currentPage,
  lastPage,
  onPageChange,
}) {
  const MAX_VISIBLE = 5;

  const generatePages = () => {
    // Jika total halaman sedikit, tampilkan semua
    if (lastPage <= MAX_VISIBLE) {
      return [...Array(lastPage)].map((_, i) => i + 1);
    }

    const pages = [];

    // Halaman pertama
    pages.push(1);

    // Jika currentPage lebih besar dari 3, tampilkan ellipsis
    if (currentPage > 3) {
      pages.push("ellipsis-start");
    }

    // Halaman sekitar current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(lastPage - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Jika currentPage dekat akhir
    if (currentPage < lastPage - 2) {
      pages.push("ellipsis-end");
    }

    // Halaman terakhir
    if (lastPage > 1) {
      pages.push(lastPage);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <Pagination>
      <PaginationContent>
        {/* PREV */}
        <PaginationItem>
          <PaginationPrevious
            className={currentPage <= 1 ? "opacity-50 pointer-events-none" : ""}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {/* PAGE NUMBERS */}
        {pages.map((p, idx) => {
          if (p === "ellipsis-start" || p === "ellipsis-end") {
            return (
              <PaginationItem key={p + idx}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === currentPage}
                onClick={() => onPageChange(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* NEXT */}
        <PaginationItem>
          <PaginationNext
            className={
              currentPage >= lastPage ? "opacity-50 pointer-events-none" : ""
            }
            onClick={() =>
              currentPage < lastPage && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
