import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useTranslations } from "next-intl"

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

type PaginationLinkProps = {
  isActive?: boolean
  size?: "default" | "icon" | "lg" | "sm" // Thêm kiểu kích thước phù hợp
} & React.ComponentProps<"a">

// PaginationLink component
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
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
  ...props
}: PaginationLinkProps) => {
  // Xác định nội dung của preMessage dựa trên ngôn ngữ
  const t = useTranslations()

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{t("action.previousPage")}</span> {/* Điều chỉnh ngôn ngữ */}
    </PaginationLink>
  );
}
PaginationPrevious.displayName = "PaginationPrevious";


// PaginationNext component
const PaginationNext = ({
  className,
  ...props
}: PaginationLinkProps) => {
  const t = useTranslations()

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>{t("action.nextPage")}</span> {/* Điều chỉnh ngôn ngữ */}
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}
PaginationNext.displayName = "PaginationNext";


// PaginationEllipsis component
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  const t = useTranslations()

  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{t("action.morePage")}</span> {/* Điều chỉnh ngôn ngữ */}
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
