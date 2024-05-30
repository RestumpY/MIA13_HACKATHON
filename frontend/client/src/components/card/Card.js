import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";

const Card = () => {
    const [team, setTeam] = useState([{
        "name": "Ndeye Mbar Coulibaly",
        "mission": "Dev FullStack",
        "avatar": "https://img.freepik.com/psd-gratuit/rendu-3d-du-personnage-avatar_23-2150611737.jpg?size=626&ext=jpg"
    }, {
        "name": "Frederic ZAI",
        "mission": "Dev FullStack",
        "avatar": "https://img.freepik.com/psd-gratuit/rendu-3d-du-personnage-avatar_23-2150611713.jpg?w=740&t=st=1716859959~exp=1716860559~hmac=1211f449a60dc88a6559b92198e7435b51b28188d6f0b98394aa983e9444abe4"
    }, {
        "name": "Tania MAHOUCHE",
        "mission": "Cheffe de groupe",
        "avatar": "https://img.freepik.com/psd-gratuit/rendu-3d-du-personnage-avatar_23-2150611737.jpg?size=626&ext=jpg"
    }, {
        "name": "Corentin MAILLE",
        "mission": "Data Analyste",
        "avatar": "https://img.freepik.com/psd-gratuit/rendu-3d-du-personnage-avatar_23-2150611713.jpg?w=740&t=st=1716859959~exp=1716860559~hmac=1211f449a60dc88a6559b92198e7435b51b28188d6f0b98394aa983e9444abe4"
    }
        , {
        "name": "Yannis LANISTA",
        "mission": "Data Analyste",
        "avatar": "https://img.freepik.com/psd-gratuit/rendu-3d-du-personnage-avatar_23-2150611713.jpg?w=740&t=st=1716859959~exp=1716860559~hmac=1211f449a60dc88a6559b92198e7435b51b28188d6f0b98394aa983e9444abe4"
    }, {
        "name": "Fatima OUDAHMANE",
        "mission": "Data Analyste",
        "avatar": "https://img.freepik.com/psd-gratuit/rendu-3d-du-personnage-avatar_23-2150611737.jpg?size=626&ext=jpg"
    }, {
        "name": " Nawfel ZENZELAOUI",
        "mission": "Data Analyste",
        "avatar": "https://img.freepik.com/psd-gratuit/rendu-3d-du-personnage-avatar_23-2150611713.jpg?w=740&t=st=1716859959~exp=1716860559~hmac=1211f449a60dc88a6559b92198e7435b51b28188d6f0b98394aa983e9444abe4"
    },
        {
            "name": "Sabrina PAUVADAY",
            "mission": "Data Analyste",
            "avatar": "https://img.freepik.com/psd-gratuit/rendu-3d-du-personnage-avatar_23-2150611737.jpg?size=626&ext=jpg"
        },
    ]);

    return (
        <>

            {team && team.map((member, index) => (
                <div className="card" key={index}>
                    <div className="avatarContainer">
                        <img src={member.avatar} />
                    </div>
                    <div className="textCard">
                        <h3 className="nameMember">{member.name}</h3>
                        <p className="mission">{member.mission}</p>
                        <FaGithub />
                    </div>
                </div>

            ))}
        </>)

}
export default Card;