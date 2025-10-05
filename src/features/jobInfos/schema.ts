import { z } from 'zod';

export const jobExperienceLevels = ['junior', 'mid-level', 'senior'] as const;
export type JobExperience = (typeof jobExperienceLevels)[number];

export const jobInfoFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  title: z.string().trim().nullable().or(z.literal('')),
  experience: z.enum(jobExperienceLevels, {
    required_error: 'Experience level is required',
  }),
  description: z.string().trim().min(1, 'Description is required'),
});

export type JobInfoFormValues = z.infer<typeof jobInfoFormSchema>;
