import { redirect } from "next/navigation";
import { getDefaultOfficerPath } from "@/lib/data";

export default async function page() {
  const defaultPath = await getDefaultOfficerPath();
  return redirect(defaultPath);
}
