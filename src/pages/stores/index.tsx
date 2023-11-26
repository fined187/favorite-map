import React, { useCallback, useEffect, useRef } from "react";
import { StoreApiResponse, StoreType } from "@/interface";
import Image from "next/image";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import Loader from "@/components/Loader";

export default function StoreListPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  console.log(pageRef);

  const router = useRouter();
  const { page = '1' }: any = router.query;
  
  // const {isLoading, isError, data: stores} = useQuery(`stores-${page}`, async () => {
  //   const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores?page=${page}`);
  //   return data as StoreApiResponse;
  // });

  const fetchStores = async ({ pageParam = 1}) => {
    const { data } = await axios(`/api/stores?page=` + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
      }
    });
    return data;
  }

  const { data: stores, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage, isError, isLoading } = useInfiniteQuery('stores', fetchStores, {
    getNextPageParam: (lastPage: any) => lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage])
  

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500)
      fetchNextPage();
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage])


  if (isError) {
    return <div className="w-full h-screen mx-auto pt-[30%] text-red-500 font-semibold">다시 시도해주세요</div>;
  }

  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
    {
      isLoading ? <Loading /> :
      stores?.pages?.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((store: StoreType, i: number) => (
            <li className="flex justify-between gap-x-6 py-5" key={i}>
              <div className="flex gap-x-4">
                <Image 
                  src={store.category ? `/Image/markers/${store.category}.png` : `/Image/markers/default.png`}
                  alt="마커 이미지"
                  width={48}
                  height={48}
                />
                <div>
                  <div className="text-sm font-semibold leading-9 text-gray-900">
                    {store?.name}
                  </div>
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {store?.storeType}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                {store?.address}
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                {store?.phone || "번호 없음"} | {store?.foodCertifyName} | {store?.category}
              </div>
            </li>
          ))}
          
        </React.Fragment>
      ))
    }
      </ul>
      {
        (isFetching || hasNextPage || isFetchingNextPage) && (
          <Loader />
        )
      }
      {/* {
        stores?.totalPage && (
          <Pagination totalPage={stores.totalPage} page={page} />
        )
      } */}
      <div className="w-full touch-none h-10 mb-10 bg-red-500" ref={ref} />
    </div>
  );
}