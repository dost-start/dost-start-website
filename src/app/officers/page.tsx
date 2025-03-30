import PageTitle from "@/components/PageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="text-center px-2 max-w-[1400px]">
      <PageTitle text="Officers" />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum quis
        ab itaque accusamus omnis alias consequatur nostrum, ipsum officiis unde
        id rem nesciunt eum iure ipsam veniam, assumenda eligendi!
      </div>
      <section className="mt-12 ">
        <Tabs defaultValue="executive">
          <div className="flex flex-wrap-reverse gap-2 lg:flex-row items-center justify-between">
            <TabsList className="flex items-center flex-wrap h-auto space-y-2 md:space-y-0 space-x-2 start">
              <TabsTrigger value="executive">Executive</TabsTrigger>
              <TabsTrigger value="crrd">Community Relations</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="Technology">Technology</TabsTrigger>
            </TabsList>
            <Select defaultValue="2024-2025">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="2024-2025" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="executive">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="crrd">Change your password here.</TabsContent>
          <TabsContent value="events">
            View your account details here.
          </TabsContent>
          <TabsContent value="communications">
            View your account details here.
          </TabsContent>
          <TabsContent value="finance">
            View your account details here.
          </TabsContent>
          <TabsContent value="marketing">
            View your account details here.
          </TabsContent>
          <TabsContent value="Technology">
            View your account details here.
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
