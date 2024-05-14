import React from "react";
import "../../assets/css/ourteam.css";
import ceoImage from "../../assets/ourteam/khaire.jpg";
import janakImage from "../../assets/ourteam/janak.jpg";
import sumitImage from "../../assets/ourteam/sumit.jpg";
import sanskarImage from "../../assets/ourteam/sanskar.jpg";
import devrajImage from "../../assets/ourteam/devraj.jpg";
import prithakImage from "../../assets/ourteam/prithak.png";
import romanImage from "../../assets/ourteam/roman.png";
import suman from "../../assets/ourteam/suman.jpg";

const testimonialsData = [
  {
    id: 1,
    name: 'James Anderson',
    position: 'CEO of Healthy Foods',
    testimonial: ' Sajha Baari has completely changed the way I shop for groceries. I love knowing that I am supporting local farmers while getting the freshest produce possible. Plus, the user-friendly interface makes it so easy to find exactly what I need!',
    image: ceoImage,
    stars: 5,
  },
  {
    id: 2,
    name: 'Janak Gharti',
    position: 'CEO of Vroom Car Rental',
    testimonial: 'As someone who cares about sustainability, I am thrilled to have discovered Sajha Baari. It is amazing to see a platform that prioritizes fair trade and environmental consciousness. The variety of fresh produce available is unmatched, and I feel good knowing that my purchases are making a positive impact.',
    image: janakImage,
    stars: 4,
  },
  {
    id: 3,
    name: 'Sumit Khadka',
    position: 'Labour of Kadaghari',
    testimonial: 'I have been using Sajha Baari for a few months now, and I cannot imagine going back to traditional grocery shopping. Not only is the produce incredibly fresh and high-quality, but it is also inspiring to know that I am directly supporting local farmers. Sajha Baari truly embodies the spirit of community and empowerment.',
    image: sumitImage,
    stars: 5,
  },  
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2 className="testimonials-heading">Our Customer Testimonials</h2>
      <div className="testimonials-list">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <div className="testimonial-info">
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-position">{testimonial.position}</p>
              <div className="testimonial-stars">{Array.from({ length: testimonial.stars }, (_, i) => <span key={i} className="star-icon">⭐</span>)}</div>
              <p className="testimonial-text">{testimonial.testimonial}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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

            {/* Testimonials Component */}
            <Testimonials />
        </section>
    );
};

export default OurTeam;
