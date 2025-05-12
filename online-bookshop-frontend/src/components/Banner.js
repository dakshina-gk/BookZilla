import React from 'react';
import '../css/Banner.css';
import bannerImage from '../assets/banner-books1.png'; 
const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-text">
        <h1>
          Discover <span className="highlight">B</span>ooks ✏️ <br />
          That Inspire Your World
          {/* Stories that <span className="highlight">stay</span> with you.. */}
        </h1>
        <p>
        Dive into a curated collection of thought-provoking reads—from timeless classics to hidden gems. Whether you're chasing adventure, knowledge, or escape, there's a book here waiting to change your world.
        </p>
        <button className="banner-button">Explore Now</button>
      </div>
      <div className="banner-image">
        <img src={bannerImage} alt="Books Stack" />
      </div>
    </section>
  );
};

export default Banner;
