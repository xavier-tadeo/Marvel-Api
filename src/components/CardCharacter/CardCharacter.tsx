import { useContext, useState } from "react";
import { Navigate, Params, useNavigate, useParams } from "react-router-dom";

import getCharacterId from "../../helpers/getCharacterId";
import { Context } from "../../context/AppContext/AppContext";
import useFetchComics from "../../hooks/useFetchComics";
import { IItems } from "../../interfaces/interfaces";
import "./CardCharater.scss";
import useFetchSeries from "../../hooks/useFetchSeries";

const CardCharacter = () => {
  window.scroll(0, 0);
  const { id }: Readonly<Params<string>> = useParams();
  const navigate = useNavigate();

  const [comicsArray, setComicsArray] = useState([]);
  const [seriesArray, setSeriesArray] = useState([]);

  useFetchComics(id, setComicsArray);
  useFetchSeries(id, setSeriesArray);

  const charactersContext = useContext(Context);
  const { charactersArray }: any = charactersContext;

  const characterOne = getCharacterId(id, charactersArray);
  if (!characterOne) {
    return <Navigate to={"/"} />;
  }

  const { name, thumbnail, description } = characterOne;

  const handleReturn = () => {
    navigate(-1);
  };

  const upScroll = () => {
    window.scroll(0, 0);
  };

  return (
    <>
      <div className="characterOne">
        <button className="characterOne__button" onClick={handleReturn}>
          Return
        </button>
        <h2 className="characterOne__title">{name}</h2>
        <div className="characterOne__image-container">
          <img
            className="characterOne__image"
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt={name}
          />
        </div>

        <div className="characterOne__description">
          <h5 className="characterOne__description-title">Historie</h5>
          <p className="characterOne__description-paragraph">{description}</p>
        </div>
        <div className="characterOne__comics">
          <h5 className="characterOne__comics-title">Comics</h5>
          <div className="characterOne__list-comics">
            {comicsArray.map((comic: IItems) => (
              <div key={comic.id}>
                <p className="characterOne__comics-parraf">{comic.title}</p>
                <img
                  className="characterOne__comics-image"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                ></img>
              </div>
            ))}
          </div>
        </div>
        <div className="characterOne__series">
          <h5 className="characterOne__series-title">Series</h5>
          <div className="characterOne__list-series">
            {seriesArray.map((series: IItems) => (
              <div key={series.id}>
                <p className="characterOne__series-parraf">{series.title}</p>
                <img
                  className="characterOne__series-image"
                  src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                  alt={series.title}
                ></img>
              </div>
            ))}
          </div>
        </div>
        <button className="characterOne__button-scroll" onClick={upScroll}>
          Up
        </button>
      </div>
    </>
  );
};

export default CardCharacter;
