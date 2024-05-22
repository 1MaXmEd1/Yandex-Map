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

  const [editIndex, setEditIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleGeoClick = (event) => {
    const position = event.get("geoObjects");
    setMapCentr(position);
  };

  const itemClick = () => {
    setMapCentr([place.x, place.y]);
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
        getMarks();
        setEditIndex(null);

        setNewPlace({ name: "", x: "", y: "" });
      }
    } else {
      alert("Ошибка: широта и долгота должны быть числами.");
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
      setPlace([]);
    }
  }, [store]);

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
              <div>
                {places.map((place, index) => (
                  <div className="liItem" key={index}>
                    <div
                      className="description"
                      onClick={() => setMapCentr([place.x, place.y])}
                    >
                      <div className="txtName">
                        <p>Название: {place.name}</p>
                      </div>
                      <div className="txtXCord">
                        <p>X: {place.x}</p>
                      </div>
                      <div className="txtYCord">
                        <p>Y: {place.y}</p>
                      </div>
                    </div>

                    <div className="interaction">
                      <div
                        className="conteinerEdit"
                        onClick={() => editPlacemark(place)}
                      >
                        <svg
                          className="iEdit"
                          fill="#4D4D4D"
                          viewBox="0 0 80 80"
                          width="20px"
                          height="20px"
                        >
                          <path d="M 63.074219 10.003906 C 61.535156 10.003906 59.996094 10.589844 58.828125 11.757813 L 51.585938 19 L 15.140625 55.441406 L 9.257813 70.738281 L 24.558594 64.859375 L 24.707031 64.707031 L 68.242188 21.171875 C 70.578125 18.835938 70.578125 15.019531 68.242188 12.6875 L 67.3125 11.757813 C 66.148438 10.589844 64.609375 10.003906 63.074219 10.003906 Z M 63.074219 11.992188 C 64.09375 11.992188 65.113281 12.386719 65.902344 13.171875 L 66.828125 14.097656 C 68.398438 15.671875 68.398438 18.1875 66.828125 19.757813 L 66 20.585938 L 59.414063 14 L 60.242188 13.171875 C 61.027344 12.386719 62.050781 11.992188 63.074219 11.992188 Z M 58 15.414063 L 64.585938 22 L 61 25.585938 L 54.414063 19 Z M 53 20.414063 L 59.585938 27 L 24.65625 61.929688 C 24.480469 61.378906 24.207031 60.792969 23.707031 60.292969 C 22.972656 59.558594 22.046875 59.289063 21.320313 59.144531 C 21.089844 59.097656 21.089844 59.121094 20.902344 59.097656 C 20.878906 58.910156 20.902344 58.910156 20.855469 58.679688 C 20.710938 57.953125 20.441406 57.027344 19.707031 56.292969 C 19.207031 55.792969 18.621094 55.519531 18.070313 55.34375 Z M 53 23 C 52.449219 23 52 23.449219 52 24 C 52 24.550781 52.449219 25 53 25 C 53.550781 25 54 24.550781 54 24 C 54 23.449219 53.550781 23 53 23 Z M 50 26 C 49.449219 26 49 26.449219 49 27 C 49 27.550781 49.449219 28 50 28 C 50.550781 28 51 27.550781 51 27 C 51 26.449219 50.550781 26 50 26 Z M 47 29 C 46.449219 29 46 29.449219 46 30 C 46 30.550781 46.449219 31 47 31 C 47.550781 31 48 30.550781 48 30 C 48 29.449219 47.550781 29 47 29 Z M 44 32 C 43.449219 32 43 32.449219 43 33 C 43 33.550781 43.449219 34 44 34 C 44.550781 34 45 33.550781 45 33 C 45 32.449219 44.550781 32 44 32 Z M 41 35 C 40.449219 35 40 35.449219 40 36 C 40 36.550781 40.449219 37 41 37 C 41.550781 37 42 36.550781 42 36 C 42 35.449219 41.550781 35 41 35 Z M 38 38 C 37.449219 38 37 38.449219 37 39 C 37 39.550781 37.449219 40 38 40 C 38.550781 40 39 39.550781 39 39 C 39 38.449219 38.550781 38 38 38 Z M 35 41 C 34.449219 41 34 41.449219 34 42 C 34 42.550781 34.449219 43 35 43 C 35.550781 43 36 42.550781 36 42 C 36 41.449219 35.550781 41 35 41 Z M 32 44 C 31.449219 44 31 44.449219 31 45 C 31 45.550781 31.449219 46 32 46 C 32.550781 46 33 45.550781 33 45 C 33 44.449219 32.550781 44 32 44 Z M 29 47 C 28.449219 47 28 47.449219 28 48 C 28 48.550781 28.449219 49 29 49 C 29.550781 49 30 48.550781 30 48 C 30 47.449219 29.550781 47 29 47 Z M 26 50 C 25.449219 50 25 50.449219 25 51 C 25 51.550781 25.449219 52 26 52 C 26.550781 52 27 51.550781 27 51 C 27 50.449219 26.550781 50 26 50 Z M 23 53 C 22.449219 53 22 53.449219 22 54 C 22 54.550781 22.449219 55 23 55 C 23.550781 55 24 54.550781 24 54 C 24 53.449219 23.550781 53 23 53 Z M 16.660156 57.066406 C 16.753906 57.082031 16.824219 57.085938 16.929688 57.105469 C 17.453125 57.210938 18.027344 57.441406 18.292969 57.707031 C 18.558594 57.972656 18.789063 58.546875 18.894531 59.070313 C 19 59.59375 19 60 19 60 L 19 61 L 20 61 C 20 61 20.40625 61 20.929688 61.105469 C 21.453125 61.210938 22.027344 61.441406 22.292969 61.707031 C 22.558594 61.972656 22.789063 62.546875 22.894531 63.070313 C 22.914063 63.175781 22.917969 63.246094 22.933594 63.339844 L 16.003906 66.003906 L 13.996094 63.996094 Z" />
                        </svg>
                      </div>
                      <div
                        className="conteinerDelite"
                        onClick={() => deletePlacemark(place)}
                      >
                        <svg
                          className="iDelite"
                          fill="#4D4D4D"
                          viewBox="0 0 48 48"
                          width="17px"
                          height="17px"
                        >
                          <path d="M 22 1 C 19.802666 1 18 2.8026661 18 5 L 18 6 L 9 6 C 7.3555411 6 6 7.3544268 6 9 L 6 11 C 6 12.645573 7.3555411 14 9 14 L 33 14 A 1.0001 1.0001 0 1 0 33 12 L 9 12 C 8.4364589 12 8 11.564427 8 11 L 8 9 C 8 8.4355732 8.4364589 8 9 8 L 19 8 A 1.0001 1.0001 0 0 0 20 7 L 20 5 C 20 3.8833339 20.883334 3 22 3 L 26 3 C 27.116666 3 28 3.8833339 28 5 L 28 7 A 1.0001 1.0001 0 0 0 29 8 L 39 8 C 39.563541 8 40 8.4355732 40 9 L 40 11 C 40 11.564427 39.563541 12 39 12 L 38 12 A 1.0001 1.0001 0 0 0 37 13.003906 L 37.105469 40.080078 C 37.060923 41.715433 35.743427 43 34.107422 43 L 14.025391 43 C 12.348977 43 11.014814 41.656796 11.025391 39.980469 A 1.0001 1.0001 0 0 0 11.025391 39.974609 L 11 16.998047 A 1.0001 1.0001 0 1 0 9 17.001953 L 9.0253906 39.96875 C 9.0079668 42.730423 11.263804 45 14.025391 45 L 34.107422 45 C 36.805417 45 39.032014 42.831411 39.105469 40.134766 A 1.0001 1.0001 0 0 0 39.105469 40.103516 L 39.003906 13.998047 C 40.646254 13.995478 42 12.64401 42 11 L 42 9 C 42 7.3544268 40.644459 6 39 6 L 30 6 L 30 5 C 30 2.8026661 28.197334 1 26 1 L 22 1 z M 16.984375 19.986328 A 1.0001 1.0001 0 0 0 16 21 L 16 38 A 1.0001 1.0001 0 1 0 18 38 L 18 21 A 1.0001 1.0001 0 0 0 16.984375 19.986328 z M 23.984375 19.986328 A 1.0001 1.0001 0 0 0 23 21 L 23 38 A 1.0001 1.0001 0 1 0 25 38 L 25 21 A 1.0001 1.0001 0 0 0 23.984375 19.986328 z M 30.984375 19.986328 A 1.0001 1.0001 0 0 0 30 21 L 30 38 A 1.0001 1.0001 0 1 0 32 38 L 32 21 A 1.0001 1.0001 0 0 0 30.984375 19.986328 z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
            style={{ width: "1690px", height: "730px" }}
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
