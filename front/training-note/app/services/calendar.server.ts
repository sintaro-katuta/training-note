import prisma from "../lib/prisma";

export async function getWeight(userId: string) {
   const calendar = await prisma.calendar.findFirst({
      where: {
         weight: {
            not: null,
         },
         userId: userId,
      },
      orderBy: {
         createdAt: 'desc',
      },
   });
   if (!calendar) {
      return -1
   }else{
      return calendar?.weight
   }
}

export async function addOrUpdateCalendarEntry(userId: string, date: Date, weight?: number, trainingId?: string) {
   // 日付を yyyy-mm-dd 形式にフォーマット
   const dateString = date.toISOString().split('T')[0];
   // ユーザーIDと日付で既存のエントリを検索
   let calendarEntry = await prisma.calendar.findFirst({
      where: {
         userId: userId,
         createdAt: {
            gte: new Date(dateString),
            lt: new Date(new Date(dateString).getTime() + 24 * 60 * 60 * 1000),
         },
      },
   });

   // 既存のエントリがある場合は更新、ない場合は新規作成
   if (calendarEntry) {
      calendarEntry = await prisma.calendar.update({
         where: { id: calendarEntry.id },
         data: {
         ...(weight && { weight: weight }),
         ...(trainingId && { traingId: trainingId }),
         },
      });
   } else {
      calendarEntry = await prisma.calendar.create({
         data: {
            userId: userId,
            createdAt: new Date(dateString),
            ...(weight && { weight: weight }),
            ...(trainingId && { traingId: trainingId }),
         },
      });
   }
   return calendarEntry;
   }

export async function userCalendar(userId: string) {
   const calendar = await prisma.calendar.findMany({
      where: {
         userId: userId
      },
      orderBy: {
         createdAt: "desc"
      },
      include: {
         training: true
      }
   })
   return calendar
}