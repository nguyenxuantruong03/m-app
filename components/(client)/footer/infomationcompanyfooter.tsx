import Image from "next/image";
import Link from "next/link";
import { InformationCompanyFootercolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";


const InformationCompanyFooter = () => {
  const t = useTranslations()

  return (
    <>
      <div className=" lg:grid-cols-4 hidden lg:grid">
        <div className="grid grid-row-2 space-y-2 my-2">
          <div>
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category/8bcd192e-d45b-49e6-a73e-444a17c09a50"
            >
              {t("footer.infomationFooter.pinConO")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category10/4bf607bb-79d9-4b51-bde2-320c285573e0"
            >
              {t("footer.infomationFooter.bongDienQuang")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category10/1d928b1f-92b7-48f3-b97f-9a3f91d72dad"
            >
              {t("footer.infomationFooter.bongRangDong")}
            </Link>
          </div>
          <div>
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category6/cdde02c2-8716-41d9-bb89-70b5fbebc591"
            >
              {t("footer.infomationFooter.keo2Mat")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category11/f5fcd660-9e3e-48d5-81e5-8a7e1b6e9eb7"
            >
              {t("footer.infomationFooter.luoiXanh")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category11/6f7f9c7f-b589-4ece-9a18-87914a05b112"
            >
              {t("footer.infomationFooter.xeRua")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category11/5734c630-37ec-43b4-af57-42089bb6d140"
            >
              {t("footer.infomationFooter.thuocKeo")}
            </Link>
          </div>
        </div>
        <div className="grid grid-row-2 space-y-2 my-2">
          <div>
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category2/388fcfa8-720d-4ca5-ace8-45370235e6eb"
            >
              {t("footer.infomationFooter.ongBinhMinh")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category1/ca558334-3aa3-4781-854e-46fe1c77bafa"
            >
              {t("footer.infomationFooter.quatTreoSenko")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category2/529ffdfa-fb92-4614-a5d7-20378bc574ff"
            >
              {t("footer.infomationFooter.noi")}
            </Link>
          </div>
          <div>
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category11/408fda97-34c0-4841-b1b3-52f420c7ca4c"
            >
              {t("footer.infomationFooter.sifaThongCong")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category8/5de119d8-c8f1-41e5-aea5-4710b2d65410"
            >
              {t("footer.infomationFooter.sonXitATM")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category11/d4f3fe59-8f73-433b-a5b8-0cf44b1c0349"
            >
              {t("footer.infomationFooter.coLeYeti")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category11/4f33b78d-a628-48f6-93d8-5eef61c77279"
            >
              {t("footer.infomationFooter.batXanh")}
            </Link>
          </div>
        </div>
        <div className="grid grid-row-2 space-y-2 my-2">
          <div>
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category6/a2b88d8e-e8a3-420c-807a-da539755b596"
            >
              {t("footer.infomationFooter.keoApolo")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category3/2dbf507b-329a-40b3-b983-7f2fe565e619"
            >
              {t("footer.infomationFooter.dayDaphaco")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category3/2dbf507b-329a-40b3-b983-7f2fe565e619"
            >
              {t("footer.infomationFooter.dayDaphacoLon")}
            </Link>
          </div>
          <div>
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category3/37e650f8-c1aa-49dc-9c34-22b1c038bbeb"
            >
              {t("footer.infomationFooter.dayDienCadivi")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category1/52d11611-ccd2-4326-bf7f-bd224ebef89d"
            >
              {t("footer.infomationFooter.quatSenko")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category8/792fa51d-31b9-441a-91e7-882bfc47dcdd"
            >
              {t("footer.infomationFooter.sonExpo")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category7/05c33b60-5c52-4837-ba09-f3a2cb2fbf66"
            >
              {t("footer.infomationFooter.oCamSino")}
            </Link>
          </div>
        </div>
        <div className="grid grid-row-2 space-y-2 my-2">
          <div>
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/product7/o-cam-cay-thong"
            >
              {t("footer.infomationFooter.oCamCayThong")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/product7/o-cam-dien-quang-6lo-5m"
            >
              {t("footer.infomationFooter.oCamDienQuang")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category6/ba435297-b802-4ae2-bb2e-11f162ae6d80"
            >
              {t("footer.infomationFooter.keoDanSat")}
            </Link>
          </div>
          <div>
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category8/595f6934-f5d2-49e0-84f0-71c1e6eba2f9"
            >
              {t("footer.infomationFooter.sonBachTuyet")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category6/adbbb745-a63a-4f35-9e76-4201893f8cf8"
            >
              {t("footer.infomationFooter.keoConCho")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category11/f05405cf-ba77-470e-a027-a77a53af2bd4"
            >
              {t("footer.infomationFooter.vLo")}
            </Link>
            -
            <Link
              className="dark:text-slate-200 text-slate-900"
              href="https://vlxdxuantruong.vercel.app/category11/b4c611e8-3c8f-4d4f-8147-6a5f11cfbd67"
            >
              {t("footer.infomationFooter.queHan")}
            </Link>
          </div>
        </div>
      </div>
      <div className={InformationCompanyFootercolor.textflex}>
        {t("footer.store")} VLXD TrườngĐạt - Địa chỉ: 457 Lê Văn Quới, Quân Bình Tân,
        Phường Bình Trị Đông A, Thành phố Hồ Chí Minh, Việt Nam, Điện thoại
        0352261103
      </div>
      <div className="items-center flex justify-center">
        <Link
          href="/"
          className=" mt-1 w-20 h-8 border rounded-sm mb-16 md:mb-0"
        >
          <Image
            width="500"
            height="500"
            className="object-fit"
            src="/images/logoSaleNoti.webp"
            alt="error"
          />
        </Link>
      </div>
    </>
  );
};

export default InformationCompanyFooter;
