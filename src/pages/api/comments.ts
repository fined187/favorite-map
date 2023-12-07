import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";
import { CommentInterface, CommentApiResponse } from "@/interface";

interface ResponseType {
  id?: string;
  page?: string;
  limit?: string;
  storeId?: string;
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<CommentInterface | CommentApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  const { id="", page = "1", limit = "10", storeId = ""}: ResponseType = req.query;
  
  if(req.method === "POST") {
    if (!session?.user) {
      return res.status(401);
    }

    const { storeId, body }: { storeId: number; body: string } = req.body;
    const comment = await prisma.comment.create({
      data: {
        storeId: Number(storeId),
        userId: Number(session?.user?.id),
        body
      }
    })
    return res.status(200).json(comment);
  } else if (req.method === "DELETE") {
    if (!session?.user || !id) {
      return res.status(401);
    }
    const result = await prisma.comment.delete({
      where: {
        id: parseInt(id)
      }
    });
    return res.status(200).json(result);
  } else {
    const skipPage = parseInt(page) - 1;
    const count = await prisma.comment.count({
      where: {
        storeId: storeId ? parseInt(storeId) : {}
      }
    });
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        storeId: storeId ? parseInt(storeId) : {}
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
      }
    });

    return res.status(200).json({
      data: comments,
      totalPage: Math.ceil(count / parseInt(limit)),
      page: parseInt(page)
    });
  }
}