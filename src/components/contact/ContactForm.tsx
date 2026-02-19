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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email("Invalid email format"),
  purpose: z.string().min(1, "Purpose is required"),
  isPartner: z.boolean(),
  message: z.string().min(1, "Message is required").max(500),
});

export default function ContactForm() {
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Hydration Fix: Ensure component is mounted before rendering browser-specific logic
  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      purpose: "inquiry",
      isPartner: false,
      message: "",
    },
  });

  if (!mounted) return null;

  async function onSubmit(data: MessageType) {
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

  // Common styling for inputs to match the glass theme
  const inputClasses = "bg-foreground/[0.03] border-foreground/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300 placeholder:text-muted-foreground/50";
  const labelClasses = "text-[10px] uppercase font-black tracking-[0.2em] text-primary/70 mb-1.5 ml-1";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-full bg-transparent text-foreground"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Juan Dela Cruz" className={inputClasses} {...field} />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="juan@example.com" className={inputClasses} {...field} />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>Nature of Inquiry</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Select a purpose" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-xl border-foreground/10 rounded-xl">
                    <SelectItem value="inquiry">General Inquiry</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help..."
                  className={cn(inputClasses, "h-[120px] resize-none")}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-4 pt-2">
          <FormField
            control={form.control}
            name="isPartner"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-5 rounded-md border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </FormControl>
                <FormLabel className="text-xs font-medium text-foreground/70 cursor-pointer">
                  I am a START Partner
                </FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="accent"
            disabled={submitting}
            className="rounded-full px-8 h-12 font-bold uppercase tracking-widest border-2 border-white/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.5)] transition-all duration-300"
          >
            {submitting ? "Processing..." : "Submit →"}
          </Button>
        </div>
      </form>
    </Form>
  );
}