import { useEffect, useState, useCallback } from "react";
import { useTelegram } from "./UseTelegram";
import { BASE_URL } from "../Constants";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Wrapped() {
    const [wrapped, setWrapped] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const handleOpen = (movies: []) => {
        setMovies(movies);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const { webApp } = useTelegram();
    const { username, first_name } = webApp.initDataUnsafe?.user
    const id = 0
    //const username = "bellabaxterbeast"; const first_name = "Dascha";
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'var(--tg-theme-bg-color)',
        border: 'var(--tg-theme-text-color)',
        boxShadow: 24,
        p: 4,
      };

    const trimName = (member : any) => {
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
        fetch(BASE_URL + `/wrapped/` + id + '/' + username + '/' + first_name)
          .then((response) => response.json())
          .then((json) => {
            console.info(json);
            setLoading(false);
            setWrapped(json);
          })
          .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
        <Link to="/movies" className="p-4 telegram-text">&lt; К списку всех фильмов</Link>
        <div className="flex items-center justify-center m-4">
                <Fade
                    in={loading}
                    unmountOnExit
                    >
                        <div className="telegram-text">
                            <div>Секундочку, идет обертка ваших итогов ...</div>
                            <div className="flex items-center justify-center m-4"><CircularProgress /></div>
                        </div>
                </Fade>
            </div>
        {wrapped && (
            <div className="flex justify-center telegram-text">
            <div className="text-center ">
                <div className="text-3xl font-bold">2 год Киноклуба</div>
                <div className="text-xl">в цифрах</div>
                <img className="col-start-1 py-4" src="poster.png" />
                <div className="text-xl"><b>{wrapped.eventsCount}</b> Киноклубов!</div>
                <div className="text-xl">Это около <b>{wrapped.eventsCount*5}</b> часов вместе!</div>
                <div className="text-xl">Или <b>{((wrapped.eventsCount*5)/24).toFixed(1)}</b> суток!</div>
                <br />
                <div className="text-xl">И хоть это не соревнование</div>
                <div className="text-xl">вот статистика :)</div>
                <br />
                <div className="text-2xl"><b>Завсегдатаи!</b></div>
                <div className="text-xl"><b>{username}</b>, вы посетили <b>{wrapped.visitedEventsCount}</b> встреч</div>
                <div>({wrapped.topVisitorsPlace} место)</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.topVisitors.map((entry: any) => (
                        <div className="border-4 p-2 m-2 rounded-xl">
                            <a
                            href={`https://t.me/${entry.member.username}`}
                            className="align-middle underline"
                            ><div>{trimName(entry.member)}</div></a>
                            <div><b>{entry.value}</b></div>
                        </div>
                    ))}
                </div>
                <br />
                <div className="text-xl">Ваш первый визит в этом году был</div>
                <div className="text-xl"><b>{wrapped.firstEvent}</b></div>
                <div className="text-xl">С того дня вы пропустили</div>
                <div className="text-xl"><b>{wrapped.eventYouMissedCount}</b> встреч</div>
                <br />
                <div className="text-2xl"><b>Ни недели без Киноклуба!</b></div>
                <div className="text-xl">Однажды вы посетили <b>{wrapped.streak}</b> клубов <b>подряд!</b></div>
                <div>({wrapped.topStreaksPlace} место)</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.topStreaks.map((entry: any) => (
                        <div className="border-4 p-2 m-2 rounded-xl">
                            <a
                            href={`https://t.me/${entry.member.username}`}
                            className="align-middle underline"
                            ><div>{trimName(entry.member)}</div></a>
                            <div><b>{entry.value}</b></div>
                        </div>
                    ))}
                </div>
                <br />
                <div className="text-2xl"><b>Лидеры мнений</b></div>
                <div className="text-xl">Мы посмотрели <b>46</b> фильмов в этом году!</div>
                <div className="text-xl">Это <b>{wrapped.allMoviesTime/60}</b> часов или <b>{(wrapped.allMoviesTime/60/24).toFixed(1)}</b> суток</div>
                <div className="text-xl">Вы предложили <b>{wrapped.offeredByYou}</b> из них</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.topOffers.map((entry: any) => (
                        <div className="border-4 p-2 m-2 rounded-xl">
                            <a
                            href={`https://t.me/${entry.member.username}`}
                            className="align-middle underline"
                            ><div>{trimName(entry.member)}</div></a>
                            <div><b>{entry.value}</b></div>
                        </div>
                    ))}
                </div>
                <div className="text-2xl"><b>Оценки</b></div>
                <div className="text-xl">Вы оценили <b>{wrapped.moviesRatedCount}</b> фильмов</div>
                <div>({wrapped.movieRatedPlace} место)</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.topRates.map((entry: any) => (
                        <div className="border-4 p-2 m-2 rounded-xl">
                            <a
                            href={`https://t.me/${entry.member.username}`}
                            className="align-middle underline"
                            ><div>{trimName(entry.member)}</div></a>
                            <div><b>{entry.value}</b></div>
                        </div>
                    ))}
                </div>
                <br />
                <div className="text-2xl">Высоко оцененные</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.topMovies.map((movie: any) => (
                        <div className="m-2">
                            <div className="flex justify-center pb-2"><img className="col-start-1" src={movie.posterUrl} /></div>
                            <div className="text-xl"><b>{movie.averageRating/10}</b></div>
                        </div>
                    ))}
                </div>
                <div className="text-2xl">Низко оцененные</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.worstMovies.map((movie: any) => (
                        <div className="m-2">
                            <div className="flex justify-center pb-2"><img className="col-start-1" src={movie.posterUrl} /></div>
                            <div className="text-xl"><b>{movie.averageRating/10}</b></div>
                        </div>
                    ))}
                </div>
                <div className="text-xl p-4">Самый старый из просмотренных: </div>
                <div className="flex justify-center telegram-text"><img className="col-start-1 w-1/3" src={wrapped.oldestMovie.poster.url} /></div>
                <div className="flex justify-center text-xl m-2"><b>{wrapped.oldestMovie.year}</b></div>
                <div className="text-xl p-4">Самый новый: </div>
                <div className="flex justify-center pb-2"><img className="col-start-1 w-1/3" src={wrapped.newestMovie.poster.url} /></div>
                <div className="text-xl m-2"><b>{wrapped.newestMovie.year}</b></div>
                <div className="text-2xl">Самые спорные</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.controverses.map((movie: any) => (
                        <div className="m-2">
                            <div className="flex justify-center pb-2"><img className="col-start-1" src={movie.posterUrl} /></div>
                            <div className="text-xl">От <b>{movie.ratings[movie.ratings.length - 1].rating/10}</b> до <b>{movie.ratings[0].rating/10}</b></div>
                        </div>
                    ))}
                </div>
                <br />
                <div className="text-2xl">Это был очень разнообразный год</div>
                <div className="text-xl">Жанры:</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.topGenres.map((entry: any) => (
                        <div className="border-4 p-2 m-2 rounded-xl">
                        <div>{entry.name}</div>
                        <div><b>{entry.value}</b></div>
                    </div>
                    ))}
                </div>
                <div className="text-2xl">Страны</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.countries.map((country: any) => (
                        <div className="m-2 border-4 p-2 m-2 rounded-xl" onClick={() => handleOpen(country.movies)}>
                            <div className="flex justify-center pb-2">{country.country}</div>
                            <div className="text-xl"><b>{country.movies.length}</b></div>
                        </div>
                    ))}
                </div>
                <div className="text-2xl">Поколения</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.ages.map((age: any) => (
                        <div className="m-2 border-4 p-2 m-2 rounded-xl" onClick={() => handleOpen(age.movies)}>
                            <div className="flex justify-center pb-2">{age.country}-ые</div>
                            <div className="text-xl"><b>{age.movies.length}</b></div>
                        </div>
                    ))}
                </div>
                <div className="text-xl">В фильмах мы увидeли <b>{wrapped.actorsCount}</b> актеров</div>
                <div className="flex grid grid-cols-3 gap-2 p-2">
                    {wrapped.topPersons.map((entry: any) => (
                        <div className="p-2 m-2" onClick={() => handleOpen(entry.movies)}>
                            <div className="flex justify-center"><img className="col-start-1" src={entry.person.photo} /></div>
                            <div>{entry.person.name}</div>
                            <div><b>{entry.movies.length}</b></div>
                        </div>
                    ))}
                </div>
                <div className="text-2xl">Все фильмы в этом году были сняты <b>разными</b> режиссерами!</div>
                <br />
                <p className="text-2xl m-2">Спасибо за такой насыщенный и разнообразный год вместе! До встречи в новом году!</p>
                <Modal
                                open={open}
                                onClose={handleClose}
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        {movies.map((movie: any) => (
                                            <div className="telegram-text">{movie.name}</div>
                                        ))}
                                    </Typography>
                                </Box>
                            </Modal>
            </div>
        </div>
        )}
        </>
    )
}

export default Wrapped;