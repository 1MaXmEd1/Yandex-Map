import { useContext, useEffect, useState } from "react";
import "./MapBlock.css";
import Input from "../input/Input.js";
import {
  YMaps,
  Map,
  GeolocationControl,
  Placemark,
} from "@pbe/react-yandex-maps";
import { Context } from "../../index.js";

const MapBlock = () => {
  const { store } = useContext(Context);
  const [mapCentr, setMapCentr] = useState([55.75, 37.57]);
  const [balloonContent, setBalloonContent] = useState(null);
  const [place, setNewPlace] = useState({
    name: "",
    x: "",
    y: "",
  });
  const [places, setPlace] = useState([]);
  const [isHovered, setIsHovered] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleGeoClick = (event) => {
    const position = event.get("geoObjects");
    setMapCentr(position);
  };

  const itemClick = () => {
    if (isButtonHovered == true) {
      setMapCentr([place.x, place.y]);
    }
  };

  const addPlacemarkInArray = () => {
    if (!isNaN(place.x) && !isNaN(place.y)) {
      if (place.name && place.x && place.y) {
        setPlace([...places, place]);
        store.createMark(place);

        setNewPlace({ name: "", x: "", y: "" });
      } else {
        alert("Ошибка: Введите корректные данные для X и Y.");
      }
    } else {
      alert("Ошибка: X и Y должны быть числами.");
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

  const deletePlacemark = (placeToDelete) => {
    const deletePlace = places.filter((place) => place !== placeToDelete);
    setPlace(deletePlace);
    store.deleteMark(placeToDelete._id);
  };

  const editPlacemark = (place, index) => {
    setNewPlace(place);
    setEditIndex(index);
  };

  const saveEditRecord = async () => {
    if (!isNaN(place.x) && !isNaN(place.y)) {
      if (place.name && place.x && place.y) {
        const updatedPlaces = [...places];
        updatedPlaces[editIndex] = place;
        setPlace(updatedPlaces);
        await store.updateMark(place);
        setEditIndex(null);

        setNewPlace({ name: "", x: "", y: "" });
      }
    } else {
      alert("Ошибка: X и Y должны быть числами.");
    }
  };

  const getMarks = async () => {
    try {
      setIsLoading(true);
      const response = await store.getMarks(store.user.id);
      setPlace(response);
      setIsLoading(false);
    } catch (e) {
      console.log("Получение маркеров. Неудача" + e);
    }
  };

  useEffect(() => {
    if (store.user.isAuth) {
      getMarks();
    } else {
      console.log("Залогиньтесь!");
      setPlace([])
    }
  }, [store.user.isAuth]);

  return (
    <>
      <div className="conteinerList">
        <div className="conteinerInput">
          <section className="inputs">
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
              <button className="btnNotes btnSaveChange" onClick={saveEditRecord}>
                Сохранить
              </button>
            ) : (
              <button className="btnNotes btnAdd" onClick={addPlacemarkInArray}>
                Добавить
              </button>
            )}
        </div>
        <div className="line"></div>
        <div className="listContainer">
          {isLoading ? (
            <div className="loadingCircle"></div>
          ) : (
            <ol className="listOfPlaces">
              {places.map((place, index) => (
                <div
                  className="liItem"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setMapCentr([place.x, place.y])}
                  key={index}
                >
                  Название: {place.name} X: {place.x} Y: {place.y}
                  {isHovered === index && (
                    <div className="btnConteiner">
                      <button
                      className="hoverBtn btnEdit"
                        onMouseEnter={handleButtonMouseEnter}
                        onMouseLeave={handleButtonMouseLeave}
                        onClick={() => editPlacemark(place, index)}
                      >
                        Редактировать
                      </button>
                      <button
                      className="hoverBtn btnDelite"
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
          )}
        </div>
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
