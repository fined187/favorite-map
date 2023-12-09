'use client';
import { mapState } from '@/atom';
import Kakao from 'next-auth/providers/kakao';
import { useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import FullPageLoader from './FullPageLoader';

export default function CurrentLocationButton() {
  const map = useRecoilValue(mapState);
  const [loading, setLoading] = useState(false);
  const handleCurrentPosition = () => {
    setLoading(true);
    // Geolocation API를 이용해 현재 위치를 받아옵니다.
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          if(currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success('현재 위치로 이동되었습니다.');
          }
          return currentPosition;
        }, 
        () => {
          setLoading(false);
          toast.error('현재 위치를 받아올 수 없습니다.');
        }, 
        options
      );
    }
  };

  return (
    <>
      {loading && (
        <FullPageLoader />
      )}
      <button 
        type="button" 
        className='fixed z-10 p-2 shadow right-10 bottom-20 bg-white rounded-md hover:shadow-lg focus:shadow-lg hover:bg-gray-200' 
        onClick={handleCurrentPosition}
      >
        <MdOutlineMyLocation className="w-5 h-5" />
      </button>
    </>
  );
}