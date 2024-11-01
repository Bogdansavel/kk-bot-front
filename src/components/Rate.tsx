import Rating from '@mui/material/Rating';
import { Button } from "flowbite-react";
import { useTelegram } from './UseTelegram';

function Rate() {
    const {webApp, executeMethod} = useTelegram()
    var rate = 4.5;

    return (
        <>
            <div className="flex justify-center items-center">
                <form>
                    <div className='flex justify-center text-xl pb-2'>
                        <label className='opacity-50 telegram-text'>Средняя оценка Киноклуба</label>
                    </div>
                    <div className='flex justify-center text-5xl pb-4'>
                        <label className='opacity-50 telegram-text'>{rate}</label>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-sm telegram-text'>Как фильм</p>
                    </div>
                    <div className='flex justify-center'>
                        <Rating 
                        onChange={() => {
                            executeMethod('HapticFeedback.selectionChanged', webApp.HapticFeedback.selectionChanged, true)
                          }}
                        sx={{
                            fontSize: "4rem"
                        }}
                        name="half-rating" defaultValue={0} precision={0.5} size="large" />
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-sm telegram-text'>Как предмет обсуждения</p>
                    </div>
                    <div className='flex justify-center'>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size="large" />    
                    </div>
                    <div className='flex justify-center pt-4'>
                        <Button color="yellow" pill>Оценить</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Rate;