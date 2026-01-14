import MaxLayout from "@/components/MaxLayout";
import PageTitle from "@/components/PageTitle";

function EventCardSkeleton() {
  return (
    <div className="rounded-lg border-4 border-black overflow-hidden bg-white animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <MaxLayout>
      <PageTitle text="Events" />
      
      {/* Current Events Skeleton */}
      <div className="px-2 sm:px-10 mb-10">
        <div className="flex items-center mb-4 gap-2">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      </div>

      {/* Upcoming Events Skeleton */}
      <div className="m-2 mt-14 sm:px-10">
        <div className="flex items-center mb-4 gap-2">
          <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>

        {/* Past Events Skeleton */}
        <div className="flex items-center mb-4 gap-2 mt-14">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      </div>
    </MaxLayout>
  );
}
