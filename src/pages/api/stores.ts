import { StoreApiResponse, StoreType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<StoreApiResponse | StoreType[]>) {
  const { page = "" } = req.query;
  const prisma = new PrismaClient();
  if (page) {
    const skipPage = parseInt(page as string) - 1;
    const count = await prisma.store.count();
    const stores = await prisma.store.findMany({
      orderBy: {
        id: 'asc',
      },
      take: 10,
      skip: skipPage * 10,
    });
  
    //  totalPage, data, page, totalcount
  
    res.status(200).json({
      page: parseInt(page as string),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
    });
    return res.status(200).json(stores);
  }
}