import { useTranslations } from "next-intl";
import Link from "next/link";

const NoResults = () => {
  const t = useTranslations()
  
    return ( 
        <section className="bg-white py-10">
        <div className=" max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="w-full sm:w-10/12 text-center">
              <div
                className="bg-cover bg-center h-40 xl:h-80"
                style={{
                  backgroundImage:
                    'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                }}
              >
              </div>
              <div className="mt-5">
                <h3 className="text-3xl xl:text-8xl font-bold text-slate-900">{t("noResult.noProduct")}</h3>
                <p className="mt-5 text-slate-900">{t("noResult.suggestion")}</p>
                <Link
                  href="/home-product"
                  className="text-white bg-green-500 px-8 py-4 rounded-full inline-block mt-5"
                >
                  {t("noResult.goToHome")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
     );
}

export default NoResults;