import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { relations } from 'drizzle-orm';
import { JobInfoTable } from './jobInfo';

export const questionDifficulties = ['easy', 'medium', 'hard'] as const;
export type QuestionDifficulty = (typeof questionDifficulties)[number];
export const QuestionDifficultyEnum = pgEnum(
  'questions_question_difficulty',
  questionDifficulties
);

export const QuestionsTable = pgTable('questions', {
  id,
  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: 'cascade' })
    .notNull(),
  text: varchar().notNull(),
  difficulty: QuestionDifficultyEnum().notNull(),
  createdAt,
  updatedAt,
});

export const questionsRelations = relations(QuestionsTable, ({ one }) => {
  return {
    jobInfo: one(JobInfoTable, {
      fields: [QuestionsTable.jobInfoId],
      references: [JobInfoTable.id],
    }),
  };
});
