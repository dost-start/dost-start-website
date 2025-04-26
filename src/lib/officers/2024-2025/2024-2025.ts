import { BatchYear } from "@/types/officerType";
import communications from "./communications";
import marketing from "./marketing";
import technology from "./technology";
import crrd from "./crrd";
import finance from "./finance";
import executive from "./executive";
import events from "./events";
import advisors from "./advisors";

const batch2024_2025: BatchYear = {
  year: "2024-2025",
  departments: [
    executive,
    crrd,
    communications,
    marketing,
    finance,
    events,
    technology,
    advisors,
  ],
};

export default batch2024_2025;
