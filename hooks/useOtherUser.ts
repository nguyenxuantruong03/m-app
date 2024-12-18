import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "@/types/type";

/* Đây là hook React tùy chỉnh có tên `useOtherUser` nhận đối tượng hội thoại thuộc loại
`FullConversationType` hoặc một đối tượng có mảng `user` thuộc loại `User[]`. Nó sử dụng `useSession`
hook từ thư viện `next-auth/react` để lấy email của người dùng hiện tại. Sau đó, nó sử dụng `useMemo`
móc để lọc mảng `người dùng` trong đối tượng hội thoại để tìm người dùng khác trong
hội thoại (tức là người dùng có email không giống với email của người dùng hiện tại). đã lọc
user được trả về là kết quả của hook. */
const useOtherUser = (conversation: FullConversationType | { users: any[] }) => {
  const session = useSession();
  
  const otherUser = useMemo(() => {
      const currentUserEmail = session.data?.user?.email;
  
      const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);
  
      return otherUser[0]
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
