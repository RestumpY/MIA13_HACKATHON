import React from "react";
import Menu from "../../components/menu/Menu";
import Header from "../../components/header/Header";
import "./Home.scss"
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import BackgroundBody from "../../components/test/test";
import { Link } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";


const Home = () => {

    // CONSTANTES
    const title = (
        <>
            <span className="addRed"> Après 120 ans</span> d'histoire de jeux olympiques, <br></br>
            prédisons le future des jeux <span className="addBlue">paris 2024 !</span>
        </>
    )
    const description = "BIENVENUE AUX HISTORIQUES DES JEUX OLYMPIQUES "


    return (
        <>
            <BackgroundBody />
            <Header children={<Menu />}
                title={title}
                description={description}
                imageUrl={'https://cdn.pixabay.com/photo/2020/05/10/18/30/olympics-5155137_1280.png'}
                backgroundImage={''}
                gradientCode={''}
                color={'black'}
            />

            <div id="projectDescription">
                <h3 className="titleObjectif"> Objectifs du projet</h3>
                <p className="descriptionObjectif">
                    Explorez 120 ans d'histoire des Jeux Olympiques à travers notre plateforme interactive. Découvrez :
                    <ul>
                        <li>
                            Base de Données Complète :
                            <ul><li> Plus de 21 000 médailles, 162 000 résultats, 74 000 athlètes et 53 pays hôtes.</li></ul>
                        </li>
                        <li>
                            Visualisations et Analyses :
                            <ul>
                                <li> Visualisez les performances des athlètes, les résultats par pays et les tendances historiques.</li>
                            </ul>
                        </li>
                        <li>
                            Application Web Interactive :
                            <ul>
                                <li>
                                    Naviguez facilement à travers les données et explorez l'histoire des Jeux Olympiques de manière dynamique et intuitive.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    Plongez dans l'histoire riche et passionnante des Jeux Olympiques !
                </p>
                <div className="linkContainer">
                    <Link className="linkGit" target="blank" to={'https://github.com/RestumpY/MIA13_HACKATHON'}>
                        Lien github
                        <MdOutlineArrowOutward className="iconeLink" />
                    </Link>
                    <Link className="linkTrello" target="blank" to={'https://trello.com/b/ZXgohXYQ/hackathon-team-13'}>
                        Lien Trello
                        <MdOutlineArrowOutward className="iconeLink" />
                    </Link>
                    <Link className="linkNotion" target="blank" to={'https://www.notion.so/G-n-ral-05f11786e220467f9c210d8ff2a33078'}>
                        Lien Notion
                        <MdOutlineArrowOutward className="iconeLink" />
                    </Link>
                </div>
            </div>
            <div id="team">
                <img className="imgTeam" src="https://olympics.com/athlete365/app/uploads/2023/01/FieldOfPlay-scaled.jpg" />
                <div id="teamContainer">
                    <h3 className="teamNames">Team 13</h3>
                    <div className="cardContainer">
                        <Card />
                    </div>
                </div>
            </div>
            <div id="projectFeedback">
                <div className="sectionTitle">
                    <h3 className="titleFeedback"> Feedback du projet</h3>
                    <img className="logoJO" src="https://i.pinimg.com/originals/c0/11/a5/c011a51ad84937936e9af692d95b2e2a.png" />
                </div>
                <p className="descriptionFeedback">
                    Votre avis est important pour nous ! Nous aimerions connaître vos impressions et suggestions concernant notre plateforme.
                    Votre feedback nous aidera à améliorer et enrichir notre application pour mieux répondre à vos besoins.
                </p>
                <p className="descriptionFeedback">
                    <h4>Comment nous contacter:</h4>
                    <ul>
                        <li>Email: team13@ecole-ipssi.com</li>
                        <li>Réseaux Sociaux: Suivez-nous et envoyez-nous vos messages sur <a href="#">Facebook, Twitter, Instagram</a>.</li>
                    </ul>
                    <span>Merci de prendre le temps de nous donner vos avis. Ensemble, nous pouvons rendre
                        l'exploration de l'histoire des Jeux Olympiques encore plus fascinante et accessible.
                    </span>
                </p>
            </div>
            <Footer />

        </>)
}
export default Home;