import { StoreType } from "@/interface";
import Image from "next/image"
import { useRouter } from "next/router"

interface StoreListProps {
  store?: StoreType;
  i: number;
}

export default function StoreList({ store, i }: StoreListProps) {
  const router = useRouter();
  return (
      <li
        className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50"
        key={i}
        onClick={() => router.push(`stores/${store?.id}`)}
      >
        <div className="flex gap-x-4">
          <Image
            src={
              store?.category
                ? `/Image/markers/${store?.category}.png`
                : `/Image/markers/default.png`
            }
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
          {store?.phone || "번호 없음"} | {store?.foodCertifyName} |{" "}
          {store?.category}
        </div>
      </li>
  )
}