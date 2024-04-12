import { useContext, useState } from "react";
import "./MapBlock.css";
import Input from "../Input/Input.js";
import {
  YMaps,
  Map,
  GeolocationControl,
  Placemark,
} from "@pbe/react-yandex-maps";
import { Context } from "../..";

const MapBlock = () => {

  const {store} = useContext(Context)

  const [mapCentr, setmapCentr] = useState([55.75, 37.57]);

  const [places, setPlace] = useState([]);

  const [place, setNewPlace] = useState({
    name: "",
    x: "",
    y: "",
  });

  const [balloonContent, setBalloonContent] = useState(null);

  const [isHovered, setIsHovered] = useState(null);

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const handleGeoClick = (event) => {
    const position = event.get("geoObjects");
    setmapCentr(position);
  };

  const addPlacemarkInArray = () => {
    if (place.name && place.x && place.y) {
      setPlace([...places, place]);
    }
    setNewPlace({ name: "", x: "", y: "" });
    
  };

  const itemClick = (place) => {
    if (!isButtonHovered) {
      setmapCentr([place.x, place.y]);
    }
  };

  const handleMouseEnter = (index) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const deletePlacemark = (palceToDelete) => {
    const deletePlace = places.filter((place) => place !== palceToDelete);
    setPlace(deletePlace);
  };

  const editPlacemark = (index) => {
    setNewPlace(places[index]);
    setEditIndex(index);
  };

  const saveEditRecord = () => {
    if (place.name && place.x && place.y) {
      const updatedPlaces = [...places];
      updatedPlaces[editIndex] = place;
      setPlace(updatedPlaces);
      setEditIndex(null);
    }
    setNewPlace({ name: "", x: "", y: "" });
  };

  return (
    <>
      <div className="conteinerList">
        <section>
          <Input
            id={"nameP"}
            value={place.name}
            onChange={(e) => setNewPlace({ ...place, name: e.target.value })}
          >
            Название
          </Input>
          <Input
            id={"x"}
            value={place.x}
            onChange={(e) => setNewPlace({ ...place, x: e.target.value })}
          >
            Широта
          </Input>
          <Input
            id={"y"}
            value={place.y}
            onChange={(e) => setNewPlace({ ...place, y: e.target.value })}
          >
            Долгота
          </Input>
        </section>
        {editIndex !== null ? (
          <button onClick={saveEditRecord}>Сохранить</button>
        ) : (
          <button onClick={addPlacemarkInArray}>Добавить</button>
        )}
        <ol className="listOfPlaces">
          {places.map((place, index) => (
            <div
              className="liItems"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => itemClick(place)}
              key={index}
            >
              Название: {place.name} X: {place.x} Y: {place.y}
              {isHovered === index && (
                <div>
                  <button
                    onMouseEnter={handleButtonMouseEnter}
                    onMouseLeave={handleButtonMouseLeave}
                    onClick={() => editPlacemark(index)}
                  >
                    Редактировать
                  </button>
                  <button
                    onMouseEnter={handleButtonMouseEnter}
                    onMouseLeave={handleButtonMouseLeave}
                    onClick={() => deletePlacemark(place)}
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>
          ))}
        </ol>
      </div>
      <div className="myMap">
        <YMaps
          query={{
            apikey: "22d60574-cd10-4610-874a-725231d87fb6",
            provider: "browser",
          }}
        >
          <Map
            onChange={itemClick}
            style={{ width: "1705px", height: "730px" }}
            defaultState={{ center: mapCentr, zoom: 9 }}
            state={{ center: mapCentr, zoom: 9 }}
          >
            <GeolocationControl
              locationchange={handleGeoClick}
              options={{ float: "left" }}
            />
            {places.map((place, placeMark) => (
              <Placemark
                key={placeMark}
                geometry={[place.x, place.y]}
                modules={["geoObject.addon.balloon"]}
                options={{ preset: "islands#icon" }}
                properties={{
                  balloonContent: balloonContent,
                }}
                onClick={() => setBalloonContent(place.name)}
                onClose={() => setBalloonContent(null)}
              />
            ))}
          </Map>
        </YMaps>
      </div>
    </>
  );
};

export default MapBlock;
