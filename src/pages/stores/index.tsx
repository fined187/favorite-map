"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { StoreType } from "@/interface";
import Image from "next/image";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import Loader from "@/components/Loader";
import SearchFilter from "@/components/SearchFilter";
import { useRecoilValue } from "recoil";
import { searchState } from "@/atom";
import StoreList from "@/components/StoreList";

export default function StoreListPage() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const searchValue = useRecoilValue(searchState);

  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
  };

  // const {isLoading, isError, data: stores} = useQuery(`stores-${page}`, async () => {
  //   const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores?page=${page}`);
  //   return data as StoreApiResponse;
  // });

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });
    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
      fetchNextPage();
    }
    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      {/* search filter */}
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType, i: number) => (
                <StoreList store={store} i={i} key={i} />
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      {/* {
        stores?.totalPage && (
          <Pagination totalPage={stores.totalPage} page={page} />
        )
      } */}
      <div className="w-full touch-none h-10 mb-10" ref={ref}></div>
    </div>
  );
}
