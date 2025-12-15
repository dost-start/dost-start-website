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
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {batchYears.map((year) => (
          <SelectItem key={`batch-year-${year.year}`} value={year.year}>
            {year.year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

