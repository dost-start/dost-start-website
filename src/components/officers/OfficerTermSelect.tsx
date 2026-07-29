"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BatchYear } from "@/types/officerType";

interface OfficerTermSelectProps {
  batchYears: BatchYear[];
  currentYear: string;
  currentDepartment: string;
}

export default function OfficerTermSelect({
  batchYears,
  currentYear,
  currentDepartment,
}: OfficerTermSelectProps) {
  const router = useRouter();

  const handleYearChange = (year: string) => {
    // Find the batch year to check if it has the same department
    const newBatch = batchYears.find((b) => b.year === year);
    if (!newBatch) return;

    // If this term has no departments, fall back to the default officers route
    // (prevents crashes when Contentful has a term scaffolded but not populated yet)
    if (!newBatch.departments || newBatch.departments.length === 0) {
      router.push("/officers");
      return;
    }

    // Check if the current department exists in the new batch year
    const hasSameDepartment = newBatch.departments.some(
      (d) => d.tabName === currentDepartment
    );

    if (hasSameDepartment) {
      router.push(`/officers/${year}/${currentDepartment}`);
    } else {
      // Navigate to the first department of the new year
      router.push(`/officers/${year}/${newBatch.departments[0].tabName}`);
    }
  };

  return (
    <Select value={currentYear} onValueChange={handleYearChange}>
      <SelectTrigger
        aria-label="Select officer term"
        className="min-w-[150px]"
      >
        <span className="text-muted-foreground">Term</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {batchYears
          .filter((b) => b.departments && b.departments.length > 0)
          .map((year) => (
          <SelectItem key={`batch-year-${year.year}`} value={year.year}>
            {year.year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

