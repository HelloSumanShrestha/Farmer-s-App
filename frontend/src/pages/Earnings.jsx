import React from 'react';
import Header from '../components/Header/Header';
import "../assets/css/Earning.scss"

const Earnings = () => {
    return (
        <div className="earning-container">
            <Header headerText={"Earnings"} />
            <div className="earning-main"></div>
        </div>
    );
};

export default Earnings;
