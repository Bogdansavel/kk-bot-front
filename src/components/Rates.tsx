import { useTelegram } from './UseTelegram';
import { useEffect, useState } from "react";
import { BASE_URL } from '../Constants';
import { useParams, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarBorder from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import { useNavigate } from "react-router-dom";

function Rates() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const {webApp, executeMethod} = useTelegram();
    //const { username } = webApp.initDataUnsafe?.user
   const username = "test";

    const handleClick = async () => {
        executeMethod('HapticFeedback.impactOccurred', () => webApp.HapticFeedback.impactOccurred("soft"), true);
    };

    const trimName = (name : string) => {
        if (name) {
            if (name.length > 15) {
                return name.substring(0, 12) + "..."
            }
        } 
        return name;
    };

    const defaultMovie = {
        id: '',
        kinopoiskId: 0,
        name: '',
        ratings: []
    }
    const defaultAverage = {
        movieName: '?',
        rating: 0
    }
    const defaultYourRate = {
        username: '',
        movieId: '',
        rating: 0,
        liked: false,
        discussable: false
    }
    const [movie, setMovie] = useState<any>(defaultMovie);
    const [average, setAverage] = useState<any>(defaultAverage);
    const [yourRate, setYourRate] = useState<any>(defaultYourRate);

    useEffect(() => {
        fetch(BASE_URL + `/rate/${movieId}/${username}`)
        .then(response => {
            if (response.status == 404) {
                navigate("/rate/" + movieId)
            };
            return response;
        })
        .then(response => response.json())
        .then(json => {
            console.info(json), 
            setYourRate(json)
        })
        .catch(error => console.error(error));

        fetch(BASE_URL + "/movie/" + movieId)
        .then(response => response.json())
        .then(json => {
            console.info(json); 
            setMovie(json);
        })
        .catch(error => console.error(error));

        fetch(BASE_URL + "/rate/average/" + movieId)
        .then(response => response.json())
        .then(json => {
            console.info(json), 
            setAverage(json)
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <>
            <div className='flex justify-center pb-2'>
                <label className='telegram-text text-center text-2xl'>Средняя оценка фильма<br/>"{average.movieName}"<br />от Киноклуба</label>
            </div>
            <div className='flex justify-center text-5xl pb-4'>
                <label className='opacity-50 telegram-text'>{average.rating / 10}</label>
            </div>
            <div className='flex justify-center pb-2'>
                <label className='opacity-50 telegram-text align-middle'>Моя оценка: </label>
                <Rating 
                        className='pl-1'
                        emptyIcon = {<StarBorder fontSize="inherit" htmlColor='#ffa726'/>}
                        name="half-rating" value={yourRate.rating / 10} precision={0.5} size="large" readOnly />
                <div>{yourRate.liked ? <FavoriteIcon color='error' className='align-middle ml-1'/> : <FavoriteBorderIcon color='error' className='align-middle ml-1'/>}</div>
                <div>{yourRate.discussable ? <RecordVoiceOverIcon color='primary' className='align-middle ml-1'/> : <RecordVoiceOverOutlinedIcon color='primary' className='align-middle ml-1'/>}</div>
            </div>
            <div className='flex justify-center pb-8'>
                <Link onClick={handleClick} to={'/rate/' + movieId} className='telegram-text'>Изменить оценку</Link>
            </div>
            <div className='flex justify-center'>
                <label className='opacity-50 telegram-text'>Оценки участников:</label>
            </div>
            {movie.ratings.filter((r : any) => r.username != username).map((rating : any) =>
                <div className='flex justify-center'>
                    <div className='flex align-middle justify-center m-2 p-2 border-solid rounded-2xl border-2 telegram-border telegram-text align-middle'>
                        <label className='opacity-50 telegram-text px-2'><a href={`https://t.me/${rating.username}`} className='align-middle underline'>{trimName(rating.firstName)}</a>: </label>
                        <Rating 
                                emptyIcon = {<StarBorder fontSize="inherit" htmlColor='#ffa726'/>}
                                name="half-rating" value={rating.rating / 10} precision={0.5} size="large" readOnly />
                        {rating.liked && <FavoriteIcon color='error' className='align-middle ml-1'/>}
                        {rating.discussable && <RecordVoiceOverIcon color='primary' className='align-middle ml-1'/>}
                    </div>
                </div>
            )}
        </>
    )
}

export default Rates;