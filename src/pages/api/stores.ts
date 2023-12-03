import { StoreApiResponse, StoreType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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
  const session = await getServerSession(req, res, authOptions);

  if(req.method === "POST") {
    //  데이터 생성을 처리한다
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };
    const { data } = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, {
      headers,
    });
    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);

  } else if (req.method === "PUT") {
    //  데이터 수정을 처리한다
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };
    const { data } = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, {
      headers,
    });
    const result = await prisma.store.update({
      where: {
        id: parseInt(formData.id),
      },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
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
    } else if (req.method === "DELETE") {
      const { id }: { id?: string } = req.query;
      //  데이터 삭제를 처리한다
      if (id) {
        const result = await prisma.store.delete({
          where: {
            id: parseInt(id as string),
          },
        });
        return res.status(200).json(result);
      }    
    } else {
      const { id }: { id?: string } = req.query;
      const stores = await prisma.store.findMany({
        orderBy: { id: "asc" },
        where: {
          id: id ? parseInt(id) : {},
        },
        include: {
          likes: {
            where: session ? { userId: session.user.id } : {}
          }
        }
      });
      return res.status(200).json(id ? stores[0] : stores);
    }
  }
};