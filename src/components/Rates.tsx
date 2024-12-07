import { useTelegram } from "./UseTelegram";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";
import { useParams, Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { useNavigate } from "react-router-dom";
import { defaultAverage, defaultMovie, defaultYourRate } from "./constants";
import { IMovie, IAverage, IYourRate } from "./interfaces";
import DeleteRateButton from "./DeleteRateButton";

function Rates() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { webApp, executeMethod } = useTelegram();
  const { username } = webApp.initDataUnsafe?.user
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

  useEffect(() => {
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
      <div className="flex justify-center pb-2">
        <label className="opacity-50 telegram-text align-middle">
          Моя оценка:{" "}
        </label>
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
            <FavoriteIcon color="error" className="align-middle ml-1" />
          ) : (
            <FavoriteBorderIcon color="error" className="align-middle ml-1" />
          )}
        </div>
        <div>
          {yourRate.discussable ? (
            <RecordVoiceOverIcon
              color="primary"
              className="align-middle ml-1"
            />
          ) : (
            <RecordVoiceOverOutlinedIcon
              color="primary"
              className="align-middle ml-1"
            />
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
            console.log("onDelete  called in the rates");
            setYourRate(defaultYourRate);
            navigate(`/rates/${movieId}`);
          }}
        />
      )}
      <div className="flex justify-center mt-8">
        <label className="opacity-50 telegram-text">Оценки участников:</label>
      </div>
      {movie.ratings
        .filter((r: any) => r.username != username)
        .map((rating: any) => (
          <div className="flex justify-center">
            <div className="flex align-middle justify-center m-2 p-2 border-solid rounded-2xl border-2 telegram-border telegram-text align-middle">
              <label className="opacity-50 telegram-text px-2">
                <a
                  href={`https://t.me/${rating.username}`}
                  className="align-middle underline"
                >
                  {trimName(rating.firstName)}
                </a>
                :{" "}
              </label>
              <Rating
                emptyIcon={
                  <StarBorder fontSize="inherit" htmlColor="#ffa726" />
                }
                name="half-rating"
                value={rating.rating / 10}
                precision={0.5}
                size="large"
                readOnly
              />
              {rating.liked && (
                <FavoriteIcon color="error" className="align-middle ml-1" />
              )}
              {rating.discussable && (
                <RecordVoiceOverIcon
                  color="primary"
                  className="align-middle ml-1"
                />
              )}
            </div>
          </div>
        ))}
    </>
  );
}

export default Rates;
