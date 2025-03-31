import Gallery from "@/components/events/gallery";
import PastEventsSection from "@/components/events/PastEventsSection";
import UpcomingEventsSection from "@/components/events/UpcomingEventsSection";
import PageTitle from "@/components/PageTitle";

export default function Page() {
  return (
    <div>
      <PageTitle text="Events" />
      <UpcomingEventsSection />

      <section className="m-2 mt-14 sm:px-10">
        <PastEventsSection />

        <Gallery className="mt-14" />
      </section>
    </div>
  );
}
