import { useTelegram } from "./UseTelegram";
import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from "../Constants";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { Event, IMember, IRate } from ".//interfaces";
import Rating from "@mui/material/Rating";
import StarBorder from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

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
    const { webApp } = useTelegram();
    const { username } = webApp.initDataUnsafe?.user
    //const username = "fanboyDan"

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

    const fetchData = useCallback(() => {
        fetch(BASE_URL + `/event/movies`)
          .then((response) => response.json())
          .then((json) => {
            console.info(json);
            setLoading(false);
            let objs = json.map((obj: Event) => {
                return new Event(obj.movie, obj.language, obj.date, obj.members);
            })
            objs.sort((a: Event, b: Event) => {
                if (a.getYear() < b.getYear()) return 1;
                else {
                    if (a.getYear() > b.getYear()) return -1;
                    else {
                        if (a.getMonth() < b.getMonth()) return 1;
                        else {
                            if (a.getMonth() > b.getMonth()) return -1;
                            else {
                                if (a.getDay() < b.getDay()) return 1;
                                else {
                                    if (a.getDay() > b.getDay()) return -1;
                                    else {
                                        return 0;
                                    }
                                }
                            }
                        }
                    }
                }
            });
            setEvents(objs);
          })
          .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    let year = 0;
    let showYear = false;
    let month = 0;
    let showMonth = false;

    return (
        <>
            <div className="flex items-center justify-center m-4">
                <Fade
                    in={loading}
                    unmountOnExit
                    >
                    <CircularProgress />
                </Fade>
                <Link to="/wrapped" className="p-4 telegram-text">
                <div className="rounded-2xl bg-gradient-to-b from-red-500 to-transparent telegram-text p-10">
                    ИТОГИ ГОДА!
                </div>
            </Link>
            </div>
            {events.map((event: Event) => {
            let yourRate = null;
            let youRates = event.movie.ratings.filter((rating: IRate) => rating.username == username);
            if (youRates.length > 0) {
                yourRate = youRates[0];
            }

            if (event.getYear() != year) {
                year = event.getYear();
                showYear = true;
            } else {
                showYear = false;
            }

            if (event.getMonth() != month) {
                month = event.getMonth();
                showMonth = true;
            } else {
                showMonth = false;
            }
            return (
                <div>
                    <div className="grid justify-left p-4 telegram-text">
                            {showYear && (
                                <div className="text-2xl w-full">{year}</div>
                            )}
                            {showMonth && (
                                <div className="text-xl w-full">{monthes.get(month)}</div>
                            )}
                    </div>
                    <div className="flex justify-center">
                            <div>
                                <div className="grid grid-cols-3 p-4 telegram-text">
                                    <img className="col-start-1 object-contain h-48 pr-4" src={event.movie.posterUrl} />
                                    <div className="col-start-2 col-span-2">
                                        <label className="text-xl font-bold">{event.movie.name}</label><br/>
                                        <label>{event.getDay()} {monthes2.get(event.getMonth())} {event.getYear()}</label><br/>
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
                                        <div className="text-2xl mt-2">{event.movie.averageRating / 10}</div><div className="opacity-50">({event.movie.ratings.length} оценок)</div>
                                        {event.movie.member && ( 
                                            <div>Предложил: <a
                                            href={`https://t.me/${event.movie.member.username}`}
                                            className="align-middle underline"
                                            >
                                            {trimName(event.movie.member)}
                                            </a></div>
                                        )}<br/>
                                        <div className="flex gap-2">
                                            <Link to={`/rate/${event.movie.id}`}>
                                                <Button
                                                    type="submit"
                                                    color="yellow"
                                                    className="telegram-bg telegram-text"
                                                    >
                                                    Оценить
                                                </Button>
                                            </Link>
                                            <Link to={`/rates/${event.movie.id}`}>
                                                <Button
                                                    type="submit"
                                                    color="yellow"
                                                    className="telegram-bg telegram-text"
                                                    >
                                                    Оценки
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                )
            }
            )}
        </>
    );
}

export default Movies;