import MaxLayout from "@/components/MaxLayout";

export default function Loading() {
  return (
    <div className="flex flex-col w-full animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative w-full px-4">
        <div className="relative m-auto w-full h-[40vh] md:h-[55vh] rounded-b-3xl md:rounded-b-[5rem] mx-auto bg-gray-200">
          {/* Logo Circle Skeleton */}
          <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-gray-300 rounded-full z-10" />
        </div>

        {/* Title Skeleton */}
        <div className="relative text-center mt-12 md:mt-16 px-4 z-20">
          <div className="h-12 bg-gray-200 rounded w-80 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
        </div>

        {/* Divider Skeleton */}
        <div className="relative z-20 w-full max-w-5xl mx-auto flex justify-center items-center gap-1 md:gap-2 my-12">
          <div className="h-2 bg-gray-200 rounded-full w-[2%]" />
          <div className="h-2 bg-gray-200 rounded-full w-[28%]" />
          <div className="h-2 bg-gray-200 rounded-full w-[36%]" />
          <div className="h-2 bg-gray-200 rounded-full w-[12%]" />
          <div className="h-2 bg-gray-200 rounded-full w-[2%]" />
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-center mt-6 mb-8 md:mb-12">
          <div className="h-14 w-40 bg-gray-200 rounded-lg" />
        </div>
      </section>

      <MaxLayout>
        {/* Events Section Skeleton */}
        <section className="pt-6 md:pt-12 w-full relative mb-24">
          <div className="w-full mx-auto relative">
            <div className="bg-gray-100 w-full h-96 rounded-lg" />
          </div>
        </section>

        {/* Current Events Skeleton */}
        <div className="px-2">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border-4 border-gray-200 overflow-hidden bg-white">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxLayout>
    </div>
  );
}
