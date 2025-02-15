import Image from "next/image";
import Link from "next/link";
import { secondhandcolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";

const Secondhand = () => {
  const t = useTranslations()

  return (
    <div className="grid grid-cols-10  my-4 mx-2 overflow-x-auto gap-x-32 xl:gap-0 xl:overflow-hidden">
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category2/d63dbaaf-03e8-4671-b261-5e8cd8bd493d">
          <span className="text-white font-bold p-2">
            {t("suggest.accessory3.name")}
          </span>
          <div className="-mt-6  ml-2">
            <Image
              width="100"
              height="110"
              className="object-fit"
              src="/images-product/te27.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded_overflow}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/5734c630-37ec-43b4-af57-42089bb6d140">
          <span className="text-white font-bold p-2">
            {t("suggest.accessory3.name2")}
          </span>
          <div className="-mt-2 ml-2">
            <Image
              width="90"
              height="90"
              className="object-fit"
              src="/images-product/thuockeo.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/4f33b78d-a628-48f6-93d8-5eef61c77279">
          <span className="text-white font-bold p-2">
            {t("suggest.accessory3.name3")}
          </span>
          <div className="ml-6">
            <Image
              width="95"
              height="100"
              className="object-fit rounded-sm"
              src="/images-product/bat_xanh.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category10/fd46f2da-a6a2-4f46-890a-7bc951dd1aa4">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {t("suggest.accessory3.name4")} {t("suggest.accessory3.name5")}
            </span>
            <div className="ml-3 -mt-2">
              <Image
                width="85"
                height="70"
                className="object-fit"
                src="/images-product/bong_am_tran_mpe.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/d4f3fe59-8f73-433b-a5b8-0cf44b1c0349">
          <span className="text-white font-bold">
            {t("suggest.accessory3.name6")}
          </span>
          <div className="mr-1 mb-2 ">
            <Image
              width="120"
              height="120"
              className="object-fit"
              src="/images-product/co_le_yeti.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/product7/caudaotudong06a">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {t("suggest.accessory3.name7")} {t("suggest.accessory3.name8")}
            </span>
            <div className="m-1 mr-2 -mt-4">
              <Image
                width="100"
                height="120"
                className="object-fit"
                src="/images-product/cp_sino.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/2753cd9a-f2bd-446c-9abc-bb35a8bbf272">
          <div className="px-2 pt-1">
            <span className="text-white font-bold">
              {t("suggest.accessory3.name9")}
            </span>
          </div>
          <div className=" ml-1">
            <Image
              width="150"
              height="120"
              className="object-fit"
              src="/images-product/may-bom-nuoc.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/product7/mat-3-lo-cam-sino">
          <div className="mx-2">
            <span className="text-white font-bold break-words">
              {t("suggest.accessory3.name10")} {t("suggest.accessory3.name11")}
            </span>
            <div className="ml-4 -mt-4">
              <Image
                width="100"
                height="100"
                className="object-fit"
                src="/images-product/mat_3_lo_sino.png"
                alt="error"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/b4c611e8-3c8f-4d4f-8147-6a5f11cfbd67">
          <span className="text-white font-bold p-2">
            {t("suggest.accessory3.name12")}
          </span>
          <div className="-mt-4">
            <Image
              width="120"
              height="150"
              className="object-fit"
              src="/images-product/que_han.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/264c2a81-611c-433b-93ad-75083529df3e">
          <span className="text-white font-bold p-2">
            {t("suggest.accessory3.name13")}
          </span>
          <div className="-mt-2">
            <Image
              width="150"
              height="100"
              className="object-fit"
              src="/images-product/v_lo.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
      <div className={secondhandcolor.bg_h_w_rounded_special}>
        <Link href="https://vlxdxuantruong.vercel.app/category11/6f7f9c7f-b589-4ece-9a18-87914a05b112">
          <span className="text-white font-bold p-2">
            {t("suggest.accessory3.name14")}
          </span>
          <div className="ml-2 ">
            <Image
              width="150"
              height="150"
              className="object-fit"
              src="/images-product/xe-rua.png"
              alt="error"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Secondhand;
