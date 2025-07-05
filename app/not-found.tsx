const Custom404 = () => {
  return (
    <div className="flex justify-center align-bottom h-screen">
      <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 grid place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="bg-gradient-to-br from-blue-900 to-cyan-600 bg-clip-text md:text-7xl font-bold tracking-tight text-transparent text-6xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-primary dark:text-white sm:text-5xl">
                  Page Not Found - Page Is Coming Soon
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
