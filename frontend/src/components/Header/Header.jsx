import React from 'react'
import '../../assets/css/Header.scss'
import dp from "../../assets/images/saitama.jpg"

export default function Header({ headerText }) {
    return (
        <div className="header">

            <p className="header-text">
                {headerText}
            </p>

            <div className="header-user">
                <div className="user-image">
                    <img src={dp} alt="pfp" />
                </div>
                <h3 className="header-username">
                    Suman Shrestha
                </h3>
            </div>
        </div>
    )
}
