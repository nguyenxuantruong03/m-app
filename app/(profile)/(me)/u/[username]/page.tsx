import { getUserByUsername } from "@/lib/user-service";

import { AboutUser } from "./_components/about-user";
import IntroductionUser from "./_components/introduction-user";
import ArticleUser from "./_components/article-user";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const self = await getUserByUsername(params.username);

  return (
    <>
      <AboutUser self={self} />
      <div className="flex flex-col lg:flex-row mt-5 space-x-2">
        <div className="lg:w-[490px] w-full">
          <IntroductionUser self={self}/>
        </div>
        <div className="lg:flex-1 w-full">
          <ArticleUser  self={self}/>
        </div>
      </div>
    </>
  );
};

export default UserPage;
