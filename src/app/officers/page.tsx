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
        { name: "First Middle Last Name", role: "Chief Communications Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Communications Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Communications Officer", image: "/logo-s.png" }
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
        { name: "First Middle Last Name", role: "Chief Marketing Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Marketing Officer", image: "/logo-s.png" }
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
        { name: "First Middle Last Name", role: "Chief Technology Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Technology Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Technology Officer", image: "/logo-s.png" }
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
        { name: "First Middle Last Name", role: "Chief Finance Officerd", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Finance Officer", image: "/logo-s.png" }
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
        { name: "First Middle Last Name", role: "Chief Events Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Events Officer", image: "/logo-s.png" }
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
        { name: "First Middle Last Name", role: "Chief Community Development Officer", image: "/logo-s.png" },
        { name: "First Middle Last Name", role: "Deputy Chief Community Development Officer", image: "/logo-s.png" }
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
  },
  "Batch 2": {
    Communication: {
      description: "Eiusmod tempor sit ipsum irure. Deserunt officia velit qui deserunt elit irure Lorem sit occaecat aute enim. Proident eu aliqua deserunt eiusmod exercitation occaecat do labore officia in. Sit do mollit aliqua occaecat minim magna dolore tempor. Aute aliquip sit sunt magna sit reprehenderit qui fugiat veniam duis occaecat consequat eiusmod.",
      leadership: [
        { name: "Complete Legal Name", role: "Chief Communications Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Communications Officer", image: "/logo-s.png" }
      ],
      members: [
        { name: "Complete Legal Name", role: "Documents and Archiving Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Documents Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Archiving Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Internal Communications Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Data Preservation Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Internal Relations Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "External Communications Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "External Relations Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "External Management Officer", image: "/logo-s.png" },
      ]
    },
    Marketing: {
      description: "Nostrud labore nulla ea ex laboris deserunt duis officia sit. Officia irure do enim ullamco exercitation. Excepteur aliquip ut ipsum magna non esse magna labore aliqua tempor fugiat ad.",
      leadership: [
        { name: "Complete Legal Name", role: "Chief Marketing Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Marketing Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Marketing Officer", image: "/logo-s.png" }
      ],
      members: [
        { name: "Complete Legal Name", role: "Creatives Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Graphics Designer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Multimedia Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Photographer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Videographer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Promotions Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Social Media Manager", image: "/logo-s.png" },
      ]
    },
    Technology: {
      description: "Irure ipsum mollit laboris deserunt tempor velit aliquip do anim. Id commodo sit magna velit eiusmod pariatur eu nostrud excepteur. Deserunt consectetur excepteur sint exercitation pariatur culpa labore labore nostrud consequat cupidatat minim. Veniam tempor qui ad ut aliqua ipsum sint velit aliquip exercitation id nostrud veniam. Consequat qui commodo labore amet culpa.",
      leadership: [
        { name: "Complete Legal Name", role: "Chief Technology Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Technology Officer", image: "/logo-s.png" }
      ],
      members: [
        { name: "Complete Legal Name", role: "Web Development Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Backend Development Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "UI/UX Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Mobile Development Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Systems Architecture Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Cybersecurity Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Data and AI Innovation Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "DevOps Lead", image: "/logo-s.png" },
      ]
    },
    Finance: {
      description: "Voluptate veniam consequat Lorem sit nostrud. Aliqua anim amet elit proident reprehenderit eiusmod consectetur ullamco cillum esse est officia ullamco. Aliquip deserunt proident aute et amet laborum magna elit veniam est consectetur irure proident voluptate. Sunt labore nulla non irure reprehenderit elit ullamco. Adipisicing officia ex exercitation ad reprehenderit consequat in fugiat ea minim laboris nulla.",
      leadership: [
        { name: "Complete Legal Name", role: "Chief Finance Officerd", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Finance Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Finance Officer", image: "/logo-s.png" }
      ],
      members: [
        { name: "Complete Legal Name", role: "Budget and Accounting Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Procurement Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Canvasser", image: "/logo-s.png" },
      ]
    },
    Events: {
      description: "Cupidatat labore aliquip dolore deserunt sit velit fugiat dolor incididunt laboris culpa nulla et quis. Aliqua veniam nostrud qui cupidatat fugiat consectetur ullamco reprehenderit voluptate id qui veniam. Labore elit labore anim exercitation dolore.",
      leadership: [
        { name: "Complete Legal Name", role: "Chief Events Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Events Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Events Officer", image: "/logo-s.png" }
      ],
      members: [
        { name: "Complete Legal Name", role: "Program Management Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Event Coordinator", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Logistics Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Resource Management Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Technical Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Safety Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Venue Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "AV Technician", image: "/logo-s.png" },
      ]
    },
    "Community Development": {
      description: "Elit enim ipsum aute duis id officia veniam. Deserunt aliqua qui aliquip qui Lorem do sint anim. Aute nulla et laboris elit deserunt consequat sint. Culpa sunt ex deserunt anim. Deserunt eu aliquip minim tempor deserunt qui ea ullamco Lorem consequat. Sunt mollit laborum laboris pariatur culpa consequat culpa ea id ut. Aliqua ad eiusmod culpa consectetur id est commodo irure duis sunt non labore.",
      leadership: [
        { name: "Complete Legal Name", role: "Chief Community Development Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Community Development Officer", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Deputy Chief Community Development Officer", image: "/logo-s.png" }
      ],
      members: [
        { name: "Complete Legal Name", role: "Regional Representative", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Member Development Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Onboarding Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Tech Mentorship Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Development Specialist Lead", image: "/logo-s.png" },
        { name: "Complete Legal Name", role: "Research and Development Lead", image: "/logo-s.png" },
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
      <p className="max-w-[50%] text-center mx-auto mb-6">
        Nisi veniam ut magna id dolor commodo proident culpa fugiat culpa anim ex ullamco ipsum. Nostrud amet laborum enim labore sint. Aute mollit reprehenderit voluptate commodo excepteur amet ad quis amet in amet esse consequat. Laborum veniam cupidatat excepteur proident cupidatat ea adipisicing sit quis exercitation qui esse dolore amet. Est aute occaecat sit officia proident. Sint cillum ea minim in nisi nostrud cupidatat. Sint aliquip amet eiusmod ullamco ea eu dolor nisi ullamco in dolore ut.
      </p>

      <Tabs defaultValue={categories[0] || ""} className="w-full max-w-5xl">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.length > 0 ? (
          categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="grid grid-cols-3 items-center text-center w-full pb-4">
                <div></div>
                <h2 className="text-xl font-bold">{category}</h2>
                <Select onValueChange={setSelectedBatch} value={selectedBatch}>
                  <SelectTrigger className="w-auto justify-self-end">{selectedBatch}</SelectTrigger>
                  <SelectContent>
                    {Object.keys(batches).map((batch) => (
                      <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="mb-4">{officers[category]?.description || "No description available."}</p>
              
              {officers[category]?.leadership?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-10 w-full max-w-5xl mx-auto mb-8">
                  {officers[category].leadership.map((officer, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col items-center p-6 w-[200px]"
                    >
                      <Image
                        src={officer.image}
                        alt={officer.name}
                        width={128}
                        height={128}
                        className="w-32 h-32 mx-auto rounded-full"
                      />
                      <h3 className="font-semibold mt-3 text-lg">{officer.name}</h3>
                      <p className="text-md">{officer.role}</p>
                    </div>
                  ))}
                </div>
              )}

              {officers[category]?.members?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-10 w-full max-w-5xl mx-auto">
                  {officers[category].members.map((officer, index) => (
                    <div key={index} className="text-center p-6 flex flex-col items-center w-[200px]">
                      <Image
                        src={officer.image}
                        alt={officer.name}
                        width={128}
                        height={128}
                        className="w-32 h-32 mx-auto rounded-full"
                      />
                      <h3 className="font-semibold mt-3 text-lg">{officer.name}</h3>
                      <p className="text-sm">{officer.role}</p>
                    </div>
                  ))}
                </div>
              )}

            </TabsContent>
          ))
        ) : (
          <p className="mt-4 text-gray-500">No officers available for this batch.</p>
        )}
      </Tabs>
    </div>
  );
}
