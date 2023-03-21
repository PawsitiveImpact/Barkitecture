import React from 'react';

function RatingScale({ stars, numReviews, totalReviews }) {
  return (
    <div>
      <div>
        {stars}
        {' stars '}
        {numReviews}
      </div>
    </div>
  );
}

export default RatingScale;
