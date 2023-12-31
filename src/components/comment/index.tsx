import axios from "axios";
import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import { useQuery } from "react-query";
import { CommentApiResponse } from "@/interface";
import CommentList from "./CommentList";
import Pagination from "../Pagination";

interface CommentProps {
  storeId: number;
  page?: string ;
}

export default function Comment({ storeId, page }: CommentProps) {
  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?storeId=${storeId}&limit=5&page=${page}`,
    );
    return data as CommentApiResponse;
  };

  const { status } = useSession();

  const { data: comments, refetch } = useQuery(
    `comments-${storeId}-${page}`,
    fetchComments,
  );
  return (
    <div className="md:max-w-2xl py-8 px-2 mb-2 mx-auto">
      {status === "authenticated" && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      <CommentList comments={comments} />
      {/* Pagination */}
      <Pagination
        totalPage={comments?.totalPage}
        page={page as string}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
}
