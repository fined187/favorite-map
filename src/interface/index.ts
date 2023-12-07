import { DateTime } from "next-auth/providers/kakao";

export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
  storeType?: string | null;
  foodCertifyName?: string | null;
  likes?: LikeInterface[];
}

export interface UserType {
  id: number;
  email: string;
  name?: string | null;
  image?: string | null;
}

export interface LikeInterface {
  id: number;
  userId: number;
  storeId: number;
  store?: StoreType;
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface LikeApiResponse {
  data: LikeInterface[];
  totalPage?: number;
  page?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number | null;
}

export interface SearchType {
  q?: string;
  district?: string;
}

export interface CommentInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
  body: string;
  user?: UserType;
  createdAt: Date;
}

export interface CommentApiResponse {
  data: CommentInterface[];
  totalPage?: number;
  page?: number;
}
