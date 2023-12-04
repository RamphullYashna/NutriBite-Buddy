import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
const prisma = new PrismaClient()
export const productRouter = createTRPCRouter({


  create: protectedProcedure
    .input(z.object({ name: z.string(), type: z.string(), price: z.number() }))
    .mutation(async ({ input: { name, price, type }, ctx }) => {
      const product = await prisma.products.create({
        data: {
          name: name,
          price: price,
          type: type
        }
      });
      return product;
    }),
  updateById: protectedProcedure
    .input(z.object({ name: z.string(), type: z.string(), price: z.number(), id: z.string() }))
    .mutation(async ({ input: { name, price, type, id }, ctx }) => {
      const product = await prisma.products.update({
        where: { id: id },
        data: {
          name: name,
          price: price,
          type: type
        }
      });
      return product;
    }),
  getProducts: protectedProcedure.input(z.object({ id: z.string() }))
    .query(async ({ }) => {
      return prisma.products.findMany({});
    }),

  deleteByid: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input: { id } }) => {
    return prisma.products.delete({ where: { id: id } })

  })
});
