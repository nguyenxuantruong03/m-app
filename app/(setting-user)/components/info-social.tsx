import { ChevronRight,Github, Linkedin,Facebook, Youtube, Dribbble, Twitter, Instagram, CircleFadingPlus, TrendingUp  } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SheetLinkSocial from "../showsheet/sheet-link-social";
import Link from "next/link";

interface InfoSocialProps {
  user: any;
}

const InfoSocial: React.FC<InfoSocialProps> = ({ user }) => {
  const linkwebsite = user?.linkwebsite
    ? user.linkwebsite
    : "Chưa cập nhật";
  const linkgithub = user?.linkgithub
    ? user.linkgithub
    : "Chưa cập nhật";
  const linklinkedin = user?.linklinkedin
    ? user.linklinkedin
    : "Chưa cập nhật";
  const linkfacebook = user?.linkfacebook
    ? user.linkfacebook
    : "Chưa cập nhật";
  const linkyoutube = user?.linkyoutube
    ? user.linkyoutube
    : "Chưa cập nhật";
  const linktiktok = user?.linktiktok
    ? user.linktiktok
    : "Chưa cập nhật";
  const linkinstagram = user?.linkinstagram
    ? user.linkinstagram
    : "Chưa cập nhật";
  const linktwitter = user?.linktwitter
    ? user.linktwitter
    : "Chưa cập nhật";
  const linkother = user?.linkother
    ? user.linkother
    : "Chưa cập nhật";

    const isSecureLink = (link: string) => {
      return link.startsWith("https://") || link.startsWith("http://");
    };

  const generateLinkElement = (link: string) => {
    if (isSecureLink(link)) {
      return (
        <Link href={link}>
          <span className="text-gray-600 break-all line-clamp-2">{link}</span>
        </Link>
      );
    }
    return <div className="text-gray-600 break-all line-clamp-2">{link}</div>;
  };

  const sosials = [
    {
      name: <span className="flex items-center"><Dribbble className="h-4 w-4 mr-1"/>Trang web cá nhân</span>,
      state: linkwebsite,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "linkwebsite", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><Github className="h-4 w-4 mr-1"/>GitHub</span>,
      state: linkgithub,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "linkgithub", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><Linkedin className="h-4 w-4 mr-1"/>LinkedIn</span>,
      state: linklinkedin,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "linklinkedin", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><Facebook className="h-4 w-4 mr-1"/>FaceBook</span>,
      state: linkfacebook,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "linkfacebook", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><Youtube className="h-4 w-4 mr-1"/>Youtube</span>,
      state: linkyoutube,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "linkyoutube", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><TrendingUp className="h-4 w-4 mr-1"/>Tiktok</span>,
      state: linktiktok,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "linktiktok", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><Instagram className="h-4 w-4 mr-1"/>Instagram</span>,
      state: linkinstagram,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "linkinstagram", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><Twitter className="h-4 w-4 mr-1"/>Twitter</span>,
      state: linktwitter,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "linktwitter", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><CircleFadingPlus className="h-4 w-4 mr-1"/>Other</span>,
      state: linkother,
      key: "linkother", // Add a key to identify the item
    },
  ];

  const wrapWithSheet = (infouser: any, content: React.ReactNode) => {
    if (
      infouser.key === "linkwebsite" ||
      infouser.key === "linkgithub" ||
      infouser.key === "linklinkedin" ||
      infouser.key === "linkfacebook" ||
      infouser.key === "linkyoutube" ||
      infouser.key === "linktiktok" ||
      infouser.key === "linkinstagram" ||
      infouser.key === "linktwitter" ||
      infouser.key === "linkother"
    ) {
      return (
        <SheetLinkSocial
          linkwebsite={linkwebsite}
          linkgithub={user.linkgithub}
          linklinkedin={user.linklinkedin}
          linkfacebook={user.linkfacebook}
          linkyoutube={user.linkyoutube}
          linktiktok={user.linktiktok}
          linkinstagram={user.linkinstagram}
          linktwitter={user.linktwitter}
          linkother={user.linkother}
          type={infouser.key} // Pass the key as type
        >
          {content}
        </SheetLinkSocial>
      );
    }
    return content;
  };

  return (
    <div className="bg-white rounded-md overflow-hidden my-2">
      {sosials.map((sosial) => (
        <div key={sosial.key}>
          {wrapWithSheet(
            sosial,
            <div className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-40">
              <div>
                <div className="flex items-center justify-between px-4 py-2">
                  <div>
                    <div className="font-semibold text-white dark:text-slate-900">
                      {sosial.name}
                    </div>
                    {generateLinkElement(sosial.state)}
                  </div>
                  <div>
                    <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <Separator className="border-[1px] border-gray-400" />
        </div>
      ))}
    </div>
  );
};

export default InfoSocial;
