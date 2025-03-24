import './Menu.scss';
import { Link } from 'react-router-dom';

// Redux import 

// Hooks
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';



function Menu(props) {
    // STATE
    const [isWindowDown, setWindowDown] = useState(false);

    // ROUTER & REDUX CONSTANTES
    const location = useLocation();

    const [prevScrollPos, setPrevScrollPos] = useState(0);

    // EFFECTS
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (currentScrollPos > prevScrollPos) {
                setWindowDown(true);
            } else {
                setWindowDown(false);
            }
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [prevScrollPos]);

    // FUNCTIONS 

    return (
        <>
            <div className={prevScrollPos <= 10 ? 'initialNavbar' : 'scrollNavbar'}>
                <div className='container'>
                    <img className='logo' src='https://i.pinimg.com/originals/c0/11/a5/c011a51ad84937936e9af692d95b2e2a.png'
                        alt='logo olympics 2024' />
                    <div className='linkContainer'>
                        <Link className={`link ${location.pathname === '/' ? 'activeLink' : ''}`} to={'/'}>
                            Accueil
                        </Link>
                        {/* <Link className={`link ${location.pathname === '/data' ? 'activeLink' : ''}`} to={'/data'}>
                            Data
                        </Link>
                        <Link className={`link ${location.pathname === '/analysis' ? 'activeLink' : ''}`} to={'/analysis'}>
                            Analyses
                        </Link> */}
                        <Link className={`link ${location.pathname === '/visualisations' ? 'activeLink' : ''}`} to={'/visualisations'}>
                            Visualisations
                        </Link>
                        <Link className={`link ${location.pathname === '/predictions' ? 'activeLink' : ''}`} to={'/predictions'}>
                            Predictions
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;