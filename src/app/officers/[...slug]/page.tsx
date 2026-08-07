import MaxLayout from "@/components/MaxLayout";
import OfficerCard from "@/components/officers/OfficerCard";
import PageTitle from "@/components/PageTitle";
import {
  getAllBatchYears,
  getOfficersByTerm,
  getAllOfficerParams,
} from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import OfficerTermSelect from "@/components/officers/OfficerTermSelect";

// Enable ISR with 1-hour revalidation for better performance
export const revalidate = 3600; // ISR: revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const [year, department] = (await params).slug;

  const batchYear = await getOfficersByTerm(year);
  const dept = batchYear?.departments.find((d) => d.tabName === department);

  if (!batchYear || !dept) {
    return {
      title: "Officers - Not Found",
      description:
        "The requested officer batch or department could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${dept.name} Officers ${year} - DOST START`;
  const description = `Meet the officers of the ${
    dept.name
  } department for batch ${year}. ${
    dept.description ||
    "Leading innovation and collaboration in technology advancement."
  }`;

  const imageUrl = `${process.env.WEBSITE_DOMAIN_URL}/officers.png`;

  return {
    title,
    description,
    keywords: [
      "DOST START officers",
      dept.name,
      `officers ${year}`,
      "DOST-SEI",
      "scholar leaders",
      "tech leadership",
      "Philippines",
    ],
    openGraph: {
      title,
      description,
      url: `${process.env.WEBSITE_DOMAIN_URL}/officers/${year}/${department}`,
      siteName: "DOST START",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${dept.name} - Officers ${year}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${process.env.WEBSITE_DOMAIN_URL}/officers/${year}/${department}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const params = await getAllOfficerParams();

  return params.map(({ year, department }) => ({
    slug: [year, department],
  }));
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Expect exactly [year, department]; anything else is a 404
  if (!slug || slug.length !== 2) {
    notFound();
  }

  // Fetch data from unified data layer
  const [allBatchYears, currentBatch] = await Promise.all([
    getAllBatchYears(),
    getOfficersByTerm(slug[0]),
  ]);

  if (!currentBatch) {
    notFound();
  }

  const currentDepartment = currentBatch.departments.find(
    (department) => department.tabName === slug[1]
  );

  if (!currentDepartment) {
    const fallbackDepartment = currentBatch.departments?.[0]?.tabName;
    if (!fallbackDepartment) {
      return redirect("/officers");
    }
    return redirect(`/officers/${slug[0]}/${fallbackDepartment}`);
  }

  return (
    <MaxLayout>
      <div className="px-2 sm:px-4 md:px-6 mt-15">
        <PageTitle text="Officers" />
        <p className="text-center text-sm md:text-base text-muted-foreground max-w-2xl pr-2 pl-2 mx-auto mt-2">
          DOST START officers are dedicated individuals who lead and manage
          various departments within the organization.
        </p>

        <div className="mt-8 sm:mt-10 max-w-7xl mx-auto px-2 sm:px-4">
          {/* Term selection - scopes the whole page, so it sits above the tabs */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <OfficerTermSelect
              batchYears={allBatchYears.batchYears}
              currentYear={slug[0]}
              currentDepartment={slug[1]}
            />
          </div>

          {/* Department tabs - book page markers, outside the box */}
          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-2">
              {currentBatch.departments.map((dept) => {
                const isActive = dept.tabName === currentDepartment.tabName;
                return (
                  <Link
                    key={dept.name}
                    href={`/officers/${currentBatch.year}/${dept.tabName}`}
                    className={`no-underline block transition-all hover:scale-105 hover:z-10 ${isActive ? "z-10 scale-105" : ""}`}
                  >
                    <span
                      className={`inline-block px-4 py-2 text-sm font-medium rounded-t-[18px] border border-b-0 shadow-sm transition-colors duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-primary/10 dark:bg-primary/15 border-primary/30 dark:border-primary/50 text-foreground hover:bg-primary/20 dark:hover:bg-primary/25"
                      }`}
                    >
                      {dept.tabName}
                    </span>
                  </Link>
                );
              })}
            </div>

          {/* Glass box - light colored, START border radius */}
          <div
            className="start-border-radius w-full px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 border border-primary/20 dark:border-primary/30 shadow-lg bg-card/90 dark:bg-card/80 backdrop-blur-[20px]"
          >
              {/* Department heading */}
              <div className="text-center mb-2 sm:mb-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-orbitron font-semibold text-foreground">
                  {currentDepartment.name}
                </h2>
              </div>

              {/* Description */}
              {currentDepartment.description && (
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto text-center mb-4 sm:mb-5">
                  {currentDepartment.description}
                </p>
              )}

              {/* Officer cards */}
              <div className="mt-5 sm:mt-6 space-y-8 sm:space-y-10">
            {currentDepartment.specialOfficers.length > 0 && (
                <section className="space-y-3">
                  <div className="text-center space-y-1">
                    {/* <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      Lead officers
                    </p> */}
                    {currentDepartment.name !== "Executive Leadership" &&
                      currentDepartment.name !== "Advisors" && (
                        <h3 className="text-base md:text-lg font-semibold pb-8 text-foreground">
                          Chief and Deputies
                        </h3>
                      )}
                  </div>
                  <div
                    className={
                      currentDepartment.specialOfficers.length === 1
                        ? "grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto justify-center justify-items-center"
                        : currentDepartment.specialOfficers.length === 2
                          ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto justify-center justify-items-center"
                          : currentDepartment.specialOfficers.length === 3
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl mx-auto justify-center justify-items-center"
                            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-center justify-items-center"
                    }
                  >
                    {currentDepartment.specialOfficers.map((officer) => (
                      <OfficerCard key={officer.name} officer={officer} />
                    ))}
                  </div>
                </section>
              )}

            {currentDepartment.officers.length > 0 && (
                <section className="space-y-3">
                  <div className="text-center space-y-1">
                    {/* <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      Department officers
                    </p> */}
                    <h3 className="text-base md:text-lg font-semibold pb-8 text-foreground">
                      Committee Members
                    </h3>
                  </div>
                  <div
                    className={
                      currentDepartment.officers.length === 1
                        ? "grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto justify-center justify-items-center"
                        : currentDepartment.officers.length === 2
                          ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto justify-center justify-items-center"
                          : currentDepartment.officers.length === 3
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl mx-auto justify-center justify-items-center"
                            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-center justify-items-center"
                    }
                  >
                    {currentDepartment.officers.map((officer) => (
                      <OfficerCard key={officer.name} officer={officer} />
                    ))}
                  </div>
                </section>
              )}

            {currentDepartment.subDepartment &&
              currentDepartment.subDepartment.length > 0 && (
                <section className="space-y-5 sm:space-y-6">
                  {currentDepartment.subDepartment.map((subDept) => (
                    <div key={subDept.name} className="space-y-3">
                      <div className="space-y-1 text-center">
                        <h4 className="text-base sm:text-lg font-semibold text-foreground">
                          {subDept.name}
                        </h4>
                        {subDept.description && (
                          <p className="text-sm text-muted-foreground">
                            {subDept.description}
                          </p>
                        )}
                      </div>
                      <div
                        className={
                          subDept.officers.length === 1
                            ? "grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto justify-center justify-items-center"
                            : subDept.officers.length === 2
                              ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto justify-center justify-items-center"
                              : subDept.officers.length === 3
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl mx-auto justify-center justify-items-center"
                                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-center justify-items-center"
                        }
                      >
                        {subDept.officers.map((officer) => (
                          <OfficerCard key={officer.name} officer={officer} />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}
              </div>
          </div>
          </div>
        </div>
      </div>
    </MaxLayout>
  );
}
