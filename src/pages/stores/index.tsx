import { StoreType } from "@/interface";
import Image from "next/image";

export default function StoreListPage({ stores }: { stores: StoreType[] }) {
  
  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
    {
      stores?.map((store: StoreType, index: number) => (
        <li className="flex justify-between gap-x-6 py-5" key={index}>
          <div className="flex gap-x-4">
            <Image 
              src={store.bizcnd_code_nm ? `/Image/markers/${store.bizcnd_code_nm}.png` : `/Image/markers/default.png`}
              alt="마커 이미지"
              width={48}
              height={48}
            />
            <div>
              <div className="text-sm font-semibold leading-9 text-gray-900">
                {store?.upso_nm}
              </div>
              <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                {store?.upso_nm}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            {store?.rdn_code_nm}
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            {store?.tel_no || "번호 없음"} | {store?.crtfc_gbn_nm} | {store?.bizcnd_code_nm}
          </div>
        </li>
      ))
    }
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`).then((res) => res.json());
  return {
    props: {
      stores,
    },
  };
}