import Link from "next/link";

const NoResultsStore = () => {
  return (
    <section className="bg-white rounded-md">
        <div className=" max-w-7xl mx-auto">
          <div className="flex justify-center p-2">
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
                <h3 className="text-3xl xl:text-8xl font-bold text-slate-900">Something went wrong!</h3>
                <p className="mt-5 text-slate-900">Bạn không có quyền truy cập.</p>
                <Link
                  href="/home-product"
                  className="text-white bg-green-500 px-8 py-4 rounded-full inline-block mt-5"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default NoResultsStore;