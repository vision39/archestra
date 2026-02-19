import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TablePaginationProps {
  pageIndex: number;
  pageSize: number;
  total: number;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  /** Content to render on the left side (e.g., row selection count) */
  leftContent?: React.ReactNode;
}

export function TablePagination({
  pageIndex,
  pageSize,
  total,
  onPaginationChange,
  leftContent,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = pageIndex + 1;
  const canGoPrevious = pageIndex > 0;
  const canGoNext = currentPage < totalPages;

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {leftContent}
        </div>
        <div className="flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) =>
                onPaginationChange({ pageIndex: 0, pageSize: Number(value) })
              }
            >
              <SelectTrigger className="h-8 w-[90px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50, 100].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => onPaginationChange({ pageIndex: 0, pageSize })}
              disabled={!canGoPrevious}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() =>
                onPaginationChange({ pageIndex: pageIndex - 1, pageSize })
              }
              disabled={!canGoPrevious}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() =>
                onPaginationChange({ pageIndex: pageIndex + 1, pageSize })
              }
              disabled={!canGoNext}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() =>
                onPaginationChange({
                  pageIndex: totalPages - 1,
                  pageSize,
                })
              }
              disabled={!canGoNext}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col items-center gap-0 md:hidden">
        {/* Selection info - hidden when zero selected */}
        {leftContent && (
          <div className="text-[11px] text-muted-foreground/70 mb-1.5">
            {leftContent}
          </div>
        )}

        {/* Pagination container */}
        <div className="w-full rounded-lg border bg-muted/30 px-4 py-2.5 flex flex-col items-center gap-2.5">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-muted-foreground">
              Rows per page
            </p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) =>
                onPaginationChange({ pageIndex: 0, pageSize: Number(value) })
              }
            >
              <SelectTrigger className="h-7 w-[68px] text-xs">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50, 100].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="size-8 disabled:opacity-25"
              onClick={() =>
                onPaginationChange({ pageIndex: pageIndex - 1, pageSize })
              }
              disabled={!canGoPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-semibold tabular-nums min-w-[44px] text-center">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="size-8 disabled:opacity-25"
              onClick={() =>
                onPaginationChange({ pageIndex: pageIndex + 1, pageSize })
              }
              disabled={!canGoNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
