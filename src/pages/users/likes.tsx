import Loading from "@/components/Loading";
import StoreList from "@/components/StoreList";
import { LikeApiResponse, LikeInterface } from "@/interface";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";

export default function LikesPage() {
  const router = useRouter();
  const { page = "1"}: any = router.query;
  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=10&page=${page}`);
    return data as LikeApiResponse;
  };

  const { data: likes, isError, isLoading } = useQuery("likes", fetchLikes);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 font-semibold">
        다시 시도해주세요
      </div>
    );
  };

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <h3 className="text-lg font-semibold">찜한 맛집</h3>
      <div className="mt-1 text-gray-500 text-sm">찜한 가게 리스트입니다.</div>
      <ul role="list" className="divide-y divide-gray-100 mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          likes?.data?.map((like: LikeInterface, index: number) => (
            <StoreList store={like.store} i={index} key={index} />
          ))
        )}
      </ul>
      {likes?.totalPage && likes?.totalPage > 0 && (
        <Pagination totalPage={likes.totalPage} page={page} pathname="/users/likes" />
      )}
    </div>
  );
};