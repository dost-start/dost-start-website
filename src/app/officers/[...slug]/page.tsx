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
import Link from "next/link";
import { redirect } from "next/navigation";

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
    <div className="text-center px-2 max-w-[1400px]">
      <PageTitle text="Officers" />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum quis
        ab itaque accusamus omnis alias consequatur nostrum, ipsum officiis unde
        id rem nesciunt eum iure ipsam veniam, assumenda eligendi!
      </div>
      <section className="mt-8">
        <Tabs defaultValue={currentDepartment.tabName}>
          <div className="flex flex-wrap-reverse gap-2 lg:flex-row items-center justify-between">
            <TabsList className="flex items-center flex-wrap h-auto space-y-2 md:space-y-0 space-x-2 start">
              {currentBatch.departments.map((department) => (
                <TabsTrigger key={department.name} value={department.tabName}>
                  <Link
                    href={`/officers/${currentBatch.year}/${department.tabName}`}
                  >
                    {department.tabName}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
            <Select defaultValue={slug[0]}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {officerBatchYears.batchYears.map((year) => (
                  <SelectItem key={`batch-year-${year.year}`} value={year.year}>
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
      </section>
    </div>
  );
}
