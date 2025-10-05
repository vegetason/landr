'use server';

import z from 'zod';
import { jobInfoFormSchema } from './schema';
import { getCurrentUser } from '@/services/clerk/lib/getCurrentUser';
import { redirect } from 'next/navigation';
import { insertJobInfo, updateJobInfoDB } from './db';
import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { JobInfoTable } from '@/drizzle/schema';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { getJobInfoIdTag } from './dbCache';

export const createJobInfo = async (
  unsafeData: z.infer<typeof jobInfoFormSchema>
) => {
  const { userId } = await getCurrentUser();
  if (userId === null) {
    return {
      error: true,
      message: "You don't have a permission to do this.",
    };
  }

  const { success, data } = jobInfoFormSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: 'Invalid Job data',
    };
  }

  const jobInfo = await insertJobInfo({ ...data, userId });
  redirect(`/app/job-infos/${jobInfo.id}`);
};

export const updateJobInfo = async (
  id: string,
  unsafeData: z.infer<typeof jobInfoFormSchema>
) => {
  const { userId } = await getCurrentUser();
  if (userId === null) {
    return {
      error: true,
      message: "You don't have a permission to do this.",
    };
  }

  const { success, data } = jobInfoFormSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: 'Invalid Job data',
    };
  }
  const existingJobInfo = await getJobInfo(id, userId);

  if (!existingJobInfo) {
    return {
      error: true,
      message: "You don't have a permission to do this.",
    };
  }
  const jobInfo = await updateJobInfoDB(id, data);
  redirect(`/app/job-infos/${jobInfo.id}`);
};

const getJobInfo = async (id: string, userId: string) => {
  'use cache';
  cacheTag(getJobInfoIdTag(id));
  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  });
};
