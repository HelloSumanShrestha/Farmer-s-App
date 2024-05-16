import React from 'react';
import '../../assets/css/footer.css';
import fb from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import LinkedIn from '../../assets/images/linkedin.png';
import inst from '../../assets/images/instagram.png';

function Footer() {
  return (
    <div className='footer'>
      <div className="sb-footer-section-padding">
        <div className="sb-footer-links">
          <div className="sb-footer-links-div">
            <h4>For Seller</h4>
            <a href="/signup">
              <p>Sign up</p>
            </a>
            <a href="/login">
              <p>Login</p>
            </a>
          </div>
          <div className="sb-footer-links-div">
            <h4>For User</h4>
            <a href="/login">
              <p>Login</p>
            </a>
            <a href="/signup">
              <p>Signup</p>
            </a>
            <a href="/cart">
              <p>Add to cart</p>
            </a>
          </div>
          <div className="sb-footer-links-div">
            <h4>Quick Links</h4>
            <a href="/product">
              <p>Products</p>
            </a>
            <a href="/categories">
              <p>Categories</p>
            </a>
            <a href="/aboutus">
              <p>About Us</p>
            </a>
            <a href="/testimonials">
              <p>Testimonials</p>
            </a>
          </div>
          <div className="sb-footer-links-div">
            <h4>Follow us on</h4>
            <div className="socialmedia">
              <p><img src={fb} alt=''/></p>
              <p><img src={twitter} alt=''/></p>
              <p><img src={LinkedIn} alt=''/></p>
              <p><img src={inst} alt=''/></p>
            </div>
          </div>
          {/* Contact Form */}
          <div className="sb-footer-links-div">
            <h4>Contact Us</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" />
              </div>
              <button type="submits">Send</button>
            </form>
          </div>
          {/* End Contact Form */}
        </div>
        <hr />
        <div className="sb-footer-below">
          <div className="sb-footer-copyright">
            <p>@2024 Farmers App All right reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
