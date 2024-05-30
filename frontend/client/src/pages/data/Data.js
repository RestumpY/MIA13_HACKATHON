import React from "react";
import Header from "../../components/header/Header";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/footer/Footer";
import TabData from "./TabData";
import BackgroundBody from "../../components/test/test";
const Data = () => {
    const title = (
        <>
            <span >Presentation de la data</span>
        </>)
    const description = "Plongez dans les données!"

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
                <TabData />
            </div>
            <div>
                <Footer />
            </div>
        </>)
}
export default Data;