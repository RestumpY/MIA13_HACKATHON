import './Header.scss';

// REDUX IMPORT 

// HOOKS
import React, { useState, useEffect } from "react";

function Header({
    children,
    title,
    description,
    descriptionColor,
    imageUrl,
    gradientCode,
    backgroundImage,
    color,
    None, 
    Separator }) {
    // STATE

    // FUNCTIONS

    return (
        <>
            <div
                className='header'
                style={{
                    backgroundImage: `linear-gradient(${gradientCode}), url(${backgroundImage})`,
                    backgroundSize: 'cover', // Ensure the background image covers the area
                    backgroundPosition: 'center' // Center the background image
                }}
            >
                {
                    children
                }
                <h2
                    className='title'
                    style={{ color: color }}

                >{title}</h2>
                <p className='description' style={{color: descriptionColor}}>{description}</p>
                <img
                    className='heroImage'
                    style={{ display: None }}
                    src={imageUrl}
                    alt='header image' />
                <div 
                className='separator'
                style={{display : Separator}} ></div>
            </div>
        </>
    );
}

export default Header;