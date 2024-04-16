import React from 'react';
import './testimonials.css';
import ceoImage from './farmers/khaire.jpg';
import janakImage from './farmers/janak.jpg';
import sumitImage from './farmers/sumit.jpg';

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
    <div className="testimonials-container" id='testimonials'>
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

export default Testimonials;
