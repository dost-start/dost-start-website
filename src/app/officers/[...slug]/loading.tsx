import MaxLayout from "@/components/MaxLayout";
import PageTitle from "@/components/PageTitle";

function OfficerCardSkeleton() {
  return (
    <div className="rounded-lg border-2 border-gray-200 overflow-hidden bg-white animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="flex justify-center gap-2 mt-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <MaxLayout>
      <div className="text-center px-2 animate-pulse">
        <PageTitle text="Officers" />
        
        {/* Description Skeleton */}
        <div className="space-y-2 max-w-4xl mx-auto mb-8">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        </div>
        
        <section>
          {/* Tabs Skeleton */}
          <div className="my-8">
            <div className="flex flex-wrap-reverse gap-2 lg:flex-row items-center justify-between">
              <div className="flex items-center flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-10 w-24 bg-gray-200 rounded" />
                ))}
              </div>
              <div className="h-10 w-40 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Department Title Skeleton */}
          <div className="mt-4">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto" />
          </div>

          {/* Officers Grid Skeleton */}
          <section className="mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full max-w-6xl mx-auto place-content-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <OfficerCardSkeleton key={i} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </MaxLayout>
  );
}
