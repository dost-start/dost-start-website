import MaxLayout from "@/components/MaxLayout";
import OfficerCard from "@/components/officers/OfficerCard";
import PageTitle from "@/components/PageTitle";
import StartDivider from "@/components/StartDivider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <div className="text-center px-2">
        <PageTitle text="Officers" />
        <div>
          DOST START officers are dedicated individuals who lead and manage
          various departments within the organization. Each officer plays a
          crucial role in ensuring the smooth operation and success of their
          respective departments, contributing to the overall mission of DOST
          START.
        </div>
        <section className="mt-10 space-y-10 text-left">
          {/* Top controls: year + department selection */}
          <Tabs defaultValue={currentDepartment.tabName} className="w-full">
            <div className="max-w-5xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Year selector */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Batch year
                </span>
                <OfficerTermSelect
                  batchYears={allBatchYears.batchYears}
                  currentYear={slug[0]}
                  currentDepartment={slug[1]}
                />
              </div>

              {/* Department tabs row */}
              <div className="w-full md:w-auto">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground block mb-1">
                  Departments
                </span>
                <TabsList className="inline-flex flex-wrap items-center justify-start gap-1 rounded-full bg-white px-1 py-1 !border-0 shadow-none">
                  {currentBatch.departments.map((department) => (
                    <Link
                      key={department.name}
                      href={`/officers/${currentBatch.year}/${department.tabName}`}
                      passHref
                      className="no-underline"
                    >
                      <TabsTrigger
                        value={department.tabName}
                        className="px-3 py-1.5 text-xs md:text-sm rounded-full text-foreground hover:text-primary transition-colors data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:font-medium after:!hidden cursor-pointer border-0"
                      >
                        {department.tabName}
                      </TabsTrigger>
                    </Link>
                  ))}
                </TabsList>
              </div>
            </div>
          </Tabs>

          {/* Department heading / description above cards */}
          <div className="space-y-4 text-center mt-4">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-orbitron font-semibold text-foreground">
                {currentDepartment.name}
              </h2>
              <div className="flex items-center justify-center pt-5 gap-2">
                <StartDivider variant="accent" width="170px" />
                <StartDivider variant="accent" width="20px" />
                <StartDivider variant="accent" width="80px" />
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              {currentDepartment.description}
            </p>
          </div>

          {/* Officer cards */}
          <div className="space-y-12">
            {currentDepartment.specialOfficers.length > 0 && (
                <section className="space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      Lead officers
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-foreground">
                      Executive & key positions
                    </h3>
                  </div>
                  <div
                    className={
                      currentDepartment.specialOfficers.length <= 2
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-xl mx-auto place-content-center justify-items-center"
                        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 md:gap-8 w-full max-w-5xl mx-auto place-content-center justify-items-center"
                    }
                  >
                    {currentDepartment.specialOfficers.map((officer) => (
                      <OfficerCard key={officer.name} officer={officer} />
                    ))}
                  </div>
                </section>
              )}

            <section className="space-y-4">
                <div className="text-center space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    Department officers
                  </p>
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    Core team
                  </h3>
                </div>
                <div
                  className={
                    currentDepartment.officers.length <= 2
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-xl mx-auto place-content-center justify-items-center"
                      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 md:gap-8 w-full max-w-5xl mx-auto place-content-center justify-items-center"
                  }
                >
                  {currentDepartment.officers.map((officer) => (
                    <OfficerCard key={officer.name} officer={officer} />
                  ))}
                </div>
              </section>

            {currentDepartment.subDepartment &&
              currentDepartment.subDepartment.length > 0 && (
                <section className="space-y-10">
                  {currentDepartment.subDepartment.map((subDept) => (
                    <div key={subDept.name} className="space-y-4">
                      <div className="space-y-1 text-center">
                        <h4 className="text-lg font-semibold">
                          {subDept.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {subDept.description}
                        </p>
                      </div>
                      <div
                        className={
                          subDept.officers.length <= 2
                            ? "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-xl mx-auto place-content-center justify-items-center"
                            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 md:gap-8 w-full max-w-5xl mx-auto place-content-center justify-items-center"
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
        </section>
      </div>
    </MaxLayout>
  );
}
