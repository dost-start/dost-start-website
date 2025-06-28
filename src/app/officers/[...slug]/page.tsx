import MaxLayout from "@/components/MaxLayout";
import OfficerCard from "@/components/officers/OfficerCard";
import PageTitle from "@/components/PageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import officerBatchYears from "@/lib/officers";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const [year, department] = (await params).slug;

  const batch = officerBatchYears.batchYears.find((b) => b.year === year);
  const dept = batch?.departments.find((d) => d.tabName === department);

  if (!batch || !dept) {
    return {
      title: "Officers - Not Found",
      description:
        "The requested officer batch or department could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `DOST START Officers ${year} - ${dept.name}`;
  const description = `Meet the officers of the ${dept.name} department for batch ${year}. ${dept.description}`;

  const imageUrl = "/officers.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.WEBSITE_DOMAIN_URL}/officers/${year}/${department}`,
      siteName: "DOST START",
      images: [
        {
          url: imageUrl,
          alt: `${dept.name} - Officers ${year}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `${process.env.WEBSITE_DOMAIN_URL}/officers/${year}/${department}`,
    },
  };
}
export async function generateStaticParams() {
  const years = officerBatchYears;

  return years.batchYears.flatMap((year) =>
    year.departments.map((department) => ({
      params: {
        slug: [year.year, department.tabName],
      },
    }))
  );
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const currentBatch = officerBatchYears.batchYears.find(
    (year) => year.year === slug[0]
  );

  if (!currentBatch) {
    return {
      status: 404,
      error: new Error("Batch not found"),
    };
  }

  const currentDepartment = currentBatch.departments.find(
    (department) => department.tabName === slug[1]
  );

  if (!currentDepartment) {
    return redirect(
      `/officers/${slug[0]}/${currentBatch.departments[0].tabName}`
    );
  }

  return (
    <MaxLayout>
      <div className="text-center">
        <PageTitle text="Officers" />
        <div>
          DOST START officers are dedicated individuals who lead and manage
          various departments within the organization. Each officer plays a
          crucial role in ensuring the smooth operation and success of their
          respective departments, contributing to the overall mission of DOST
          START.
        </div>
        <section>
          <Tabs defaultValue={currentDepartment.tabName} className="my-8">
            <div className="flex flex-wrap-reverse gap-2 lg:flex-row items-center justify-between">
              <TabsList className="flex items-center flex-wrap h-auto space-y-2 md:space-y-0 space-x-2 start">
                {currentBatch.departments.map((department) => (
                  <Link
                    key={department.name}
                    href={`/officers/${currentBatch.year}/${department.tabName}`}
                    passHref
                  >
                    <TabsTrigger
                      value={department.tabName}
                      className="hover:cursor-pointer"
                    >
                      {department.tabName}
                    </TabsTrigger>
                  </Link>
                ))}
              </TabsList>
              <Select defaultValue={slug[0]}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {officerBatchYears.batchYears.map((year) => (
                    <SelectItem
                      key={`batch-year-${year.year}`}
                      value={year.year}
                    >
                      {year.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Tabs>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold">{currentDepartment.name}</h2>
            <p className="mt-2">{currentDepartment.description}</p>
          </div>

          {currentDepartment.specialOfficers.length > 0 && (
            <section className="mt-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full max-w-6xl mx-auto place-content-center">
                {currentDepartment.specialOfficers.map((officer) => (
                  <OfficerCard key={officer.name} officer={officer} />
                ))}
              </div>
            </section>
          )}

          <section className="mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full max-w-6xl mx-auto place-content-center">
              {currentDepartment.officers.map((officer) => (
                <OfficerCard key={officer.name} officer={officer} />
              ))}
            </div>
          </section>

          {currentDepartment.subDepartment &&
            currentDepartment.subDepartment.length > 0 && (
              <section className="mt-14">
                {currentDepartment.subDepartment.map((subDept) => (
                  <div key={subDept.name} className="mt-8">
                    <h4 className="text-lg font-semibold text-center">
                      {subDept.name}
                    </h4>
                    <p className="mt-2 text-center">{subDept.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full max-w-6xl mx-auto mt-4 place-content-center">
                      {subDept.officers.map((officer) => (
                        <OfficerCard key={officer.name} officer={officer} />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}
        </section>
      </div>
    </MaxLayout>
  );
}
