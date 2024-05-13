// import { useState, useEffect } from "react";
// import {
//     YMaps,
//     Map,
//     GeolocationControl,
//     Placemark,
// } from "@pbe/react-yandex-maps";
// const InterectiveMap = ({mapCentr, places, item}) => {
//   const [balloonContent, setBalloonContent] = useState(null);


//   // const handleGeoClick = (event) => {
//   //   const position = event.get("geoObjects");
//   //   setMapCentr(position);
//   // };

//     return(
//         <div className="myMap">
//         <YMaps
//           query={{
//             apikey: "22d60574-cd10-4610-874a-725231d87fb6",
//             provider: "browser",
//           }}
//         >
//           <Map
//             onChange={itemClick}
//             style={{ width: "1705px", height: "730px" }}
//             defaultState={{ center: mapCentr, zoom: 9 }}
//             state={{ center: mapCentr, zoom: 9 }}
//           >
//             <GeolocationControl
//               // locationchange={handleGeoClick}
//               options={{ float: "left" }}
//             />
//             {places.map((place, placeMark) => (
//               <Placemark
//                 key={placeMark}
//                 geometry={[place.x, place.y]}
//                 modules={["geoObject.addon.balloon"]}
//                 options={{ preset: "islands#icon" }}
//                 properties={{
//                   balloonContent: balloonContent,
//                 }}
//                 onClick={() => setBalloonContent(place.name)}
//                 onClose={() => setBalloonContent(null)}
//               />
//             ))}
//           </Map>
//         </YMaps>
//       </div>
//     );
// }

// export default InterectiveMap;