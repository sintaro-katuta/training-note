import prisma from "../lib/prisma"

async function create(weight: number, userId: string): Promise<string>{
   const measure = await prisma.userWeight.create({
      data: {
         weight: weight,
         userId: userId,
      }
   })
   return measure.id
}

async function get(userId: string): Promise<number>{
   const measure = await prisma.userWeight.findFirst({
      where: {
         userId: userId,
      },
      orderBy: {
         createdAt: "desc",
      }
   })
   if (!measure) return -1
   return measure.weight
}

export { create, get }