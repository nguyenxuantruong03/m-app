import PostCard from "@/components/post-card";
import { useCurrentUser } from "@/hooks/use-current-user";

interface PostProps {
  self: any;
}
const Post = ({ self }: PostProps) => {
  const user = useCurrentUser();
  // If imageCredentials is an array, take the first image's url
  const imageCredentials = Array.isArray(self?.imageCredential)
    ? self.imageCredential[0]?.url
    : self?.imageCredential || undefined;

  // Use the first image from imageCredential, fallback to self?.image, or use null as a last option
  const avatarImage = self?.image || imageCredentials || null;

  return (
    <>
      <PostCard self={self} avatarImage={avatarImage} user ={user}/>
    </>
  );
};

export default Post;
