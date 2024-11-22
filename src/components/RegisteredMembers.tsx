import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";

function RegisteredMembers() {
    const max = 15;

    const [members, setMembers] = useState<any>([])

    useEffect(() => {
        fetch(BASE_URL + "/members")
        .then(response => response.json())
        .then(json => {console.info(json), setMembers(json)})
        .catch(error => console.error(error))
    }, []);

    return (
        <>
            <div className="justify-center items-center telegram-bg">
                <div className="flex justify-center text-xl pb-2 telegram-text">{members.length}/{max}</div>
                {members.map((member: any) => {
                    return (
                        <div className="flex justify-center" key={member.id}>
                            <div className="m-2 p-2 border-solid rounded-2xl border-4 telegram-border telegram-text" key={member.id}><a href={`https://t.me/${member.userName}`}>@{member.userName}</a></div>
                            {member.freshBlood && 
                                <div className="m-2 p-2 bg-yellow-400 border-solid rounded-2xl border-4">Впервые</div>
                            }
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default RegisteredMembers;