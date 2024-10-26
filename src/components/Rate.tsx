import Rating from '@mui/material/Rating';
import { Button } from "flowbite-react";
import { useTelegram } from './UseTelegram';

function Rate() {
    const {webApp} = useTelegram()
    var rate = 4.5;

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form>
                    <div className='flex justify-center text-xl pb-2'>
                        <label className='opacity-50'>Средняя оценка Киноклуба</label>
                    </div>
                    <div className='flex justify-center text-5xl pb-4'>
                        <label className='opacity-50'>{rate}</label>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-sm'>Как фильм</p>
                    </div>
                    <div className='flex justify-center'>
                        <Rating 
                        onChange={() => {
                            webApp.HapticFeedback.impactOccured("soft");
                          }}
                        name="half-rating" defaultValue={0} precision={0.5} size="large" />
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-sm'>Как предмет обсуждения</p>
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