"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import NoResultsStore from "../ui/no-result-store";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole[];
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  // Check if the current role is included in the allowed roles
  if (role === undefined || !allowedRole.includes(role)) {
    return (
      <div className="flex items-center justify-center">
        <NoResultsStore />
      </div>
    );
  }

  return <>{children}</>;
};
