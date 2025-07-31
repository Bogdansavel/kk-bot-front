import { useTelegram } from "./UseTelegram";
import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { defaultAverage, defaultMovie, defaultYourRate, BASE_URL, mockUser } from "../Constants";
import { IMovie, IAverage, IYourRate } from "../Interfaces";
import DeleteRateButton from "./DeleteRateButton";
import Collapse from '@mui/material/Collapse';
import FullRating from "./FullRating";
import GoToMainHeader from "./GoToMainHeader";
import EditIcon from '@mui/icons-material/Edit';

function Rates() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { webApp, executeMethod } = useTelegram();
  const { username } = useTelegram().webApp.initDataUnsafe?.user ?? mockUser;;

  const [movie, setMovie] = useState<IMovie>(defaultMovie);
  const [average, setAverage] = useState<IAverage>(defaultAverage);
  const [yourRate, setYourRate] = useState<IYourRate>(defaultYourRate);
  const [showPage, setShowPage] = useState<boolean>(false);

  const handleClick = async () => {
    executeMethod(
      "HapticFeedback.impactOccurred",
      () => webApp.HapticFeedback.impactOccurred("soft"),
      true
    );
  };

  const trimName = (rating : any) => {
      let name = rating.firstName;
      if (name == null) {
          name = rating.username;
      }

      if (name) {
          if (name.length > 15) {
              return name.substring(0, 12) + "..."
          }
      } 
      return name;
  };

  const fetchData = useCallback(() => {
    const p1 = fetch(BASE_URL + `/rate/${movieId}/${username}`)
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setYourRate(json);
      })
      .catch((error) => console.error(error));

    const p2 = fetch(BASE_URL + "/movie/" + movieId)
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setMovie(json);
      })
      .catch((error) => console.error(error));

    const p3 = fetch(BASE_URL + "/rate/average/" + movieId)
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setAverage(json);
      })
      .catch((error) => console.error(error));

    return Promise.all([p1, p2, p3]);
  }, [movieId, navigate, username]);

  useEffect(() => {
    fetchData().then(() => setShowPage(true));
  }, [fetchData]);

  return (
    <Collapse in={showPage}>
        {movie.kinopoiskData && JSON.parse(movie.kinopoiskData).backdrop.url && (
        <div className="pb-2 container w-full">
            <img className="preview w-full" src={JSON.parse(movie.kinopoiskData).backdrop.url} alt={movie.name}/>
            <div className="back-text">
            <Link to="/movies" className="telegram-text">
                <div className="p-2 secondary-bg rounded-xl font-bold text-xs [--bg-opacity:10%]">
                &lt; Все фильмы
                </div>
            </Link>
        </div>
        <div className="telegram-text text-center text-sm title-text">
          Средняя оценка фильма
          <div className="text-3xl font-bold pb-1">{average.movieName}</div>
          от Киноклуба
        </div>
        </div>
        )}
        {!movie.kinopoiskData || !JSON.parse(movie.kinopoiskData).backdrop.url && (
        <div className="pb-2 container w-full">
            <GoToMainHeader />
            <div className="flex justify-center pb-2">
              <label className="telegram-text text-center text-2xl">
                Средняя оценка фильма
                <br />"{average.movieName}"<br />
                от Киноклуба
              </label>
            </div>
        </div>
        )}
      <div className="flex justify-center text-7xl">
        <label className="opacity-50 telegram-text">
          {average.rating / 10}
        </label>
      </div>
      {!yourRate.id &&
        <Link to={`/rate/${movieId}`}>
          <div className="flex justify-center pt-4">
            <button
              className="button"
              type="submit"
            >
              Оценить
            </button>
          </div>
        </Link>
      }
      <div className="flex justify-center mt-4">
        <label className="opacity-50 telegram-text">Оценки участников ({movie.ratings.length}):</label>
      </div>
      {yourRate.id && (
      <div className="flex justify-center pt-2">
        <div className="flex justify-end w-full max-w-md gap-2 mr-6">
          <Link onClick={handleClick}
              to={"/rate/" + movieId}>
            <EditIcon className="telegram-text opacity-50" />
          </Link>
          <DeleteRateButton
            rateId={yourRate.id}
            onDeleteSuccess={() => {
              console.log("onDelete called in the rates");
              setYourRate(defaultYourRate);
              fetchData();
          }}
          />
        </div>
      </div>
      )}
      {yourRate.id &&
        <div className="flex justify-center">
          <div className="m-2 px-4 py-2 secondary-bg rounded-2xl border-2 telegram-accent-border telegram-text w-full max-w-md">
          <div className="flex justify-between">
          <label className="telegram-text opacity-50">
            Моя оценка:{" "}
          </label>
          <FullRating liked={yourRate.liked} discussable={yourRate.discussable} rating={yourRate.rating}/>
          </div>
          {yourRate.comment && (
            <p className="pt-2 text-sm whitespace-pre-line">
            {yourRate.comment}
            </p>
          )}
          </div>
        </div>
      }
      <div className="pb-6">
      {movie.ratings
        .filter((r: any) => r.username != username)
        .map((rating: any) => (
          <div className="flex justify-center">
            <div className="m-1 px-4 py-2 secondary-bg rounded-2xl telegram-border telegram-text w-full max-w-md">
              <div className="flex justify-between">
              <label className="link-text">
                <a
                  href={`https://t.me/${rating.username}`}
                  className="align-middle"
                >
                  {trimName(rating)}
                </a>
                {" "}
              </label>
              <FullRating liked={rating.liked} discussable={rating.discussable} rating={rating.rating} />
              </div>
              {rating.comment && (
                <p className="text-sm whitespace-pre-line mt-2">
                {rating.comment}
              </p>
              )}
            </div>
          </div>
      ))}
      </div>
    </Collapse>
  );
}

export default Rates;
