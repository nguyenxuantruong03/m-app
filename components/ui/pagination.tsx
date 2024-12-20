import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { translateMorePages, translateNext, translatePrevious } from "@/translate/translate-client"

// Pagination component
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

// PaginationContent component
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

// PaginationItem component
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

// PaginationLinkProps with languageToUse
type PaginationLinkProps = {
  isActive?: boolean
  size?: "default" | "icon" | "lg" | "sm" // Thêm kiểu kích thước phù hợp
  languageToUse?: string // Thêm prop này vào
} & React.ComponentProps<"a">

// PaginationLink component
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  languageToUse,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

// PaginationPrevious component
const PaginationPrevious = ({
  className,
  languageToUse, // Thêm prop này vào
  ...props
}: PaginationLinkProps) => {
  // Xác định nội dung của preMessage dựa trên ngôn ngữ
  const preMessage = translatePrevious(languageToUse || "vi")

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{preMessage}</span> {/* Điều chỉnh ngôn ngữ */}
    </PaginationLink>
  );
}
PaginationPrevious.displayName = "PaginationPrevious";


// PaginationNext component
const PaginationNext = ({
  className,
  languageToUse, // Thêm prop này vào
  ...props
}: PaginationLinkProps) => {
  // Xác định nội dung của nextMessage dựa trên ngôn ngữ
  const nextMessage = translateNext(languageToUse || "vi")

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>{nextMessage}</span> {/* Điều chỉnh ngôn ngữ */}
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}
PaginationNext.displayName = "PaginationNext";


// PaginationEllipsis component
const PaginationEllipsis = ({
  className,
  languageToUse, // Thêm prop này vào
  ...props
}: React.ComponentProps<"span"> & { languageToUse?: string }) => {
  // Xác định nội dung của MorePage dựa trên ngôn ngữ
  const MorePage = translateMorePages(languageToUse || "vi")

  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{MorePage}</span> {/* Điều chỉnh ngôn ngữ */}
    </span>
  );
}
PaginationEllipsis.displayName = "PaginationEllipsis";



export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
