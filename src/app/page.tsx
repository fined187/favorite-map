import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import CurrentLocationButton from "@/components/CurrentLocationButton";

export default async function Home() {
  const stores: StoreType[] = await getData();
  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
}

async function getData() {
  const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, { cache: "no-store" });
  if(!stores.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return stores.json();
}
