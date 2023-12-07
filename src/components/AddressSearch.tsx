import { StoreType } from "@/interface";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";

interface AddressSearchProps {
  register: UseFormRegister<StoreType>;
  errors: FieldErrors;
  setValue: UseFormSetValue<StoreType>;
}

export default function AddressSearch({
  register,
  errors,
  setValue,
}: AddressSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setValue("address", fullAddress);
    setIsOpen(false);
  };

  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="address"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          주소
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <input
              readOnly
              placeholder="주소를 검색해주세요."
              {...register("address", { required: true })}
              className="col-span-2 block w-full px-2 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-700 hover:bg-blue-500 py-1.5 px-2 rounded text-white"
            >
              주소 검색
            </button>
          </div>
          {errors.address?.type === "required" && (
            <div className="pt-2 text-xs text-red-600">
              필수 입력 항목입니다.
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="border border-gray-300 w-full md:col-span-3 col-span-full rounded-md p-2">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
