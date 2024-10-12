import { getBlockedUsers } from "@/lib/stream/block-service";
import { columns } from "./_components/column";
import { DataTable } from "@/components/ui/data-table";

const CommunityPage = async () => {
  const blockedUsers = await getBlockedUsers();
  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageCredential[0].url || block.blocked.image || "",
    nameuser: block.blocked.nameuser,
    createdAt: block.blocker.blocking.find((item) => item)?.createdAt!,
    frameAvatar: block.blocked.frameAvatar,
    role: block.blocked.role,
    isCitizen: block.blocked.isCitizen,
    isLive: block?.blocked?.stream?.isLive
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">List Block Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} searchKey="nameuser" showSelected={false}/>
    </div>
  );
};

export default CommunityPage;

