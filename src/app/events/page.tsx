import Gallery from "@/components/events/gallery";
import PastEventsSection from "@/components/events/PastEventsSection";
import UpcomingEventsSection from "@/components/events/UpcomingEventsSection";
import PageTitle from "@/components/PageTitle";
import StartDivider from "@/components/StartDivider";
import gallery from "@/lib/events/gallery";

export default function Page() {
  return (
    <div>
      <PageTitle text="Events" />
      <UpcomingEventsSection />

      <section className="m-2 mt-14 sm:px-10">
        <PastEventsSection />

        <div className="mt-14">
          <div className="flex items-center mb-4 gap-2">
            <h2 className="text-4xl font-bold shrink-0 mr-4 my-6">Gallery</h2>
            <StartDivider variant="accent" width="10%" />
            <StartDivider variant="accent" width="20%" />
            <StartDivider variant="accent" width="20%" />
            <StartDivider variant="accent" />
          </div>
          <Gallery images={gallery} />
        </div>
      </section>
    </div>
  );
}
