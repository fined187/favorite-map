import { currentStoreState, locationState, mapState } from "@/atom";
import { StoreType } from "@/interface";
import { useCallback, useEffect } from "react";
import {  useRecoilValue } from "recoil";

interface MarkerProps {
  store: StoreType;
}

export default function Marker({ store }: MarkerProps) {
  const map = useRecoilValue(mapState);
  
  const loadKakaoMarker = useCallback(() => {
    if (map) {
      //  kakao map marker
      let markerPosition = new window.kakao.maps.LatLng((store?.lat), (store?.lng));
      let imageSrc = store?.category ? `/Image/markers/${store?.category}.png` : `/images/markers/default.png`;
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
      let content = `<div class="infowindow">${store?.name}</div>`;
      let customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        customOverlay.setMap(map);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        customOverlay.setMap(map);
      });
  }}, [map, store]);

  useEffect(() => {
    loadKakaoMarker();
  }, [loadKakaoMarker, map])
  return (
    <></>
  )
}