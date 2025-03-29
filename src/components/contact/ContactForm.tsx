"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/lib/serverFunctions";
import MessageType from "@/types/messageType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email("Invalid email format"),
  purpose: z.string().min(1, "Purpose is required"),
  message: z.string().min(1, "Message is required").max(500),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      purpose: "",
      message: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (data: MessageType) => {
    submitForm(data);
  };

  async function submitForm(data: MessageType) {
    setSubmitting(true);
    const res = await sendEmail(data);
    setSubmitting(false);
    if (res.success) {
      form.reset();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl mx-auto bg-white text-black p-6 rounded-2xl border-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inquiry">General Inquiry</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your Message"
                  className="h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full md:w-xs"
          variant={"accent"}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
