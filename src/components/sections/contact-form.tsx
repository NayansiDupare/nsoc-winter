"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { originOf, snowBurst } from "@/lib/confetti";
import { cn } from "@/lib/utils";
import { contactSchema, contactTopics, type ContactInput } from "@/lib/validations/contact";
import { site } from "@/data/site";

function mailtoFor(data: ContactInput) {
  const topic = contactTopics.find((t) => t.value === data.topic)?.label ?? data.topic;
  const subject = `[${site.short}] ${topic} — ${data.name}`;
  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [mailto, setMailto] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const onSubmit = handleSubmit(async (data, event) => {
    try {
      await api.post("/contact", data);
      setMailto(mailtoFor(data));
      reset();
      const submitter = (event?.nativeEvent as SubmitEvent | undefined)?.submitter;
      snowBurst(submitter ? originOf(submitter) : undefined);
      toast.success("Message ready!", {
        description: `Open it in your email app to send it to ${site.email}.`,
      });
    } catch (err) {
      const res = isAxiosError(err) ? err.response?.data : undefined;
      const fieldErrors = res?.fieldErrors as Partial<Record<keyof ContactInput, string[]>> | undefined;
      if (fieldErrors) {
        for (const [field, messages] of Object.entries(fieldErrors)) {
          if (messages?.[0]) setError(field as keyof ContactInput, { message: messages[0] });
        }
      }
      toast.error(res?.error ?? "Something went wrong.", {
        description: `You can also email ${site.email} directly.`,
      });
    }
  });

  if (mailto) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 className="size-12 text-primary" aria-hidden="true" />
        <h3 className="text-2xl font-semibold">Your message is ready.</h3>
        <p className="max-w-md text-muted-foreground">
          This site doesn&apos;t send email itself. Open your email app to send the message to{" "}
          <span className="font-medium text-foreground">{site.email}</span>.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={mailto} className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6")}>
            <Mail data-icon="inline-start" />
            Open email app
          </a>
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-full px-6"
            onClick={() => setMailto(null)}
          >
            Write another
          </Button>
        </div>
      </div>
    );
  }

  const field = "h-11 bg-background/60 text-base md:text-sm";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          autoComplete="name"
          className={field}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={field}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="contact-topic">Topic</Label>
        <select
          id="contact-topic"
          defaultValue=""
          className={cn(
            field,
            "w-full rounded-lg border border-input px-2.5 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive",
          )}
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? "contact-topic-error" : undefined}
          {...register("topic")}
        >
          <option value="" disabled>
            Choose a topic…
          </option>
          {contactTopics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p id="contact-topic-error" className="text-sm text-destructive">
            {errors.topic.message}
          </p>
        )}
      </div>

      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          className="min-h-32 bg-background/60 text-base md:text-sm"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Or email{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{" "}
          directly.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="ice-sweep h-12 rounded-full px-7 text-base"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" data-icon="inline-start" />
          ) : (
            <Send data-icon="inline-start" />
          )}
          {isSubmitting ? "Checking…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
