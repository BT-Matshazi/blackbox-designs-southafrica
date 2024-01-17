import servicesData from "./data";

export default function services() {
  return (
    <>
      <div className="flex items-center flex-col justify-center py-10 md:py-20">
        <div className="relative">
          <h2 className="absolute -top-20  left-0 text-[10px] lg:text-[70px] font-bold  opacity-5 md:block hidden">
            Services
          </h2>
          <h3 className="pl-2 text-3xl font-bold border-l-8 border-accent md:text-5xl ">
            What We DO
          </h3>
        </div>
        <div className="flex items-center justify-center py-10">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            {servicesData.map((service) => {
              return (
                <div
                  key={service.id}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                  <div className="flex flex-col items-center pb-10 my-2">
                    {service.icon}
                    <h3 className="mb-1 text-xl font-medium text-gray-900 ">
                      {service.title}
                    </h3>
                    <span className="text-sm text-gray-500 mx-6 text-center">
                      {service.description}
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <a
                        href={service.enquire}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-accent_hover focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Enquire
                      </a>
                      {/* <a
                        href={service.readMore}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                      >
                        Read More
                      </a> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}
