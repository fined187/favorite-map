import { AiOutlineSearch } from "react-icons/ai"
import { DISTRICT_ARR } from "@/data/store"
import { useRecoilState } from "recoil"
import { searchState } from "@/atom"

export default function SearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <div className="flex flex-col md:flex-row gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2">
        <AiOutlineSearch className="w-6 h-6" />
        <input type="search" placeholder="음식점 검색" className="block w-full p-3 text-gray-800 border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500 focus:border-3" 
          onChange={(e) => setSearch({ ...search, q: e.target.value})}
        />
      </div>
      <select className="bg-gray-50 border border-gray-300 text-gray-800 outline-none text-sm md:max-w-[200px] rounded-lg focus:border-blue--500 block w-full p-3"
        onChange={(e) => setSearch({ ...search, district: e.target.value})}
      >
        <option value="">지역 선택</option>
        {DISTRICT_ARR.map((data) => (
          <option key={data} value={data}>{data}</option>
        ))}
      </select>
    </div>
  )
}