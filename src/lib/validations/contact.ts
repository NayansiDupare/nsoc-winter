import { z } from "zod";

export const contactTopics = [
  { value: "contributor", label: "Contributing" },
  { value: "project-kernel", label: "Bringing a project" },
  { value: "campus-ambassador", label: "Campus ambassador" },
  { value: "sponsorship", label: "Sponsorship / partnership" },
  { value: "general", label: "Something else" },
] as const;

type TopicValue = (typeof contactTopics)[number]["value"];
const topicValues = contactTopics.map((t) => t.value) as [TopicValue, ...TopicValue[]];

// Shared by the client form and the /api/contact route handler.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.email("Please enter a valid email.").max(120, "Email is too long."),
  topic: z.enum(topicValues, "Please pick a topic."),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(2000, "Message is too long (2000 characters max)."),
  // Honeypot: real users never see or fill this.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
