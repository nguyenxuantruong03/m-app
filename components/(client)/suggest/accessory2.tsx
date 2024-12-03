import Image from "next/image";
import Link from "next/link";
import { computerComponentSmallcolor } from "@/components/(client)/color/color";
import { translateAccessory2 } from "@/translate/translate-client";

interface computerComponentSmallProps {
  languageToUse: string;
}

const computerComponentSmall = ({
  languageToUse,
}: computerComponentSmallProps) => {
  //language
  const accessory2Message = translateAccessory2(languageToUse);
  return (
    <div className="grid grid-cols-10  my-4 mx-2 overflow-x-auto gap-x-32 xl:gap-0 xl:overflow-hidden">
      <div className={computerComponentSmallcolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category2/e9762cb1-1077-43ef-97e9-44d0d20dec83">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessory2Message.name} {accessory2Message.name2}
            </span>
            <div className="ml-2 -mt-2">
              <Image
                width="100"
                height="100"
                className="object-fit"
                src="/images-product/ongluoixanh.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>

      <div
        className={
          computerComponentSmallcolor.bg_height_width_rounded_overflowhidden
        }
      >
        <Link href="https://vlxdxuantruong.vercel.app/category2/388fcfa8-720d-4ca5-ace8-45370235e6eb">
          <div className="px-2 pt-1">
            <span className="text-white font-bold break-words">
              {accessory2Message.name3}
            </span>
          </div>
          <div className="mt-1">
            <Image
              width="120"
              height="100"
              className="object-fit"
              src="/images-product/ongnhuapvc.png"
              alt="error"
            />
          </div>
        </Link>
      </div>

      <div className={computerComponentSmallcolor.bg}>
        <Link href="https://vlxdxuantruong.vercel.app/category/8bcd192e-d45b-49e6-a73e-444a17c09a50">
          <span className="text-white font-bold p-2">
            {accessory2Message.name4}
          </span>
          <div className="ml-4">
            <Image
              width="100"
              height="100"
              className="object-fit"
              src="/images-product/pincono.png"
              alt="error"
            />
          </div>
        </Link>
      </div>

      <div className={computerComponentSmallcolor.bg1}>
        <Link href="https://vlxdxuantruong.vercel.app/category1/52d11611-ccd2-4326-bf7f-bd224ebef89d">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessory2Message.name5} {accessory2Message.name6}
            </span>
            <div className="ml-8">
              <Image
                width="60"
                height="80"
                className="object-fit"
                src="/images-product/quatbansenko.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className={computerComponentSmallcolor.bg2}>
        <Link href="https://vlxdxuantruong.vercel.app/category1/ca558334-3aa3-4781-854e-46fe1c77bafa">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessory2Message.name7} {accessory2Message.name6}
            </span>
            <div className="ml-7">
              <Image
                width="70"
                height="80"
                className="object-fit"
                src="/images-product/quattreosenko.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className={computerComponentSmallcolor.bg3}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/408fda97-34c0-4841-b1b3-52f420c7ca4c">
          <div className="mx-2">
            <span className="text-white font-bold p-2">
              {accessory2Message.name8} {accessory2Message.name9}
            </span>
            <div className="">
              <Image
                width="100"
                height="120"
                className="object-fit"
                src="/images-product/sifa-thongcong.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className={computerComponentSmallcolor.bg4}>
        <Link href="https://vlxdxuantruong.vercel.app/category8/595f6934-f5d2-49e0-84f0-71c1e6eba2f9">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessory2Message.name10} {accessory2Message.name11}
            </span>
            <div className="ml-6 -mt-4">
              <Image
                width="65"
                height="100"
                className="object-fit"
                src="/images-product/sonbachtuyet.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className={computerComponentSmallcolor.bg5}>
        <Link href="https://vlxdxuantruong.vercel.app/category8/792fa51d-31b9-441a-91e7-882bfc47dcdd">
          <span className="text-white font-bold p-2">
            {accessory2Message.name12}
          </span>
          <div className="-mt-3">
            <Image
              width="100"
              height="100"
              className="object-fit"
              src="/images-product/sonexpo.png"
              alt="error"
            />
          </div>
        </Link>
      </div>

      <div className={computerComponentSmallcolor.bg6}>
        <Link href="https://vlxdxuantruong.vercel.app/category8/5de119d8-c8f1-41e5-aea5-4710b2d65410">
          <span className="text-white font-bold p-2">
            {accessory2Message.name13}
          </span>
          <div className="ml-2">
            <Image
              width="100"
              height="120"
              className="object-fit"
              src="/images-product/sonxitatm.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default computerComponentSmall;
