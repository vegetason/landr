import { db } from '@/drizzle/db';
import { JobInfoTable } from '@/drizzle/schema';
import JobInfoBackLink from '@/features/jobInfos/components/JobInfoBackLink';
import { getJobInfoIdTag } from '@/features/jobInfos/dbCache';
import { getCurrentUser } from '@/services/clerk/lib/getCurrentUser';
import { and, eq } from 'drizzle-orm';
import { Loader2Icon } from 'lucide-react';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';
import { fetchAccessToken } from 'hume';
import { env } from '@/data/env/server';
import { VoiceProvider } from '@humeai/voice-react';
import StartCall from './_StartCall';
import { canCreateInterview } from '@/features/interviews/permission';

export default async function NewInterviewsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  return (
    <div className="container py-4 flex flex-col gap-4 h-screen-header items-start">
      <JobInfoBackLink jobInfoId={jobInfoId} />

      <Suspense
        fallback={<Loader2Icon className="size-24 animate-spin m-auto" />}
      >
        <SuspendedComponent jobInfoId={jobInfoId} />
      </Suspense>
    </div>
  );
}

async function SuspendedComponent({ jobInfoId }: { jobInfoId: string }) {
  const { userId, redirectToSignIn, user } = await getCurrentUser({
    allData: true,
  });
  if (userId === null || user === null) return redirectToSignIn();
  if(!await canCreateInterview())return redirect("/app/upgrade")

  const jobInfo = await getJobInfo(jobInfoId, userId);
  if (jobInfo === null) notFound();
  const accessToken = await fetchAccessToken({
    apiKey: env.HUME_API_KEY,
    secretKey: env.HUME_SECRET_KEY,
  });

  return (
    <VoiceProvider>
      <StartCall
        jobInfo={jobInfo as any}
        user={user as any}
        accessToken={accessToken}
      />
    </VoiceProvider>
  );
}

async function getJobInfo(id: string, userId: string) {
  'use cache';
  cacheTag(getJobInfoIdTag(id));
  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  });
}
