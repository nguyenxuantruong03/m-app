import Image from "next/image";
import Link from "next/link";
import { accessorycolor } from "@/components/(client)/color/color";
import { translateAccessory } from "@/translate/translate-client";

interface AccessoryProps {
  languageToUse: string;
}

const Accessory = ({ languageToUse }: AccessoryProps) => {
  //language
  const accessoryMessage = translateAccessory(languageToUse);
  return (
    <div className="grid grid-cols-10  my-4 mx-2 overflow-x-auto gap-x-32 xl:gap-0 xl:overflow-hidden">
      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/54a3fbce-a305-4857-ae0a-d0e68b3963d6">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name}
          </span>
          <div className="m-4">
            <Image
              width="80"
              height="100"
              className="object-fit"
              src="/images-product/boloncontan.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={`${accessorycolor.bg_height_width_rounded}`}>
        <Link href="https://vlxdxuantruong.vercel.app/category10/4bf607bb-79d9-4b51-bde2-320c285573e0">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessoryMessage.name1} {accessoryMessage.name2}
            </span>
            <div className="mb-2 ml-6">
              <Image
                width="75"
                height="80"
                className="object-fit"
                src="/images-product/bongdienquang.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category2/dc60b612-be53-4418-8e69-1ca10ca1ae53">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name3}
          </span>
          <div className=" mt-4">
            <Image
              width="90"
              height="300"
              className="object-fit"
              src="/images-product/co27.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category4/2ce4d7bb-7d1e-4339-9b86-be231381db2f">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name4}
          </span>
          <div className="mt-1">
            <Image
              width="100"
              height="70"
              className="object-fit"
              src="/images-product/dacatsat.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category3/2dbf507b-329a-40b3-b983-7f2fe565e619">
          <div className="mx-2">
            <span className="text-white font-bold p-2 break-words">
              {accessoryMessage.name5} {accessoryMessage.name6}
            </span>
            <div className="mr-1 mb-2 -mt-4">
              <Image
                width="120"
                height="120"
                className="object-fit"
                src="/images-product/daphaco.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category3/37e650f8-c1aa-49dc-9c34-22b1c038bbeb">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessoryMessage.name5} {accessoryMessage.name7}
            </span>
            <div className="m-2 mr-3">
              <Image
                width="80"
                height="100"
                className="object-fit"
                src="/images-product/daydiencadivi.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category3/2dbf507b-329a-40b3-b983-7f2fe565e619">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessoryMessage.name5} {accessoryMessage.name8}
            </span>
            <div className="m-3 mr-2 ">
              <Image
                width="90"
                height="100"
                className="object-fit"
                src="/images-product/daydiendaphacolon.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category10/1d928b1f-92b7-48f3-b97f-9a3f91d72dad">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessoryMessage.name9} {accessoryMessage.name10}
            </span>
            <div className="-mt-6">
              <Image
                width="120"
                height="80"
                className="object-fit"
                src="/images-product/denrangdong.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category6/cdde02c2-8716-41d9-bb89-70b5fbebc591">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name11}
          </span>
          <div className="mt-2 ">
            <Image
              width="120"
              height="100"
              className="object-fit"
              src="/images-product/keo2mat.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category6/a2b88d8e-e8a3-420c-807a-da539755b596">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name12}
          </span>
          <div className="-mt-2">
            <Image
              width="110"
              height="120"
              className="object-fit"
              src="/images-product/keoapolo.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/1818feeb-1eee-4600-9ebc-6e7b716a4421">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name13}
          </span>
          <div className="ml-1">
            <Image
              width="120"
              height="120"
              className="object-fit"
              src="/images-product/keobepan.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/category6/adbbb745-a63a-4f35-9e76-4201893f8cf8">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name14}
          </span>
          <div className="-ml-2">
            <Image
              width="120"
              height="120"
              className="object-fit"
              src="/images-product/keoconcho.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/category6/ba435297-b802-4ae2-bb2e-11f162ae6d80">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name15}
          </span>
          <div className="-mt-3">
            <Image
              width="170"
              height="150"
              className="object-fit"
              src="/images-product/keodansat.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/category5/f0546dd4-3bb3-4eb0-af62-c9c02a6ccd5f">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessoryMessage.name16} {accessoryMessage.name17}
            </span>
            <div className="-mt-4 ml-6">
              <Image
                width="90"
                height="90"
                className="object-fit"
                src="/images-product/khoaviettiep.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/category2/074d4e14-db22-4df9-9c8c-031c9ce2984a">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name18}
          </span>
          <div className="-mt-2">
            <Image
              width="140"
              height="140"
              className="object-fit"
              src="/images-product/loi27.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/f5fcd660-9e3e-48d5-81e5-8a7e1b6e9eb7">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name19}
          </span>
          <div className="ml-2 mt-2">
            <Image
              width="100"
              height="100"
              className="object-fit"
              src="/images-product/luoixanh.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/336be9e2-2e32-4f11-a35b-8d89893bea01">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name20}
          </span>
          <div className="ml-4">
            <Image
              width="100"
              height="100"
              className="object-fit"
              src="/images-product/molet.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/category2/529ffdfa-fb92-4614-a5d7-20378bc574ff">
          <span className="text-white font-bold p-2">
            {accessoryMessage.name21}
          </span>
          <div className="-mt-3 ml-2">
            <Image
              width="110"
              height="110"
              className="object-fit"
              src="/images-product/noi27.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/product7/o-cam-cay-thong">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {accessoryMessage.name22} {accessoryMessage.name23}
            </span>
            <div className="-mt-3 ml-9">
              <Image
                width="100"
                height="100"
                className="object-fit"
                src="/images-product/ocamcaythong.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={accessorycolor.bg_height_width_rounded_mt}>
        <Link href="https://vlxdxuantruong.vercel.app/product7/o-cam-dien-quang-6lo-5m">
          <div className="mx-2">
            <span className="text-white font-bold p-2">
              {accessoryMessage.name24} {accessoryMessage.name25}
            </span>
            <div className="ml-3">
              <Image
                width="100"
                height="100"
                className="object-fit"
                src="/images-product/ocamdienquang.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Accessory;
