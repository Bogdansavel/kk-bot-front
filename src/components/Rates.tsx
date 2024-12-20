import { useTelegram } from "./UseTelegram";
import { useEffect, useState, useCallback } from "react";
import { BASE_URL, isDev } from "../Constants";
import { useParams, Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { useNavigate } from "react-router-dom";
import { defaultAverage, defaultMovie, defaultYourRate } from "./constants";
import { IMovie, IAverage, IYourRate, IRating } from "./interfaces";
import DeleteRateButton from "./DeleteRateButton";
import RatingCard from "./RatingCard";

function Rates() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { webApp, executeMethod } = useTelegram();
  const { username } = isDev
    ? { username: "test" }
    : webApp.initDataUnsafe?.user;
  //const username = "test";

  const [movie, setMovie] = useState<IMovie>(defaultMovie);
  const [average, setAverage] = useState<IAverage>(defaultAverage);
  const [yourRate, setYourRate] = useState<IYourRate>(defaultYourRate);

  const handleClick = async () => {
    executeMethod(
      "HapticFeedback.impactOccurred",
      () => webApp.HapticFeedback.impactOccurred("soft"),
      true
    );
  };

  const fetchData = useCallback(() => {
    fetch(BASE_URL + `/rate/${movieId}/${username}`)
      .then((response) => {
        if (response.status == 404) {
          navigate("/rate/" + movieId);
        }
        return response;
      })
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setYourRate(json);
      })
      .catch((error) => console.error(error));

    fetch(BASE_URL + "/movie/" + movieId)
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setMovie(json);
      })
      .catch((error) => console.error(error));

    fetch(BASE_URL + "/rate/average/" + movieId)
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setAverage(json);
      })
      .catch((error) => console.error(error));
  }, [movieId, navigate, username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="flex justify-center pb-2">
        <label className="telegram-text text-center text-2xl">
          Средняя оценка фильма
          <br />"{average.movieName}"<br />
          от Киноклуба
        </label>
      </div>
      <div className="flex justify-center text-5xl pb-4">
        <label className="opacity-50 telegram-text">
          {average.rating / 10}
        </label>
      </div>
      <div className="flex items-center justify-center pb-2">
        <label className="opacity-50 telegram-text ">Моя оценка: </label>
        <Rating
          className="pl-1"
          emptyIcon={<StarBorder fontSize="inherit" htmlColor="#ffa726" />}
          name="half-rating"
          value={yourRate.rating / 10}
          precision={0.5}
          size="large"
          readOnly
        />
        <div>
          {yourRate.liked ? (
            <FavoriteIcon color="error" className=" ml-1" />
          ) : (
            <FavoriteBorderIcon color="error" className=" ml-1" />
          )}
        </div>
        <div>
          {yourRate.discussable ? (
            <RecordVoiceOverIcon color="primary" className=" ml-1" />
          ) : (
            <RecordVoiceOverOutlinedIcon color="primary" className=" ml-1" />
          )}
        </div>
      </div>
      <div className="flex justify-center pb-1">
        <Link
          onClick={handleClick}
          to={"/rate/" + movieId}
          className="telegram-text"
        >
          {yourRate.id ? "Изменить оценку" : "Оценить"}
        </Link>
      </div>
      {yourRate.id && (
        <DeleteRateButton
          rateId={yourRate.id}
          onDeleteSuccess={() => {
            setYourRate(defaultYourRate);
            fetchData();
          }}
        />
      )}
      <div className="flex justify-center mt-8">
        <label className="opacity-50 telegram-text">Оценки участников:</label>
      </div>
      {movie.ratings
        .filter((r: IRating) => r.username != username)
        .map((rating: IRating) => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
    </>
  );
}

export default Rates;
