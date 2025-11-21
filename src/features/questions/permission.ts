import { db } from "@/drizzle/db";
import {  JobInfoTable, QuestionsTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { hasPermission } from "@/services/clerk/lib/hasPermission";
import { count, eq } from "drizzle-orm";

export async function canCreateQuestion() {
    return await Promise.any([
        hasPermission("unlimited_questions").then(bool=>bool||Promise.reject()),
        Promise.all([hasPermission("5_questions"),getUserQuestionsCount()]).then(([has,count])=>has&&count<5?true:Promise.reject()),
    ]).catch(()=>false)
}

async function getUserQuestionsCount(){
    const {userId}=await getCurrentUser()
    if(userId==null)return 0
    return getQuestionsCount(userId)
}

async function getQuestionsCount(userId: string) {
    const [{count:c}]=await db
    .select({count:count()})
    .from(QuestionsTable)
    .innerJoin(JobInfoTable,eq(QuestionsTable.jobInfoId,JobInfoTable.id))
    .where(eq(JobInfoTable.userId,userId))
    return c
}