import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './StarRating.css'; // Import your CSS file for styling

const StarRating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const maxStars = 5;

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
    
    if (onRatingChange) {
      onRatingChange(clickedRating);
    }
  };

  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        <FaStar key={i} className="star" onClick={() => handleStarClick(i)} />
      );
    } else if (i - 0.5 === rating) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className="star"
          onClick={() => handleStarClick(i - 0.5)}
        />
      );
    } else {
      stars.push(
        <FaStar
          key={i}
          className="star empty"
          onClick={() => handleStarClick(i)}
        />
      );
    }
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;

