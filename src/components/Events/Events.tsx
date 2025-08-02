import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Event } from "../../Interfaces";
import LinearProgress from '@mui/material/LinearProgress';
import Fade from '@mui/material/Fade';
import { BASE_URL } from "../../Constants"
import { Box } from "@mui/material";
import MovieCard from "./EventCard";

function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const loadMore = () => {
        fetchData(page + 1);
        setPage(page + 1);
    }

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
        fetchData(0);
    }, []);

    const firstEvent = events[0]
    const anotherEvents = events.slice(1)

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
            <MovieCard event={firstEvent} />
            {anotherEvents.map((event: Event) => {
                return (
                    <div className="wrapper border-t-2 border-solid">
                        <MovieCard event={event} />
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

export default Events;