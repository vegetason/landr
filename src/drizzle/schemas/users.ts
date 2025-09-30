import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";

export const UserTable=pgTable("Users",{
    id,
    email:varchar().notNull().unique(),
    name:varchar().notNull(),
    username:varchar(),
    imageUrl:varchar().notNull(),
    createdAt,
    updatedAt
})

export const userRelations = relations(UserTable, ({ many }) => {
  return  {jobInfos:many(JobInfoTable)}
 

});