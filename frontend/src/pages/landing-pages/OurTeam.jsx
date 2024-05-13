import React from 'react';
import "../../assets/css/ourteam.css"

import sanskarImage from '../../assets/ourteam/sanskar.jpg';
import devrajImage from '../../assets/ourteam/devraj.jpg';
import prithakImage from '../../assets/ourteam/prithak.png';
import romanImage from '../../assets/ourteam/roman.png';
import suman from "../../assets/ourteam/suman.png"

function OurTeam() {
    return (
        <section id="about-us">
            <div className="about-description">
                <h2>About Us</h2>
                <p>
                    At our farmers' ecommerce platform, we are more than just a team - we are a family dedicated to revolutionizing the way people access fresh, organic produce. Our mission is to bridge the gap between farmers and consumers, ensuring fair trade practices, promoting sustainable agriculture, and delivering the finest quality products directly to your doorstep.
                </p>
                <br />
                <p>
                    We believe in the power of community and collaboration. By supporting local farmers and embracing eco-friendly practices, we strive to create a healthier, more vibrant world for generations to come.
                </p>
            </div>

            <div className="our-team">

                <h2>Our Team</h2>
                <div className="team-cards">
                    <div className="team-card">
                        <img src={sanskarImage} alt="Sanskar Lamgade" />
                        <h3>Sanskar Lamgade</h3>
                        <p>Project Manager/CEO</p>
                    </div>
                    <div className="team-card">
                        <img src={devrajImage} alt="Devraj Khatri" />
                        <h3>Devraj Khatri</h3>
                        <p>Business Analyst</p>
                    </div>
                    <div className="team-card">
                        <img src={prithakImage} alt="Prithak Rai" />
                        <h3>Prithak Rai</h3>
                        <p>Backend Developer/Database administrator</p>
                    </div>
                    <div className="team-card">
                        <img src={romanImage} alt="Roman Maharjan" />
                        <h3>Roman Maharjan</h3>
                        <p>Frontend Developer</p>
                    </div>
                    <div className="team-card">
                        <img src={suman} alt="Suman Shrestha" />
                        <h3>Suman Shrestha</h3>
                        <p>Frontend Developer</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;