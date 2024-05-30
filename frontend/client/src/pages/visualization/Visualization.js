import React from "react";
import Menu from "../../components/menu/Menu";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackgroundBody from "../../components/test/test";


const Visualisations = () => {
    // STATE

    // CONSTANTES
    const backgroundImage = 'https://i.pinimg.com/564x/b3/d6/18/b3d618735641b2bad3e2e65e79a3b7a5.jpg';


    return (
        <>
            <BackgroundBody />
            <Header children={<Menu />} 
            title={'Take a deep dive into our Visualisations'} 
            description={''} 
            descriptionColor={"black"}
            imageUrl={''}
            backgroundImage={backgroundImage} 
            color={"black"}
            None={'none'} 
            />
                <div>
                    <iframe title="Dashboard_JO" width="1500" height="1000" src="https://app.powerbi.com/reportEmbed?reportId=2cdbd5a9-9dea-4616-aeff-c71f927b4e9e&autoAuth=true&ctid=108bc864-cdf5-4ec3-8b7c-4eb06be1b41d" frameborder="0" allowFullScreen="true"></iframe>
                </div>
            <Footer />

        </>)
}
export default Visualisations;