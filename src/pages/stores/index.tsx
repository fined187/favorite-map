import { StoreType } from "@/interface";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";

export default function StoreListPage() {
  const {isLoading, isError, data: stores} = useQuery('stores', async () => {
    const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
    return data as StoreType[];
  });

  if (isError) {
    return <div className="w-full h-screen mx-auto pt-[30%] text-red-500 font-semibold">다시 시도해주세요</div>;
  }

  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
    {
      isLoading ? <Loading /> :
      stores?.map((store: StoreType, index: number) => (
        <li className="flex justify-between gap-x-6 py-5" key={index}>
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
      ))
    }
      </ul>
    </div>
  );
}