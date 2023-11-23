import Map from "@/components/Map";
import Markers from "@/components/Markers";
import * as stores from "@/data/store_data.json";
import {useState} from "react";

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeData = stores["DATA"];
  console.log(currentStore);
  return (
    <>
      <Map setMap={setMap} />
      <Markers storeData={storeData} map={map} setCurrentStore={setCurrentStore} />
    </>
  );
}
