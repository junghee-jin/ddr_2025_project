import React, { useRef, useEffect, useState } from "react";
import './RecoveryMap.css';

const { kakao } = window;

const RecoveryMap = () => {
  const [map, setMap] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState(null);
  const infowindowRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {

    if(document.getElementById('kakao-map-script')) return;

    const script = document.createElement('script')
    script.id = 'kakao-map-script';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    }
}, [])

    
useEffect(() => {

  console.log("navigator.geolocation:", navigator.geolocation);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log("위치 가져오기 성공", pos);
      setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    },
    (err) => {
      console.error("위치 가져오기 실패", err);
      alert("내 위치를 가져올 수 없습니다. 기본 위치로 설정합니다.");
      setLocation({ latitude: 37.5665, longitude: 126.978 });
    }
  );
}, []);


  // 1. 현재 위치 가져오기
  useEffect(() => {
    const successHandler = (response) => {
      const { latitude, longitude } = response.coords;
      setLocation({ latitude, longitude });
    };

    const errorHandler = () => {
      alert("내 위치를 가져올 수 없습니다. 기본 위치로 설정합니다.");
      setLocation({ latitude: 37.5665, longitude: 126.978 }); // 서울
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  // 2. 지도 생성 및 초기 상담소 검색
  useEffect(() => {
    if (!kakao || !location) return;

    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(location.latitude, location.longitude),
      level: 5,
    };

    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);

    new kakao.maps.Marker({
      map: newMap,
      position: new kakao.maps.LatLng(location.latitude, location.longitude),
      title: "현재 위치",
    });

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      "상담",
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
        } else {
          setPlaces([]);
        }
      },
      {
        location: new kakao.maps.LatLng(location.latitude, location.longitude),
        radius: 5000,
      }
    );
  }, [location]);

  // 3. 마커 업데이트
  useEffect(() => {
    if (!map || !places) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));

    const newMarkers = places.map((place) => {
      const markerPosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = new kakao.maps.Marker({
        map,
        position: markerPosition,
        title: place.place_name,
      });

      // 클릭 시 인포윈도우 열기
      kakao.maps.event.addListener(marker, "click", () => {
        if (infowindowRef.current) {
          infowindowRef.current.close();
        }

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div class="info-window">${place.place_name}</div>`,
        });
        infowindow.open(map, marker);
        infowindowRef.current = infowindow;
      });

      return marker;
    });

    markersRef.current = newMarkers;
  }, [places, map]);

  // 4. 검색 핸들러
  const handleSearch = () => {
    if (!searchKeyword.trim() || !map) {
      alert("검색어를 입력해주세요.");
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result.length > 0) {
        const [place] = result;
        const center = new kakao.maps.LatLng(place.y, place.x);

        map.setCenter(center);

        ps.keywordSearch(
          "상담",
          (data, status2) => {
            if (status2 === kakao.maps.services.Status.OK) {
              setPlaces(data);
            } else {
              setPlaces([]);
            }
          },
          { location: center, radius: 5000 }
        );
      } else {
        alert("장소를 찾을 수 없습니다.");
      }
    });
  };

  return (
    <div className="recovery-map-container">
      <h3 className="title">내 마음과 더 이야기 해보지 않을래요?</h3>
      <div className="search-area">
        <div>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="예: 남부여성발전센터"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          검색
        </button>
        <p>장소를 검색하면 주변 상담소를 찾아볼 수 있어요~</p>
       </div>
      </div>

      <div id="map" className="map-box"></div>

      {/* 상담소 리스트 */}
      <div className="places-list">
        <h4>📍 주변 상담소 Click!</h4>
        {places.length === 0 ? (
          <p>상담소를 찾을 수 없습니다.</p>
        ) : (
          <ul>
            {places.map((place, index) => (
              <li
                key={index}
                className="place-item"
                onClick={() => {
                  const latlng = new kakao.maps.LatLng(place.y, place.x);
                  map.setCenter(latlng);
                  map.setLevel(3);

                  if (infowindowRef.current) {
                    infowindowRef.current.close();
                  }

                  const infowindow = new kakao.maps.InfoWindow({
                    content: `<div class="info-window">${place.place_name}</div>`,
                  });
                  infowindow.open(map, markersRef.current[index]);
                  infowindowRef.current = infowindow;
                }}
              >
                <div className="place">
                <strong>{place.place_name}</strong>
                <br />
                <span>{place.address_name}</span>
                </div>
                <div>
                  <span id="phone">{place.phone || "연락처 없음"}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecoveryMap;
