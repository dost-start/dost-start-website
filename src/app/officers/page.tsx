import { redirect } from "next/navigation";
import officerBatchYears from "@/lib/officers";

export default function page() {
  return redirect(
    `/officers/${officerBatchYears.batchYears[0].year}/${officerBatchYears.batchYears[0].departments[0].tabName}`
  );
}
