import { StoreApiResponse, StoreType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>,
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;
  if(req.method === "POST") {
    //  데이터 생성을 처리한다
    const data = req.body;
    const result = await prisma.store.create({
      data: { ...data },
    });
    return res.status(200).json(result);
  } else {
    //  GET 요청 처리
    if (page) {
      const skipPage = parseInt(page as string) - 1;
      const count = await prisma.store.count();
      const stores = await prisma.store.findMany({
        orderBy: {
          id: "asc",
        },
        where: {
          name: q
            ? {
                contains: q as string,
              }
            : {},
          address: district
            ? {
                contains: district as string,
              }
            : {},
        },
        take: parseInt(limit as string),
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
      const { id }: { id?: string } = req.query;
      const stores = await prisma.store.findMany({
        orderBy: { id: "asc" },
        where: {
          id: id ? parseInt(id) : {},
        },
      });
      return res.status(200).json(id ? stores[0] : stores);
    }
  }
};