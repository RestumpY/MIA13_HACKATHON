import React, { useEffect, useState } from "react";
import './test.css';

function BackgroundBody(props) {
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        // Commencez l'animation lorsque le composant est monté
        setAnimationStarted(true);
    }, []);

    return (
        <div className='bgd-body'>
            <div className='container row-container'>
                <div className='grid'>
                    {/* Générer dynamiquement les cellules de la grille */}
                    {Array.from({ length: 18 * 10 }).map((_, index) => (
                        <div
                            key={index}
                            className={`cell ${animationStarted ? 'animate' : ''}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BackgroundBody;
