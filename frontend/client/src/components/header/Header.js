import React, { Children } from "react";
import "./Header.css";

const Header = ({ Children, title, description, imgUrl }) => {
    return (
        <div className="header">{Children}
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <img className="imgUrl" src={imgUrl} />
            <div className="separator"></div>
        </div>

    )

}
export default Header;