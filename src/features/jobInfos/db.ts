import { db } from '@/drizzle/db';
import { JobInfoTable } from '@/drizzle/schema';
import { revalidateJobInfoCache } from './dbCache';
import { eq } from 'drizzle-orm';

export const insertJobInfo = async (
  jobInfo: typeof JobInfoTable.$inferInsert
) => {
  const [newJobInfo] = await db.insert(JobInfoTable).values(jobInfo).returning({
    id: JobInfoTable.id,
    userId: JobInfoTable.userId,
  });
  revalidateJobInfoCache(newJobInfo);
  return newJobInfo;
};

export const updateJobInfoDB = async (
  id: string,
  jobInfo: Partial<typeof JobInfoTable.$inferInsert>
) => {
  const [updatedJobInfo] = await db
    .update(JobInfoTable)
    .set(jobInfo)
    .where(eq(JobInfoTable.id, id))
    .returning({
      id: JobInfoTable.id,
      userId: JobInfoTable.userId,
    });
  revalidateJobInfoCache(updatedJobInfo);
  return updatedJobInfo;
};
