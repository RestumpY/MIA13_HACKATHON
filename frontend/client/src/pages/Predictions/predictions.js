import React from "react";
import Menu from "../../components/menu/Menu";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackgroundBody from "../../components/test/test";
import PredictionsChart from "../../components/PredictionsChart/PredictionsChart";

const Predictions = () => {
    // STATE
    const title = (
        <>
            <span >Presentation de nos prédictions</span>
        </>)
    const description = "Découvrer nos prédictions de résultats des JO 2024"

    // CONSTANTES
    const backgroundImage = 'https://i.pinimg.com/564x/b3/d6/18/b3d618735641b2bad3e2e65e79a3b7a5.jpg';

    return (
        <>
            <BackgroundBody />
            
            <Header
                children={<Menu />}
                title={title}
                description={description}
                gradientCode={'rgba(6, 7, 7, 0) 10%, rgb(6, 6, 7)'} // Corrected gradient code rgba(6, 7, 7, 0) 10%, rgb(6, 6, 7)
                backgroundImage={'https://images.pexels.com/photos/18119175/pexels-photo-18119175/free-photo-of-ville-gens-personnes-individus.jpeg'}
                color={' white '}
                descriptionColor={"white"}
                None={'none'} 
                Separator={'none'}/>
            <div>
                <PredictionsChart />
            </div>
            <Footer />
        </>
    );
}

export default Predictions;
