"use client";

import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";

type Officer = {
  name: string;
  role: string;
  image: string;
};

type Department = {
  description: string;
  leadership: Officer[];
  members: Officer[];
};

type Batches = {
  [key: string]: {
    [department: string]: Department;
  };
};

const batches: Batches = {
  "Batch 1": {
    Communication: {
      description: "Eiusmod tempor sit ipsum irure. Deserunt officia velit qui deserunt elit irure Lorem sit occaecat aute enim. Proident eu aliqua deserunt eiusmod exercitation occaecat do labore officia in. Sit do mollit aliqua occaecat minim magna dolore tempor. Aute aliquip sit sunt magna sit reprehenderit qui fugiat veniam duis occaecat consequat eiusmod.",
      leadership: [
        { name: "First Middle Last Name", role: "Chief Communications Officer (CCO)", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Communications Officer (DCCO)", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Communications Officer (DCCO)", image: "/logo-s.png" }
      ],
      members: [
        { name: "First Middle Last Name", role: "Documents and Archiving Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Documents Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Archiving Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Internal Communications Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Data Preservation Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Internal Relations Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "External Communications Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "External Relations Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "External Management Officer", image: "/logo-s.png" },
      ]
    },
    Marketing: {
      description: "Nostrud labore nulla ea ex laboris deserunt duis officia sit. Officia irure do enim ullamco exercitation. Excepteur aliquip ut ipsum magna non esse magna labore aliqua tempor fugiat ad.",
      leadership: [
        { name: "First Middle Last Name", role: "Chief Marketing Officer (CMO)", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Marketing Officer (DCMO)", image: "/logo-s.png" }
      ],
      members: [
        { name: "First Middle Last Name", role: "Creatives Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Graphics Designer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Multimedia Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Photographer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Videographer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Promotions Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Social Media Manager", image: "/logo-s.png" },
      ]
    },
    Technology: {
      description: "Irure ipsum mollit laboris deserunt tempor velit aliquip do anim. Id commodo sit magna velit eiusmod pariatur eu nostrud excepteur. Deserunt consectetur excepteur sint exercitation pariatur culpa labore labore nostrud consequat cupidatat minim. Veniam tempor qui ad ut aliqua ipsum sint velit aliquip exercitation id nostrud veniam. Consequat qui commodo labore amet culpa.",
      leadership: [
        { name: "First Middle Last Name", role: "Chief Technology Officer (CTO)", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Technology Officer (DCTO)", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Technology Officer (DCTO)", image: "/logo-s.png" }
      ],
      members: [
        { name: "First Middle Last Name", role: "Web Development Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Backend Development Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "UI/UX Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Mobile Development Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Systems Architecture Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Cybersecurity Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Data and AI Innovation Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "DevOps Lead", image: "/logo-s.png" },
      ]
    },
    Finance: {
      description: "Voluptate veniam consequat Lorem sit nostrud. Aliqua anim amet elit proident reprehenderit eiusmod consectetur ullamco cillum esse est officia ullamco. Aliquip deserunt proident aute et amet laborum magna elit veniam est consectetur irure proident voluptate. Sunt labore nulla non irure reprehenderit elit ullamco. Adipisicing officia ex exercitation ad reprehenderit consequat in fugiat ea minim laboris nulla.",
      leadership: [
        { name: "First Middle Last Name", role: "Chief Finance Officer (CFO)", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Finance Officer (DCFO)", image: "/logo-s.png" }
      ],
      members: [
        { name: "First Middle Last Name", role: "Budget and Accounting Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Procurement Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Canvasser", image: "/logo-s.png" },
      ]
    },
    Events: {
      description: "Cupidatat labore aliquip dolore deserunt sit velit fugiat dolor incididunt laboris culpa nulla et quis. Aliqua veniam nostrud qui cupidatat fugiat consectetur ullamco reprehenderit voluptate id qui veniam. Labore elit labore anim exercitation dolore.",
      leadership: [
        { name: "First Middle Last Name", role: "Chief Events Officer (CEO)", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Events Officer (DCEVO)", image: "/logo-s.png" }
      ],
      members: [
        { name: "First Middle Last Name", role: "Program Management Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Event Coordinator", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Logistics Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Resource Management Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Technical Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Safety Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Venue Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "AV Technician", image: "/logo-s.png" },
      ]
    },
    "Community Development": {
      description: "Elit enim ipsum aute duis id officia veniam. Deserunt aliqua qui aliquip qui Lorem do sint anim. Aute nulla et laboris elit deserunt consequat sint. Culpa sunt ex deserunt anim. Deserunt eu aliquip minim tempor deserunt qui ea ullamco Lorem consequat. Sunt mollit laborum laboris pariatur culpa consequat culpa ea id ut. Aliqua ad eiusmod culpa consectetur id est commodo irure duis sunt non labore.",
      leadership: [
        { name: "First Middle Last Name", role: "Chief Community Development Officer (CCDO)", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Community Development Officer (PCCO)", image: "/logo-s.png" }
      ],
      members: [
        { name: "First Middle Last Name", role: "Regional Representative", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Member Development Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Onboarding Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Tech Mentorship Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Development Specialist Lead", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Research and Development Lead", image: "/logo-s.png" },
      ]
    }
  }
};

export default function OfficersPage() {
  const [selectedBatch, setSelectedBatch] = useState("Batch 1");
  const officers = batches[selectedBatch] || {};
  const categories = Object.keys(officers);

  return (
    <div className="flex flex-col items-center text-center">
      <PageTitle text="Officers" />
      <p className="font-roboto max-w-[50%] text-center mx-auto mb-6">
        Lorem ipsum dolor sit amet consectetur. Tortor ultrices tristique id at donec id. Molestie est neque ac pharetra diam pulvinar augue. Elementum lectus nibh at lacus. Risus enim vivamus sagittis morbi suscipit. Elit gravida tellus blandit magna mauris cras nunc in. Venenatis ornare gravida eu at dolor a nunc. Mi duis nunc nibh netus eget.
      </p>
      <div className="flex flex-wrap justify-between items-center w-full max-w-4xl mb-4 gap-4">
        <Select onValueChange={setSelectedBatch} value={selectedBatch}>
          <SelectTrigger className="w-32">{selectedBatch}</SelectTrigger>
          <SelectContent>
            {Object.keys(batches).map((batch) => (
              <SelectItem key={batch} value={batch}>{batch}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Tabs defaultValue={categories[0]} className="w-full max-w-4xl">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-2 mx-auto justify-center">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <p className="mb-4">{officers[category]?.description}</p>
            <div className="flex flex-wrap justify-center gap-10 w-full max-w-3xl mx-auto">
              {officers[category]?.leadership?.map((officer, index) => (
                <div key={index} className="text-center p-4 w-[calc(50%-8px)] sm:w-[calc(33.33%-8px)] md:w-[calc(25%-8px)]">
                  <Image src={officer.image} alt={officer.name} width={96} height={96} className="w-24 h-24 mx-auto rounded-full" />
                  <h3 className="font-semibold mt-2">{officer.name}</h3>
                  <p className="text-sm">{officer.role}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-10 w-full max-w-4xl mx-auto">
              {officers[category]?.members?.map((officer, index) => (
                <div key={index} className="text-center p-4 flex-1 min-w-[120px] max-w-[200px]">
                  <Image src={officer.image} alt={officer.name} width={96} height={96} className="w-24 h-24 mx-auto rounded-full" />
                  <h3 className="font-semibold mt-2">{officer.name}</h3>
                  <p className="text-sm">{officer.role}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
