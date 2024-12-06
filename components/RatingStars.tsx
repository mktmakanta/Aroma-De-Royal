import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { RatingStarsProps } from "@/Types/globalTypes";

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-400" />
        ))}
      {halfStars > 0 && <FaStarHalfAlt className="text-yellow-400" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-yellow-400" />
        ))}
    </div>
  );
};

export default RatingStars;
