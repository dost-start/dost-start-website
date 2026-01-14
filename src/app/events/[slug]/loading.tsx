import MaxLayout from "@/components/MaxLayout";
import StartDiv from "@/components/StartDiv";

export default function Loading() {
  return (
    <MaxLayout>
      <div className="px-1 mt-8 animate-pulse">
        {/* Back Button Skeleton */}
        <div className="h-10 w-24 bg-gray-200 rounded mb-4" />
        
        {/* Cover Image Skeleton */}
        <StartDiv className="p-0 overflow-hidden border-4 w-full">
          <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] bg-gray-200" />
        </StartDiv>

        {/* Event Details Skeleton */}
        <section className="my-4 flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full">
            {/* Title */}
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
            
            {/* Info Section */}
            <section className="space-y-3 mt-6">
              <div className="flex items-center">
                <div className="h-6 w-6 bg-gray-200 rounded mr-2" />
                <div className="h-5 bg-gray-200 rounded w-48" />
              </div>
              <div className="flex items-center">
                <div className="h-6 w-6 bg-gray-200 rounded mr-2" />
                <div className="h-5 bg-gray-200 rounded w-40" />
              </div>
              <div className="flex items-center">
                <div className="h-6 w-6 bg-gray-200 rounded mr-2" />
                <div className="h-5 bg-gray-200 rounded w-32" />
              </div>
            </section>

            {/* Buttons Skeleton */}
            <section className="mt-6 px-1">
              <div className="space-x-4 flex">
                <div className="h-12 w-32 bg-gray-200 rounded" />
                <div className="h-12 w-24 bg-gray-200 rounded" />
              </div>
            </section>
          </div>
        </section>

        {/* About Section Skeleton */}
        <section className="mt-12">
          <div className="h-7 w-40 bg-gray-200 rounded mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </section>
      </div>
    </MaxLayout>
  );
}
