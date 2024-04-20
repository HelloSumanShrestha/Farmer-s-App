import React from 'react';
import './aboutus.css';
import '@fortawesome/fontawesome-free/css/all.css';
import sanskarImage from './farmers/sanskar.jpg';
import devrajImage from './farmers/devraj.jpg';
import prithakImage from './farmers/prithak.png';
import romanImage from './farmers/roman.png';
import suman from "./farmers/suman.jpg"

export const AboutUs = () => {
  return (
    <section id="about-us">
      <div className="about-description">
        <h2>About Us</h2>
        <p>
          At our farmers' ecommerce platform, we are more than just a team - we are a family dedicated to revolutionizing the way people access fresh, organic produce. Our mission is to bridge the gap between farmers and consumers, ensuring fair trade practices, promoting sustainable agriculture, and delivering the finest quality products directly to your doorstep.
        </p>
        <p>
          We believe in the power of community and collaboration. By supporting local farmers and embracing eco-friendly practices, we strive to create a healthier, more vibrant world for generations to come.
        </p>
      </div>
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
          <img src={suman} alt="Suman Shrestha" />
          <h3>Suman Shrestha</h3>
          <p>Frontend Developer</p>
        </div>
        <div className="team-card">
          <img src={romanImage} alt="Roman Maharjan" />
          <h3>Roman Maharjan</h3>
          <p>Frontend Developer</p>
        </div>
      </div>
      <div className="footer">
        <div className="logo">
          <span className="sajha">SAJHA</span> <span className="baari">BAARI</span>
        </div>
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: contact@sajhabaari.com.np</p>
          <p>Phone: +977 9840753049</p>
          <p>Address: Naxal, Kathmandu, Nepal</p>
        </div>
        <div className="helps">
          <h3>Helps</h3>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li><a href="#">Fruit & Vegetables</a></li>
            <li><a href="#">Meat & Fish</a></li>
            <li><a href="#">Bakery Products</a></li>
            <li><a href="#">Discounted Products</a></li>
          </ul>
        </div>
      </div>
      <div className="social-media">
        <a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a>
        <a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
        <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i></a>
      </div>
      <div className="copyright">
        <p>Copyright @ Sajha Baari 2024. All Rights Reserved.</p>
      </div>
    </section>
  );
};
