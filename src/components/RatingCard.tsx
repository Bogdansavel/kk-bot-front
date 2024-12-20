import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { IRating } from "./interfaces";
import { useRef, useEffect } from "react";

interface RatingCardProps {
  rating: IRating;
  onCardRendered: (width: number) => void;
  maxCardWidth: number;
}

const RatingCard = ({
  rating,
  onCardRendered,
  maxCardWidth,
}: RatingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth;
      onCardRendered(width);
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
          width: maxCardWidth > 0 ? `${maxCardWidth}px` : "auto",
        }}
      >
        <label className="opacity-50 telegram-text px-2">
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
        {rating.liked && <FavoriteIcon color="error" className="ml-1" />}
        {rating.discussable && (
          <RecordVoiceOverIcon color="primary" className="ml-1" />
        )}
      </div>
    </div>
  );
};

export default RatingCard;