import React from 'react'
import Header from "../components/Header/Header"
import "../assets/css/Settings.scss"

export default function Settings() {
    return (
        <div className='settings-container'>
            <Header headerText={"Settings"} />
            <div className="settings-main"></div>
        </div>
    )
}
