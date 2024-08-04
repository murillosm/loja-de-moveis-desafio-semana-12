import React from "react";

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <i key={index} className="fa fa-star text-yellow-300"></i>
        ))}
      {halfStar && <i className="fa fa-star-half-alt text-yellow-300"></i>}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <i key={index} className="fa fa-star text-gray-300"></i>
        ))}
    </div>
  );
};

export default RatingStars;