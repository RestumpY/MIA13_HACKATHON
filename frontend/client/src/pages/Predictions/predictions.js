import React from "react";
import Menu from "../../components/menu/Menu";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackgroundBody from "../../components/test/test";
import PredictionsChart from "../../components/PredictionsChart/PredictionsChart";

const Predictions = () => {
    // STATE

    // CONSTANTES
    const backgroundImage = 'https://i.pinimg.com/564x/b3/d6/18/b3d618735641b2bad3e2e65e79a3b7a5.jpg';

    return (
        <>
            <BackgroundBody />
            <Header 
                children={<Menu />} 
                title={'Take a deep dive into our Predictions'} 
                description={''} 
                descriptionColor={'black'}
                imageUrl={''}
                backgroundImage={backgroundImage}
                color={'black'}
                None={'none'} 
            />
            <div>
                <h2>Page Predictions</h2>
                <PredictionsChart />
            </div>
            <Footer />
        </>
    );
}

export default Predictions;
