import React from 'react';
const AnimatedSportsCar = ({
  className = ""
}: {
  className?: string;
}) => {
  return <div className={`animated-sports-car-container ${className}`}>
      <div className="sports-car">
        {/* Car Body */}
        <div className="car-body">
          
          
          
          
        </div>
        
        {/* Car Wheels */}
        <div className="car-wheels">
          <div className="car-wheel car-wheel-front">
            <div className="car-wheel-rim"></div>
          </div>
          <div className="car-wheel car-wheel-rear">
            <div className="car-wheel-rim"></div>
          </div>
        </div>
        
        {/* Car Details */}
        <div className="car-details">
          <div className="car-headlights"></div>
          <div className="car-taillights"></div>
          <div className="car-grille"></div>
        </div>
        
        {/* Speed Effects */}
        <div className="car-speed-lines">
          <div className="car-speed-line car-line-1"></div>
          <div className="car-speed-line car-line-2"></div>
          <div className="car-speed-line car-line-3"></div>
          <div className="car-speed-line car-line-4"></div>
        </div>
      </div>
    </div>;
};
export default AnimatedSportsCar;