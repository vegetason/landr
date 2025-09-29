import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";

export const UserTable=pgTable("Users",{
    id:varchar().primaryKey(),
    email:varchar().notNull().unique(),
    username:varchar().notNull().unique(),
    imageUrl:varchar().notNull(),
    createdAt,
    updatedAt
})