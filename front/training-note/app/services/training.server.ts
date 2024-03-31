import prisma from "../lib/prisma";

export async function create(id: string, title: string, level: string, thumbnail: string, play: number) {
   const training = await prisma.training.create({
      data: {
         id : id,
         title: title,
         level: level,
         thumbnail: thumbnail,
         play: play,
      }
   })
   return training.id
}

export async function findAll() {
   return await prisma.training.findMany()
}