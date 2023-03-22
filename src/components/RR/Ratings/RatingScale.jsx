import React from 'react';

function RatingScale({ stars, numReviews, totalReviews }) {
  const calculatePercentage = Math.round((numReviews / totalReviews) * 100).toString();
  console.log(calculatePercentage);

  return (
    <div className="flex">
      <div className="text-xs underline">
        {stars}
        {' stars '}
      </div>
      <div className="w-full h-2 mx-2 mt-4 bg-gray-400 ">
        <span className={`w-[${calculatePercentage}%] h-full bg-green-400 block relative`} />
      </div>
      <div className="text-xs">
        {numReviews}
      </div>
    </div>
  );
}

export default RatingScale;
