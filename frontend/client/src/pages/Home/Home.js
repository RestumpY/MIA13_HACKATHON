import React from "react";
import Menu from "../../components/menu/Menu";
import Header from "../../components/header/Header";
import "./Home.css"
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import BackgroundBody from "../../components/test/test";


const Home = () => {

    // CONSTANTES
    const title = (
        <>
            <span className="addRed">120 years</span> of olympics history, <br></br>
            now let's predict <span className="addBlue">paris 2024 !</span>
        </>
    )
    const description = "BIENVENUE AUX JEUX OLYMPIQUES HISTORIQUES"


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