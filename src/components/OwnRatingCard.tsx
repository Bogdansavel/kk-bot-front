import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { IYourRate } from "./interfaces";

interface OwnRatingCardProps {
  yourRate: IYourRate;
}

const OwnRatingCardProps = ({ yourRate }: OwnRatingCardProps) => {
  return (
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
        {yourRate.liked && <FavoriteIcon color="error" className=" ml-1" />}
      </div>
      <div>
        {yourRate.discussable && (
          <RecordVoiceOverIcon color="primary" className=" ml-1" />
        )}
      </div>
    </div>
  );
};

export default OwnRatingCardProps;
