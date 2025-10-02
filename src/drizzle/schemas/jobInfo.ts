import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { UserTable } from './users';
import { relations } from 'drizzle-orm';
import { QuestionsTable } from './question';
import { InterviewTable } from './interviews';

export const experienceLevels = ['junior', 'mid-level', 'senior'] as const;
export type ExperianceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum(
  'job_infos_experience_levcel',
  experienceLevels
);

export const JobInfoTable = pgTable('job_info', {
  id,
  title: varchar(),
  name: varchar().notNull(),
  experience: experienceLevelEnum().notNull(),
  description: varchar().notNull(),
  userId: varchar()
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt,
  updatedAt,
});

export const jobInfoRelations = relations(JobInfoTable, ({ one, many }) => {
  return {
    user: one(UserTable, {
      fields: [JobInfoTable.userId],
      references: [UserTable.id],
    }),
    questions: many(QuestionsTable),
    interviews: many(InterviewTable),
  };
});
