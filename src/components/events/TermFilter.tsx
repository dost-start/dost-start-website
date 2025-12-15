"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TermFilterProps {
  terms: { id: string; name: string; isActive: boolean }[];
  currentTerm?: string;
}

export default function TermFilter({ terms, currentTerm }: TermFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Find the active term or use the first one as default
  const activeTerm = terms.find((t) => t.isActive)?.name || terms[0]?.name;
  const selectedTerm = currentTerm || activeTerm;

  const handleTermChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // If selecting the default/active term, remove the param
    if (value === activeTerm) {
      params.delete("term");
    } else {
      params.set("term", value);
    }

    const queryString = params.toString();
    router.push(queryString ? `/events?${queryString}` : "/events");
  };

  return (
    <Select value={selectedTerm} onValueChange={handleTermChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Term" />
      </SelectTrigger>
      <SelectContent>
        {terms.map((term) => (
          <SelectItem key={term.id} value={term.name}>
            {term.name}
            {term.isActive && " (Current)"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

