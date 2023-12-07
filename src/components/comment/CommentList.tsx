// eslint-disable-next-line @next/next/no-img-element

import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface CommentListProps {
  comments?: CommentApiResponse;
}

export default function CommentList({ comments }: CommentListProps) {
  const { status, data:session } = useSession();


  const handleDeleteComment = async (id: number) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);
        if(result.status === 200) {
          toast.success("댓글이 삭제되었습니다.");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="my-10">
        {comments?.data && comments?.data?.length > 0 ? 
          (
            comments?.data?.map((comment) => (
              <div key={comment.id} className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={comment?.user?.image || '/images/markers/default.png'} 
                    width={40}
                    height={40}
                    className="rounded-full bg-gray-100 h-10 w-10"
                    alt="profile image"
                  />
                </div>
                <div className="flex flex-col space-y-1 flex-1">
                  <div>
                    {comment?.user?.name ?? "사용자"} | {comment?.user?.email}
                  </div>
                  <div className="text-black font-medium mt-1 text-base">{comment.body}</div>
                </div>
                <div>
                  {comment?.user?.id === session?.user?.id && (
                    <button
                      type="button"
                      className="underline text-gray-500 hover:text-gray-400"
                      onClick={() => handleDeleteComment(comment?.id)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            ))
          ) 
        : (<div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
            댓글이 없습니다.
          </div>)}
      </div>
  )
}