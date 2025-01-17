import { useEffect, useState, useCallback } from "react";
import { useTelegram } from "./UseTelegram";
import { BASE_URL } from "../Constants";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

const flagsPath = "https://purecatamphetamine.github.io/country-flag-icons/3x2/";
const flagsPathEnding = ".svg";
const countriesFlagsMap = new Map();
countriesFlagsMap.set("США", "US");
countriesFlagsMap.set("Франция", "FR");
countriesFlagsMap.set("Великобритания", "GB");
countriesFlagsMap.set("Германия", "DE");
countriesFlagsMap.set("Италия", "IT");
countriesFlagsMap.set("Канада", "CA");
countriesFlagsMap.set("Испания", "ES");
countriesFlagsMap.set("Бразилия", "BR");
countriesFlagsMap.set("Бельгия", "BE");
countriesFlagsMap.set("Швеция", "SE");
countriesFlagsMap.set("Дания", "DK");
countriesFlagsMap.set("Польша", "PL");
countriesFlagsMap.set("Кипр", "CY");
countriesFlagsMap.set("Норвегия", "NO");
countriesFlagsMap.set("Корея Южная", "KR");
countriesFlagsMap.set("Румыния", "RO");
countriesFlagsMap.set("Катар", "QA");
countriesFlagsMap.set("Тунис", "TN");
countriesFlagsMap.set("Ливан", "LB");
countriesFlagsMap.set("Швейцария", "CH");
countriesFlagsMap.set("Ирландия", "CI");
countriesFlagsMap.set("Аргентина", "AR");
countriesFlagsMap.set("Япония", "JP");
countriesFlagsMap.set("Германия (ФРГ)", "GB");
countriesFlagsMap.set("Беларусь", "GB");
countriesFlagsMap.set("Саудовская Аравия", "SA");
countriesFlagsMap.set("СССР", "GB");
countriesFlagsMap.set("Австралия", "AU");

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
    //const username = "mariiazavialova"; const first_name = "Dascha";
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '90%',
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

    const changeUKName = (name: String) => {
        if (name == "Великобритания") {
            return "Британия"
        } 
        return name;
    };

    const parseDate = (date: String) => {
        const year = Number(date.split('-')[0]);
        const month = Number(date.split('-')[1]);
        const day = Number(date.split('-')[2]);
        return day + " " + monthes2.get(month) + " " + year;
    }

    const youAreRate = (rate: number) => {
        if (rate < 3) {
            return "хейтер";
        }

        if (rate < 4) {
            return "нормис";
        }

        if (rate < 5) {
            return "ценитель";
        }
    }

    const youAreVisits = (count: number) => {
        if (count < 10) {
            return "- редкая пташка";
        }

        if (count < 20) {
            return "- завсегдатай";
        }

        if (count < 50) {
            return "есть Киноклуб";
        }
    }

    const youAreOffers = (count: number) => {
        if (count < 1) {
            return "невидимка";
        }

        if (count < 2) {
            return "новатор";
        }

        if (count < 5) {
            return "лидер мнений";
        }
    }

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
                <div className="text-xl"><b>{wrapped.eventsCount + 2}</b> Киноклубов!</div>
                <div className="text-xl">Это около <b>{(wrapped.eventsCount + 2 )*5}</b> часов вместе!</div>
                <div className="text-xl">Или <b>{(((wrapped.eventsCount + 2 )*5)/24).toFixed(1)}</b> суток!</div>
                <br/>
                <div className="text-xl">С 12 января 2024 по 12 января 2025 всего <b>52</b> воскресенья!</div>
                <div className="text-xl">И хоть киноклубы проходили не только по воскресеньям, </div>
                <div className="text-xl">они проводились раз в неделю!</div>
                <div className="text-xl">Значит за год было всего <b>{52 - (wrapped.eventsCount + 2 )}</b> недели без Киноклуба!</div>
                <br />
                <div className="text-xl">И хоть это не соревнование</div>
                <div className="text-xl">вот статистика :)</div>
                <br />
                <div className="text-2xl"><b>Завсегдатаи!</b></div>
                <div className="text-xl"><b>{username}</b>, вы посетили <b>{wrapped.visitedEventsCount}</b> встреч</div>
                <div className="text-xl">Вы <b>{youAreVisits((wrapped.visitedEventsCount))}!</b></div>
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
                {wrapped.firstEvent == null && (
                    <div>
                    <div className="text-xl">Ваш первый визит в этом году был</div>
                    <div className="text-xl"><b>{parseDate(wrapped.firstEvent)}</b></div>
                    <div className="text-xl">С того дня вы пропустили</div>
                    <div className="text-xl"><b>{wrapped.eventYouMissedCount}</b> встреч</div>
                    <br />
                    </div>
                )}
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
                <div className="text-xl">Вы - <b>{youAreOffers((wrapped.offeredByYou))}!</b></div>
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
                <div className="text-xl"> Ваша средняя оценка</div>
                <div className="text-xl"><b>{(wrapped.myRatingsAvg/10).toFixed(1)}</b></div>
                <div className="text-xl">Вы - <b>{youAreRate((wrapped.myRatingsAvg/10))}!</b></div>
                <br />
                <div className="text-xl"> Средняя оценка члена клуба</div>
                <div className="text-xl"><b>{(wrapped.allRatingsAvg/10).toFixed(1)}</b></div>
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
                        <div className="p-2 m-2">
                        <div>{entry.name}</div>
                        <div><b>{entry.value}</b></div>
                    </div>
                    ))}
                </div>
                <div className="text-2xl">Страны</div>
                <div className="grid gap-4 p-2 grid-cols-3">
                    {wrapped.countries.map((country: any) => (
                        <div className="m-2 border-4 p-2 m-2 rounded-xl" onClick={() => handleOpen(country.movies)}>
                            <div className="flex justify-center"><img className="col-start-1 w-2/3 border-2" src={flagsPath + countriesFlagsMap.get(country.country) + flagsPathEnding} /></div>
                            <div className="flex justify-center pt-2">{changeUKName(country.country)}</div>
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
                            >
                                <Box sx={style}>
                                    <div>
                                        {movies.map((movie: any) => (
                                            <div className="telegram-text">{movie.name}</div>
                                        ))}
                                    </div>
                                </Box>
                            </Modal>
            </div>
        </div>
        )}
        </>
    )
}

export default Wrapped;