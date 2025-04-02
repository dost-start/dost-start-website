import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
        <p className="mt-2 text-lg text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button variant={"accent"} size={"lg"} className="mt-4">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
