import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from "@/data/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function StoreNewPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  return (
    <form className="px-4 md:max-w-4xl mx-auto py-8" onSubmit={handleSubmit(async (data) => {
      console.log(data);
      try {
        const result = await axios.post("/api/stores", data);
        console.log(result);

        if (result.status === 200) {
          //  success
          toast.success("데이터가 생성되었습니다.");
          router.replace(`/stores/${result?.data?.id}`);
        } else {
          // fail
          toast.error("데이터 생성 중 문제가 생겼습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.log(error);
        toast.error("데이터 생성 중 문제가 생겼습니다. 다시 시도해주세요.");
      }
    })}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            맛집 등록
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            아래 내용을 입력해서 맛집을 등록해주세요.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                가게명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력 항목입니다.
                  </div>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                카테고리
              </label>
              <div className="mt-2">
                <select
                  {...register("category", { required: true })}
                  className="block w-full rounded-md px-2 outline-none border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">
                    카테고리 선택
                  </option>
                  {CATEGORY_ARR?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력 항목입니다.
                  </div>
                )}
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                연락처
              </label>
              <div className="mt-2">
                <input
                  {...register("phone", { required: true })}
                  className="block w-full outline-none px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.phone?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력 항목입니다.
                  </div>
                )}
            </div>
            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                주소 (다음 주소 검색 API)
              </label>
              <div className="mt-2">
                <input
                  {...register("address", { required: true })}
                  className="block w-full px-2 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.address?.type === 'required' && (
                <div className="pt-2 text-xs text-red-600">
                  필수 입력 항목입니다.
                </div>
              )}
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="foodCertifyName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                식품인증구분
              </label>
              <div className="mt-2">
                <select
                  {...register("foodCertifyName", { required: true })}
                  className="block w-full rounded-md border-0 py-2.5 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">식품인증구분 선택</option>
                  {FOOD_CERTIFY_ARR?.map((certify: any) => (
                    <option key={certify} value={certify}>
                      {certify}
                    </option>
                  ))}
                </select>
                {errors.address?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력 항목입니다.
                  </div>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="storeType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                업종구분
              </label>
              <div className="mt-2">
                <select
                  {...register("storeType", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">업종구분 선택</option>
                  {STORE_TYPE_ARR?.map((type: any) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.address?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력 항목입니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          제출하기
        </button>
      </div>
    </form>
  );
}
