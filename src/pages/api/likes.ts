import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401)
  }

  if(req.method === "POST") {
    //  찜하기 로직
    const { storeId }: { storeId: number } = req.body;

    //  Like 데이터가 있는지 확인
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: Number(session?.user?.id)
      }
    });

    //  만약 이미 찜을 했다면, 해당 like 데이터 삭제. 아니라면 like 데이터 생성
    if(like) {
      like = await prisma.like.delete({
        where: {
          id: Number(like.id)
        }
      });
      return res.status(204).json(like);
    } else {
      like = await prisma.like.create({
        data: {
          userId: Number(session.user.id),
          storeId
        }
      });
      return res.status(201).json(like);
    }
  }
};