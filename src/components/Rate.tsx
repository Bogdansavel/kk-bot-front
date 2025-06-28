import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { useTelegram } from "./UseTelegram";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  BASE_URL,
  defaultMovie,
  defaultRate,
  mockUser,
} from "../Constants";
import { IRate, IMovie } from "../Interfaces";
import CommentInput from "./CommentInput";
import Collapse from '@mui/material/Collapse';
import GoToMainHeader from "./GoToMainHeader";

function Rate() {
  const { movieId } = useParams();
  const { webApp, executeMethod } = useTelegram();
  const { username, first_name } = useTelegram().webApp.initDataUnsafe?.user ?? mockUser;

  const [rate, setRate] = useState<IRate>(defaultRate);
  const [rating, setRating] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [discussable, setDiscussable] = useState(false);
  const [comment, setComment] = useState<string>("")
  const [movie, setMovie] = useState<IMovie>(defaultMovie);
  const [show, setShow] = useState<boolean>(true);
  const [showPage, setShowPage] = useState<boolean>(false);

  const navigate = useNavigate();

  const collapse = () => {
    setShow(!show);
  }

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
      sendRate(event, "PUT");
    } else {
      sendRate(event, "POST");
    }
  };

  const sendRate = (event: any, method: string) => {
    event.preventDefault();
    let commentValue = null;
    if (!event.target.comment.classList.contains("empty")) {
      commentValue = event.target.comment.value;
    }
    const rateDto = {
      id: rate.id,
      rating: rating,
      movieId: movieId,
      username: username,
      firstName: first_name,
      telegramId: 0,
      liked: liked,
      discussable: discussable,
      comment: commentValue
    };
    fetch(BASE_URL + "/rate", {
      method: method,
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
    const p1 = fetch(BASE_URL + `/rate/${movieId}/${username}`)
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setRate(json);
        setRating(json.rating);
        setLiked(json.liked);
        setDiscussable(json.discussable);
        setComment(json.comment);
      })
      .catch((error) => console.error(error));

    const p2 = fetch(BASE_URL + "/movie/" + movieId)
      .then((response) => response.json())
      .then((json) => {
        console.info(json);
        setMovie(json);
      })
      .catch((error) => console.error(error));

    Promise.all([p1, p2]).then(() => setShowPage(true));
  }, [movieId, username]);

  return (
    <Collapse in={showPage}>
      <div className="h-screen">
      <GoToMainHeader />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <Collapse in={show}> 
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
          </Collapse>
          <div>
            <CommentInput comment={comment} collapseCallback={collapse} />
          </div>
          <div className="flex justify-center">
            <button className="button" type="submit">
              Оценить
            </button>
          </div>
        </form>
      </div>
    </div>
    </Collapse>
  );
}

export default Rate;
