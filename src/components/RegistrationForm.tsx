import { Button, Label, Checkbox, TextInput, Select } from "flowbite-react"

function RegistrationForm() {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form>
                    <div className="mb-4">
                        <h1 className="text-xl"><b>Регистрация на шведский кружок АБФ "КиноКлуб" в Кракове</b></h1>
                        <h2 className="text-xl">"Леон", 29 сентября 17:00</h2>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="mb-1">
                                <Label htmlFor="name" value="Ваше имя/псевдоним"/>
                            </div>
                            <TextInput id="name" required />
                        </div>
                        <div>
                            <div className="mb-1 flex">
                                <Label htmlFor="gender" value="Гендер/Пол" />
                            </div>
                            <Select id="gender" required>
                                <option>Мужской</option>
                                <option>Женский</option>
                                <option>Квир</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-1">
                                <Label htmlFor="firstly" value="Впервые на кружке АБФ в Польше?" />    
                            </div>
                            <Select id="firstly" required>
                                <option>Да</option>
                                <option>Нет</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-1">
                                <Label htmlFor="contact" value="Ваш контакт (желательно ник в телеграмме через @)" />
                                <p className="py-1 text-xs">
                                    Просим заполнять этот пункт внимательно. Это поможет нам в ведении статистики.<br />
                                    Шутки можно писать в поле имени)<br /> 
                                    Спасибо
                                </p>
                            </div>
                            <TextInput id="contact" required />
                        </div>
                        <div className="mb-2 flex items-center gap-2">
                            <Checkbox id="accept" required/>
                            <Label htmlFor="accept" value="Согласие на предоставление контактной информации" />
                        </div>
                        <div>
                            <Button className="w-full mt-4" type="submit">Зарегестрироваться</Button>
                        </div>
                    </div>
                </form>    
            </div>
        </>
    )
}

export default RegistrationForm;