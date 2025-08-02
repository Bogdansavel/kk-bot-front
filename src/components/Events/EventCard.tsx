import { Event, IRate, IMember } from "../../Interfaces";
import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { ratesCountLable, mockUser } from "../../Constants"
import { useTelegram } from "../UseTelegram";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";

interface EventCardProps {
    event: Event
}

const monthes = new Map();
monthes.set(1, "января");
monthes.set(2, "февраля");
monthes.set(3, "марта");
monthes.set(4, "апреля");
monthes.set(5, "мая");
monthes.set(6, "июня");
monthes.set(7, "июля");
monthes.set(8, "августа");
monthes.set(9, "сентября");
monthes.set(10, "октября");
monthes.set(11, "ноября");
monthes.set(12, "декабря");

const trimName = (member : IMember) => {
    let name = member.firstName;
    if (name == null) {
        name = member.username;
    }

    if (name) {
        if (name.length > 15) {
            return name.substring(0, 12) + "..."
        }
    } 
    return name;
};

function EventCard(props: EventCardProps) {
    const event = props.event
    const { username } = useTelegram().webApp.initDataUnsafe?.user ?? mockUser
    let yourRate = null;
    const youRates = event?.movie.ratings.filter((rating: IRate) => rating.username == username);
    if (youRates?.length > 0) {
        yourRate = youRates[0];
    }
    return (
        <div className="flex justify-center">
        {event &&
            <div className="grid grid-cols-3 p-4 telegram-text">
                                    <img className="poster col-start-1 max-h-80" src={event.movie.posterUrl} />
                                    <div className="col-start-2 col-span-2 pl-4">
                                        <div className="movie-container">  
                                        <div className="top">
                                        <div className="flex content-center justify-center">
                                        <label className="mr-auto text-xs">{event.getDay()} {monthes.get(event.getMonth())} {event.getYear()}</label>
                                        {event.movie.member && ( 
                                                <Link
                                                    to={`https://t.me/${event.movie.member.username}`}
                                                    className="link-text text-xs justify-center"
                                                >
                                                    {trimName(event.movie.member)}
                                                    <PersonIcon fontSize="small" className="link-text ml-1" />
                                                </Link>
                                        )}
                                        </div>
                                        <label className="text-xl font-bold">{event.movie.name}</label>
                                        {yourRate &&
                                            <div className="flex justify-left pb-2 pt-2">
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
                                                    {yourRate.liked && (
                                                    <FavoriteIcon color="error" className="align-middle ml-1" />
                                                    )}
                                                </div>
                                                <div>
                                                    {yourRate.discussable && (
                                                    <RecordVoiceOverIcon
                                                        color="primary"
                                                        className="align-middle ml-1"
                                                    />
                                                    )}
                                                </div>
                                            </div>
                                        }
                                        </div>
                                        <div className="bottom">
                                        <div className="flex my-2">
                                            <div className="text-4xl avg-rate">{event.movie.averageRating / 10}</div>
                                            {yourRate &&
                                                <Link to={`/rate/${event.movie.id}`} className="rate">
                                                <div className="button-3 py-2">
                                                    Изменить
                                                </div>
                                                </Link>  
                                            }
                                            {!yourRate &&
                                                <Link to={`/rate/${event.movie.id}`} className="rate">
                                                <div className="button py-2">
                                                    Оценить
                                                </div>
                                                </Link>    
                                            }
                                        </div>
                                        <div className="row-span-2 col-span-1 mt-3">
                                        <Link to={`/rates/${event.movie.id}`}>
                                            <div className="text-xs secondary-button px-4 py-2 font-bold rounded-3xl">{event.movie.ratings.length} {ratesCountLable(event.movie.ratings.length)}</div>
                                        </Link>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
        }
        </div>
    )
}

export default EventCard
