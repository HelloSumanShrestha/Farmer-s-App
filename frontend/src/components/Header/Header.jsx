import React from 'react'
import '../../assets/css/Header.scss'
import dp from "../../assets/images/saitama.jpg"

export default function Header({ setIsLoggedIn }) {
    return (
        <div className="header">

            <p className="header-text">
                Saajha Baari
            </p>

            <div className="header-user">
                <div className="user-image">
                    <img src={dp} alt="pfp" />
                </div>
                <h3 className="header-username">
                    {localStorage.getItem("username")}
                </h3>

                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            </div>



        </div >
    )
}