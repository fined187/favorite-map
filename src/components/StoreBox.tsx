import { StoreType } from "@/interface";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineClose, AiOutlineInfoCircle, AiOutlineCheck, AiOutlineForm, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { currentStoreState } from "@/atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

export default function StoreBox() {
  const router = useRouter();
  const [store, setStore] = useRecoilState(currentStoreState);
  let imageSrc = store?.category ? `/Image/markers/${store?.category}.png` : `/images/markers/default.png`;
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={imageSrc}
                  width={100}
                  height={100}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="font-semibold">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => {
                setStore(null);
              }}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <HiOutlineMapPin />
              {store?.address}
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.phone || "번호 없음"}
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store?.storeType}
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <AiOutlineCheck />
              {store?.category}
            </div>
          </div>
          <button type="button" onClick={() => router.push(`/stores/${store.id}`)} className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-lg">
            상세보기
          </button>
        </>
      )}
    </div>
  )
}