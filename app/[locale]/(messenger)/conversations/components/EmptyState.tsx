"use client"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useTranslations } from "next-intl"

const EmptyState = () => {
  const t = useTranslations()
  const user = useCurrentUser()

  return (
    <div
      className="
        px-4
        py-10
        sm:px-6
        lg:px-8
        h-full
        flex
        justify-center 
        items-center
        "
    >
      <div className="text-center items-center flex flex-col">
        <h3
          className="
        mt-2
        text-2xl
        font-semibold
        text-gray-900
        dark:text-slate-200
        "
        >
          {t("message.selectOrStartChat")}
        </h3>
      </div>
    </div>
  )
}
export default EmptyState
