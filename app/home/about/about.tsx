import Image from "next/image";

export default function about() {
  return (
    <>
      <section className="flex items-center py-20 bg-stone-100 font-poppins">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
{/*             <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div className="relative">
                <Image
                  src="https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={500}
                  height={500}
                  className="relative z-40 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded"
                />
                <div className="absolute z-10 hidden w-full h-full bg-accent rounded-bl-[80px] rounded -bottom-6 right-6 lg:block"></div>
              </div> */}
            </div>
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 align-middle">
              <div className="relative">
                <h1 className="absolute -top-20  left-0 text-[20px] lg:text-[100px] font-bold  opacity-5 md:block hidden">
                  About Us
                </h1>
                <h2 className="pl-2 text-3xl font-bold border-l-8 border-accent md:text-5xl ">
                  Welcome to our site
                </h2>
              </div>
              <p className="mt-6 mb-10 text-base leading-7 text-gray-700 ">
                Discover the essence of craftsmanship at BlackBox Designs, where
                passion meets expertise. Our dedicated team of designers and
                developers is committed to elevating your vision. Embrace the
                digital realm with our expert website design services, tailored
                to enhance your online presence, expand your customer reach, and
                create enduring impressions that resonate
              </p>
              <div className="flex items-center space-x-4">
                <a href="/contact" className="px-8 py-3 text-lg font-semibold rounded bg-accent text-secondary hover:bg-primary transition-all duration-300 ease-in-out">
                  Contact Us
                </a>
                <a href="/portfolio" className="px-8 py-3 text-lg font-semibold border rounded border-black hover:border-accent hover:text-accent transition-all duration-300 ease-in-out">
                  Our Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
