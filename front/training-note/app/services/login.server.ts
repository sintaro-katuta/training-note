import prisma from "../lib/prisma"

export async function login(email: string): Promise<string> {
   // DBからuserを取得する処理が入る
   const user = await prisma.user.upsert({ 
      where: { email: email },
      update: { updatedAt: new Date() },
      create: {
         email: email,
      }
   })

   return user.id
}