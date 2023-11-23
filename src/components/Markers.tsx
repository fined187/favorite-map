import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface MarkerProps {
  map: any;
  storeData: any[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({ map, storeData, setCurrentStore }: MarkerProps) {

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      //  kakao map marker
      storeData?.map((store: any) => {
      
      let markerPosition = new window.kakao.maps.LatLng((store?.y_dnts), (store?.x_cnts));
      let imageSrc = store.bizcnd_code_nm ? `/images/markers/${store.bizcnd_code_nm}.png` : `/images/markers/default.png`;
      let imageSize = new window.kakao.maps.Size(40, 40);
      let imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      let markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);

      //  kakao map info window
      let content = `<div class="infowindow">${store?.upso_nm}</div>`;
      let customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      window.kakao.maps.event.addListener(
        marker,
        "mouseover",
        function () {
          customOverlay.setMap(map);
        }
      );
      window.kakao.maps.event.addListener(
        marker,
        "mouseout",
        function () {
          customOverlay.setMap(null);
        }
      );

      window.kakao.maps.event.addListener(marker, "click", function () {
        setCurrentStore(store);
        
      });
      })
    }
  }, [map, storeData, setCurrentStore])

  useEffect(() => {
    loadKakaoMarkers();
  }, [map])
  return (
    <>
    
    </>
  )
}