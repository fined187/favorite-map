import { StoreType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<StoreType[]>) {
  const prisma = new PrismaClient();
  const stores = await prisma.store.findMany({
    orderBy: {
      id: 'desc'
    }
  });

  res.status(200).json(stores);
}