import { Hint } from "@/components/ui/hint";
import FaceBookSVG from "@/public/svg/facebook";
import InstagramSVG from "@/public/svg/instagram";
import TiktokSVG from "@/public/svg/tiktok";
import YoutubeSVG from "@/public/svg/youtube";
import ZaloSVG from "@/public/svg/zalo";
import Link from "next/link";
const ConnectForme = () => {
  return (
    <>
      <Link href="https://www.facebook.com/nxtnguyenxuantruong">
        <Hint label="Facebook">
          <FaceBookSVG />
        </Hint>
      </Link>

      <Link href="https://www.instagram.com/ngxuanttruong">
        <Hint label="Instagram">
          <InstagramSVG />
        </Hint>
      </Link>

      <Link href="https://www.tiktok.com/@ngxuantruong03">
        <Hint label="Tiktok">
          <TiktokSVG />
        </Hint>
      </Link>

      <Link href="https://zalo.me/0352261103">
        <Hint label="Zalo">
          <ZaloSVG />
        </Hint>
      </Link>

      <Link href="https://www.youtube.com/@nguyenxuantruong03">
        <Hint label="Youtube">
          <YoutubeSVG />
        </Hint>
      </Link>
    </>
  );
};

export default ConnectForme;
