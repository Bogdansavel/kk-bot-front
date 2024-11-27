import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { Button } from "flowbite-react";
import { useTelegram } from "../UseTelegram";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import { useParams } from "react-router-dom";
import { defaultMovie, defaultRate, IMovie, IRate, mockUser } from "./constants";

function Rate() {
  const { movieId } = useParams();
  const { webApp, executeMethod } = useTelegram();
  /* const { id, username, first_name } = webApp.initDataUnsafe?.user */
  const { id, username, first_name } = mockUser;

  const [rate, setRate] = useState<IRate>(defaultRate);
  const [rating, setRating] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [discussable, setDiscussable] = useState(false);
  const [movie, setMovie] = useState<IMovie>(defaultMovie);

  const navigate = useNavigate();

  const handleLikeUnlike = async () => {
    executeMethod(
      "HapticFeedback.selectionChanged",
      webApp.HapticFeedback.selectionChanged,
      true
    );
    setLiked(!liked);
  };

  const handleDiscussable = async () => {
    executeMethod(
      "HapticFeedback.selectionChanged",
      webApp.HapticFeedback.selectionChanged,
      true
    );
    setDiscussable(!discussable);
  };

  const handleSubmit = (event: any) => {
    executeMethod(
      "HapticFeedback.impactOccurred",
      () => webApp.HapticFeedback.impactOccurred("heavy"),
      true
    );
    if (rate.id) {
      PutRating(event);
    } else {
      PostRating(event);
    }
  };

  const PostRating = (event: any) => {
    event.preventDefault();
    const rateDto = {
      rating: rating,
      movieId: movieId,
      username: username,
      firstName: first_name,
      telegramId: id,
      liked: liked,
      discussable: discussable,
    };
    fetch(BASE_URL + "/rate", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(rateDto),
    })
      .then((response) => response.status)
      .then((status) => {
        if (status == 200) {
          navigate("/rates/" + movieId);
        }
      })
      .catch((error) => console.error(error));
  };

  const PutRating = (event: any) => {
    event.preventDefault();
    const rateDto = {
      id: rate.id,
      rating: rating,
      movieId: movieId,
      telegramId: id,
      username: username,
      firstName: first_name,
      liked: liked,
      discussable: discussable,
    };
    fetch(BASE_URL + "/rate", {
      method: "PUT",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(rateDto),
    })
      .then((response) => response.status)
      .then((status) => {
        if (status == 200) {
          navigate("/rates/" + movieId);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch(BASE_URL + `/rate/${movieId}/${username}`)
      .then((response) => response.json())
      .then((json) => {
        console.info(json),
          setRate(json),
          setRating(json.rating),
          setLiked(json.liked);
        setDiscussable(json.discussable);
      })
      .catch((error) => console.error(error));

    fetch(BASE_URL + "/movie/" + movieId)
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setMovie(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center pb-2">
            <h1 className="telegram-text text-3xl">{movie.name}</h1>
          </div>
          <div className="flex justify-center pb-2">
            <p className="telegram-text">Как вам фильм?</p>
          </div>
          <div className="flex justify-center">
            <Rating
              onChange={(event, value) => {
                console.info(event);
                executeMethod(
                  "HapticFeedback.selectionChanged",
                  webApp.HapticFeedback.selectionChanged,
                  true
                );
                if (value) {
                  if (value == rating / 10) {
                    setRating(0);
                  } else {
                    setRating(value * 10);
                  }
                }
              }}
              sx={{
                fontSize: "4rem",
              }}
              emptyIcon={<StarBorder fontSize="inherit" htmlColor="#ffa726" />}
              name="half-rating"
              defaultValue={0}
              value={rating / 10}
              precision={0.5}
              size="large"
            />
          </div>
          <div className="grid gap-2 grid-cols-2 py-4">
            <div
              onClick={handleLikeUnlike}
              className="col-start-1"
              style={{ cursor: "pointer" }}
            >
              <div className="px-4 grid-rows-2 grid-cols-1 m-2">
                <div className="row-start-1 flex items-center justify-center">
                  {liked ? (
                    <FavoriteIcon sx={{ fontSize: "3rem" }} color="error" />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{ fontSize: "3rem" }}
                      color="error"
                    />
                  )}
                </div>
                <div className="row-start-2 flex items-center justify-center telegram-text text-sm">
                  <label className="text-xs">Понравился</label>
                </div>
              </div>
            </div>
            <div
              onClick={handleDiscussable}
              className="col-start-2"
              style={{ cursor: "pointer" }}
            >
              <div className="px-4 grid-rows-2 grid-cols-1 m-2">
                <div className="row-start-1 flex items-center justify-center">
                  {discussable ? (
                    <RecordVoiceOverIcon
                      sx={{ fontSize: "3rem" }}
                      color="primary"
                    />
                  ) : (
                    <RecordVoiceOverOutlinedIcon
                      sx={{ fontSize: "3rem" }}
                      color="primary"
                    />
                  )}
                </div>
                <div className="row-start-1 telegram-text">
                  <label className="text-xs">Есть что обсудить</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              color="yellow"
              className="telegram-bg telegram-text"
            >
              Оценить
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Rate;
