import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";

function StarRating({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star, index) => (
    <Button
      key={index}
      className={`p-2 size-4 rounded-full transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="ghost"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`${star <= rating ? "fill-yellow-500" : "fill-black"}`}
      />
    </Button>
  ));
}

export default StarRating;
