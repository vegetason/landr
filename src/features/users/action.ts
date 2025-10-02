'use server';

import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { getUserIdTag } from './dbCache';
import { db } from '@/drizzle/db';
import { UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export const getUser = async (id: string) => {
  'use cache';
  cacheTag(getUserIdTag(id));

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
};
