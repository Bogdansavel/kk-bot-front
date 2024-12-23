import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { IRating } from "./interfaces";
import { useRef, useEffect } from "react";

interface RatingCardProps {
  rating: IRating;
  onCardRendered: (
    generalWidth: number,
    nameWidth: number,
    likeDiscWidth: number
  ) => void;
  elemWidth: {
    maxCardWidth: number;
    maxNameWidth: number;
    maxLikeDiscWidth: number;
  };
}

const RatingCard = ({ rating, onCardRendered, elemWidth }: RatingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLLabelElement>(null);
  const likeDiscRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && nameRef.current && likeDiscRef.current) {
      const generalWidth = cardRef.current.offsetWidth;
      const nameWidth = nameRef.current.offsetWidth;
      const likeDiscWidth = likeDiscRef.current.offsetWidth;
      onCardRendered(generalWidth, nameWidth, likeDiscWidth);
    }
  }, [onCardRendered, rating]);

  const trimName = (rating: IRating) => {
    let name = rating.firstName;
    if (name == null) {
      name = rating.username;
    }

    if (name) {
      if (name.length > 15) {
        return name.substring(0, 12) + "...";
      }
    }
    return name;
  };

  return (
    <div className="flex justify-center">
      <div
        ref={cardRef}
        className="flex items-center justify-center m-2 p-2 border-solid rounded-2xl border-2 telegram-border telegram-text align-middle"
        style={{
          width:
            elemWidth.maxCardWidth > 0 ? `${elemWidth.maxCardWidth}px` : "auto",
        }}
      >
        <label
          ref={nameRef}
          style={{
            width:
              elemWidth.maxNameWidth > 0
                ? `${elemWidth.maxNameWidth}px`
                : "auto",
          }}
          className="opacity-50 telegram-text px-2"
        >
          <a
            href={`https://t.me/${rating.username}`}
            className="align-middle underline"
          >
            {trimName(rating)}
          </a>
          :{" "}
        </label>
        <Rating
          emptyIcon={<StarBorder fontSize="inherit" htmlColor="#ffa726" />}
          name="half-rating"
          value={rating.rating / 10}
          precision={0.5}
          size="large"
          readOnly
        />
        <div
          className="flex items-center justify-center"
          ref={likeDiscRef}
          style={{
            width:
              elemWidth.maxLikeDiscWidth > 0
                ? `${elemWidth.maxLikeDiscWidth}px`
                : "auto",
          }}
        >
          {rating.liked && <FavoriteIcon color="error" className="ml-1" />}

          {rating.discussable && (
            <RecordVoiceOverIcon color="primary" className="ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
