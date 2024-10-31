import { useEffect, useState } from "react";

function RegisteredMembers() {
    const max = 15;

    const [members, setMembers] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/members")
        .then(response => response.json())
        .then(json => {console.info(json), setMembers(json)})
        .catch(error => console.error(error))
    }, []);

    return (
        <>
            <div className="justify-center items-center">
                <div className="flex justify-center text-xl pb-2">{members.length}/{max}</div>
                {members.map((member) => {
                    return (
                        <div className="flex justify-center" key={member.id}>
                            <div className="m-2 p-2 bg-slate-400 border-solid rounded-2xl border-4 border-sky-500" key={member.id}><a href={"t.me/${member.userName}"}>@{member.userName}</a></div>
                            {member.freshBlood && 
                                <div className="m-2 p-2 bg-yellow-400 border-solid rounded-2xl border-4 border-sky-500">Впервые</div>
                            }
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default RegisteredMembers;