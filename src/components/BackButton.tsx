"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const parentPath = pathname.split("/").slice(0, -1).join("/") || "/";

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      onClick={() => router.push(parentPath)}
    >
      <ArrowLeft />
    </Button>
  );
}
