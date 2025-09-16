import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1).max(100).optional().or(z.literal("")),
  image: z.string().url().optional().or(z.literal("")),
  phone: z.string().max(50).optional().or(z.literal("")),
  location: z.string().max(200).optional().or(z.literal("")),
  bio: z.string().max(2000).optional().or(z.literal("")),
  profession: z.string().max(200).optional().or(z.literal("")),
  experience: z.string().max(4000).optional().or(z.literal("")),
  education: z.string().max(2000).optional().or(z.literal("")),
  skills: z.array(z.string().min(1).max(100)).max(100).default([]),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
