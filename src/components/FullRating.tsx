import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

interface FullRatingProps {
    liked: boolean, 
    discussable: boolean, 
    rating: number
}

function FullRating(props: FullRatingProps) {
    return (
        <div className="flex justify-center">
            <div className="flex items-center">
            {props.liked && (
                <FavoriteIcon color="error" className="ml-1" />
              )}
            {props.discussable && (
                <RecordVoiceOverIcon
                  className="ml-1"
                  color="primary"
                />
              )}
            </div>
            <Rating
              className="ml-1"
              emptyIcon={<StarBorder fontSize="inherit" htmlColor="#ffa726" />}
              name="half-rating"
              value={props.rating / 10}
              precision={0.5}
              size="large"
              readOnly
            />
          </div>
    )
}

export default FullRating;