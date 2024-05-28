import React from "react";
import Menu from "../../components/menu/Menu";
import Header from "../../components/header/Header";
import "./Home.css"
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";


const Home = () => {
    const title = (
        <>
            <span className="red">120 years of olympics</span> history, Now let’s predict <span className="blue">Paris 2024 !</span>
        </>)
    const description = "Welcome to the official ticketing website of the Paris 2024 Olympic and Paralympic Games!"
    const imgUrl = "https://cdn.pixabay.com/photo/2020/05/10/18/30/olympics-5155137_1280.png"
    return (
        <>

            <Header Children={<Menu />} title={title} description={description} imgUrl={imgUrl} />
            <div id="projectDescription">
                <h3 className="titleObjectif"> Objectifs du projet</h3>
                <p className="descriptionObjectif"> 1. Analyze and create visualizations on an Olympic dataset from 1896 to 2016 to uncover which countries
                    stay at the top overtime, by season, and by sport; what it takes for an Olympian to be at the top for
                    each sport, sport popularity, and the relationship between Olympic Medal counts and country’s GDP.
                    1. Analyze and create visualizations on an Olympic dataset from 1896 to 2016 to uncover which countries
                    stay at the top overtime, by season, and by sport; what it takes for an Olympian to be at the top for
                    each sport, sport popularity, and the relationship between Olympic Medal counts and country’s GDP.
                </p>
                <p className="descriptionObjectif"> 1. Analyze and create visualizations on an Olympic dataset from 1896 to 2016 to uncover which countries
                    stay at the top overtime, by season, and by sport; what it takes for an Olympian to be at the top for
                    each sport, sport popularity, and the relationship between Olympic Medal counts and country’s GDP.
                    1. Analyze and create visualizations on an Olympic dataset from 1896 to 2016 to uncover which countries
                    stay at the top overtime, by season, and by sport; what it takes for an Olympian to be at the top for
                    each sport, sport popularity, and the relationship between Olympic Medal counts and country’s GDP.
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
                <p className="descriptionFeedback"> 1. Analyze and create visualizations on an Olympic dataset from 1896 to 2016 to uncover which countries
                    stay at the top overtime, by season, and by sport; what it takes for an Olympian to be at the top for
                    each sport, sport popularity, and the relationship between Olympic Medal counts and country’s GDP.
                    1. Analyze and create visualizations on an Olympic dataset from 1896 to 2016 to uncover which countries
                    stay at the top overtime, by season, and by sport; what it takes for an Olympian to be at the top for
                    each sport, sport popularity, and the relationship between Olympic Medal counts and country’s GDP.
                </p>
                <p className="descriptionFeedback"> 1. Analyze and create visualizations on an Olympic dataset from 1896 to 2016 to uncover which countries
                    stay at the top overtime, by season, and by sport; what it takes for an Olympian to be at the top for
                    each sport, sport popularity, and the relationship between Olympic Medal counts and country’s GDP.
                    1. Analyze and create visualizations on an Olympic dataset from 1896 to 2016 to uncover which countries
                    stay at the top overtime, by season, and by sport; what it takes for an Olympian to be at the top for
                    each sport, sport popularity, and the relationship between Olympic Medal counts and country’s GDP.
                </p>
            </div>
            <Footer />

        </>)
}
export default Home;