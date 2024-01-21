import Link from "next/link";

export default function Services() {
  return (
    <main className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-080 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-600">
            We offer a wide range of web development services to help your
            business grow online.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          <div className="flex flex-col items-center space-y-4">
            <CodeIcon className="h-12 w-12" />
            <h2 className="text-xl font-bold">Web Development</h2>
            <p className="text-gray-800 dark:text-gray-400">
              We build responsive, fast and secure websites that meet your
              business needs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <LayoutIcon className="h-12 w-12" />
            <h2 className="text-xl font-bold">UI/UX Design</h2>
            <p className="text-gray-080 dark:text-gray-400">
              Our design team creates intuitive and engaging designs to enhance
              user experience.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <CloudIcon className="h-12 w-12" />
            <h2 className="text-xl font-bold">Cloud Services</h2>
            <p className="text-gray-080 dark:text-gray-400">
              We provide cloud hosting solutions that are reliable and scalable.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <SmartphoneIcon className="h-12 w-12" />
            <h2 className="text-xl font-bold">Mobile App Development</h2>
            <p className="text-gray-080 dark:text-gray-400">
              We develop mobile applications that run smoothly on both iOS and
              Android platforms.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <HelpCircleIcon className="h-12 w-12" />
            <h2 className="text-xl font-bold">Support & Maintenance</h2>
            <p className="text-gray-080 dark:text-gray-400">
              We offer ongoing support and maintenance services to keep your
              website running smoothly.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <GoalIcon className="h-12 w-12" />
            <h2 className="text-xl font-bold">Digital Strategy</h2>
            <p className="text-gray-080 dark:text-gray-400">
              We help you develop a digital strategy that aligns with your
              business goals.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-10">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/contact"
          >
            Contact Us
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="/portfolio"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}

function CloudIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CodeIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function GoalIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 13V2l8 4-8 4" />
      <path d="M20.55 10.23A9 9 0 1 1 8 4.94" />
      <path d="M8 10a5 5 0 1 0 8.9 2.02" />
    </svg>
  );
}

function HelpCircleIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function LayoutIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="9" x2="9" y1="21" y2="9" />
    </svg>
  );
}

function SmartphoneIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
