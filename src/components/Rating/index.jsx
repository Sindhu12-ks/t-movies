import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  // Convert 10-point scale to 5-star scale
  const starsValue = rating / 2; 

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      {[...Array(5)].map((_, i) => {
        const starIndex = i + 1;
        
        // Full star
        if (starsValue >= starIndex) {
          return <FaStar key={i} color="#FFD700" />;
        }
        // Half star (if decimal is >= 0.25 and < 0.75)
        if (starsValue > starIndex - 1 && starsValue < starIndex) {
          return <FaStarHalfAlt key={i} color="#FFD700" />;
        }
        // Empty star
        return <FaRegStar key={i} color="#ccc" />;
      })}
      <span style={{ color: '#FFD700', fontWeight: 'bold', marginLeft: '5px' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
export default StarRating