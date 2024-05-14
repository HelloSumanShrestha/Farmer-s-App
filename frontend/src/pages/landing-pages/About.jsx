import React from 'react'

import about from "../../assets/images/aboutUsAnimation.gif";
import "../../assets/css/About.css"

export default function About() {
    return (
        <div className="about">
            <div className="about-text">
                <h2>Welcome to Farmer App</h2>
                <p>
                    At <strong>Farmer App</strong>, we are committed to providing you with the freshest
                    and highest quality products for your everyday needs.
                    Our extensive range includes fresh
                    vegetables, succulent meats, dairy products, pantry essentials, and much more. We carefully
                    select our suppliers to ensure that you receive only the best.<br /><br />

                    With our user-friendly interface and reliable delivery service, grocery shopping has never been
                    easier. Simply browse our wide selection, add items to your cart, and enjoy the convenience of
                    doorstep delivery. Say goodbye to long supermarket queues and heavy bags.<br /><br />

                    We take pride in our commitment to exceptional customer service. Our dedicated support team is
                    always ready to assist you with any questions or concerns you may have. Your satisfaction is our
                    top priority.<br /><br />

                    Experience the convenience and joy of shopping from the comfort of your home. Join us at <strong>Farmer App</strong> and discover a new way to grocery shop.<br /><br />

                    Start shopping now and make your everyday life healthier and more convenient.
                </p>
            </div>

            <div className="image">
                <img src={about} alt="" />
            </div>
        </div>
    )
}
