import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Event, IMember, IRate } from "../Interfaces";
import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LinearProgress from '@mui/material/LinearProgress';
import Fade from '@mui/material/Fade';
import { ratesCountLable, mockUser, BASE_URL } from "../Constants"
import { Box } from "@mui/material";
import { useTelegram } from "./UseTelegram";
import PersonIcon from '@mui/icons-material/Person';

const monthes = new Map();
monthes.set(1, "Январь");
monthes.set(2, "Февраль");
monthes.set(3, "Март");
monthes.set(4, "Апрель");
monthes.set(5, "Май");
monthes.set(6, "Июнь");
monthes.set(7, "Июль");
monthes.set(8, "Август");
monthes.set(9, "Сентябрь");
monthes.set(10, "Октябрь");
monthes.set(11, "Ноябрь");
monthes.set(12, "Декабрь");

const monthes2 = new Map();
monthes2.set(1, "января");
monthes2.set(2, "февраля");
monthes2.set(3, "марта");
monthes2.set(4, "апреля");
monthes2.set(5, "мая");
monthes2.set(6, "июня");
monthes2.set(7, "июля");
monthes2.set(8, "августа");
monthes2.set(9, "сентября");
monthes2.set(10, "октября");
monthes2.set(11, "ноября");
monthes2.set(12, "декабря");

function Movies() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const { username } = useTelegram().webApp.initDataUnsafe?.user ?? mockUser
    const [page, setPage] = useState(0);

    const loadMore = () => {
        fetchData(page + 1);
        setPage(page + 1);
    }

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

    const fetchData = (page:number) => {
        fetch(BASE_URL + `/event/movies?pageNumber=${page}&pageSize=10`)
          .then((response) => response.json())
          .then((json) => {
            console.info(json);
            setLoading(false);
            const objs = json.map((obj: Event) => {
                return new Event(obj.movie, obj.language, obj.date, obj.members);
            })
            if (page === 0) {
                setEvents(objs);
            } else {
                setEvents([...events, ...objs])
            }
          })
          .catch((error) => console.error(error));
    };

    useEffect(() => {
        console.log("useEffect is called")
        fetchData(0);
    }, []);

    return (
        <>
            <div className="flex justify-center pt-4 w-full">
                {false && (
                    <div>
                    <Link to="/wrapped">
                        <div className="telegram-bg telegram-text p-3 rounded-2xl border-2 border-indigo-500/100">
                            ИТОГИ ГОДА!
                        </div>
                    </Link>
                    </div>
                )}
                <div>
                    <Fade
                        in={loading}
                        unmountOnExit
                        >
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </Fade>
                </div>
            </div>
            <Fade in={!loading}>
            <div>
            {events.map((event: Event) => {
            let yourRate = null;
            const youRates = event.movie.ratings.filter((rating: IRate) => rating.username == username);
            if (youRates.length > 0) {
                yourRate = youRates[0];
            }
            return (
                <div className="flex justify-center">
                            <div className="wrapper border-b-2 border-solid m-2">
                                <div className="grid grid-cols-3 p-4 telegram-text">
                                    <img className="col-start-1 object-contain h-48 pr-4" src={event.movie.posterUrl} />
                                    <div className="col-start-2 col-span-2">
                                        <div className="container">
                                        <div className="top">
                                        <label className="text-xl font-bold">{event.movie.name}</label><br/>
                                        <div className="flex content-center justify-center">
                                        <label className="mr-auto text-xs">{event.getDay()} {monthes2.get(event.getMonth())} {event.getYear()}</label>
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
                                            <Link to={`/rate/${event.movie.id}`} className="rate">
                                                    <div className="button py-2">
                                                        Оценить
                                                    </div>
                                            </Link>
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
                            </div>
                </div>
                )
            }
            )}
            <div className="flex justify-center">
                        <button className="button" onClick={loadMore}>Еще</button>
                     </div>
            </div>
            </Fade>
        </>
    );
}

export default Movies;