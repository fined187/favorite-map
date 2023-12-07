import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { CommentApiResponse } from "@/interface";
import CommentList from "./CommentList";

interface CommentProps {
  storeId: number;
}

export default function Comment({ storeId }: CommentProps) {
  const router = useRouter();
  const { page = '1' } = router.query;
  const fetchComments = async () => {
    const { data } = await axios(`/api/comments?storeId=${storeId}&limit=10&page=${page}`);
    return data as CommentApiResponse;
  };

  const { status } = useSession();

  const { data: comments, refetch } = useQuery(`comments-${storeId}`, fetchComments)
  return (
    <div className="md:max-w-2xl py-8 px-2 mb-2 mx-auto">
      {status === "authenticated" && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      <CommentList comments={comments} />
    </div>
  )
}