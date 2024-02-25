import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface UserInfoPorps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoPorps) => {
  return (
    <Card>
      <CardHeader className="w-[600px] ">
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rouned-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Id</p>
          <p className="truncate text-cs max-w-[180px] font-mono p-1 bg-slate-100 rouned-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rouned-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-cs max-w-[180px] font-mono p-1 bg-slate-100 rouned-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rouned-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-cs max-w-[180px] font-mono p-1 bg-slate-100 rouned-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rouned-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-cs max-w-[180px] font-mono p-1 bg-slate-100 rouned-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rouned-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Facto Authentication</p>
          <Badge
            variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
          >
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
