import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface CommentProps {
  storeId: number;
  refetch: () => void;
}

export default function CommentForm({ storeId, refetch }: CommentProps) {
  const { status } = useSession();
  const { register, handleSubmit, formState: { errors }, resetField } = useForm();  

  return (
      <>
        <form onSubmit={handleSubmit(async (data) => {
          const result = await axios.post("/api/comments", {
            ...data,
            storeId,
          });
          console.log(result);
          if (result.status === 200) {
            toast.success("댓글을 작성했습니다.");
            resetField('body');
            refetch?.();
          } else {
            toast.error("다시 시도해주세요.");
          }
        })}
        className="flex flex-col space-y-2"
        >
          <textarea 
            rows={3} 
            className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6" 
            placeholder="댓글을 입력해주세요."
            {...register('body', { required: true })}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm mt-2 rounded-md">작성하기</button>
        </form>
        {errors.body?.type === 'required' && (
          <div className="text-xs text-red-600">필수 입력사항입니다.</div>
        )}
      {/* comment list */}
    </>
  )
}