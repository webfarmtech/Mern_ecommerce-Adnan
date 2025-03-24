import React, { useContext, useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import StarRating from "./StarRating";
import { ShopContext } from "@/context/ShopContext";
import { toast } from "react-toastify";

const Review = ({ productsId }) => {
  const { token, review, addReview, getReview } = useContext(ShopContext);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState("");

  // At the top of your component
  const handleReview = () => {
    if (!token) {
      toast.error("You have to login first");
    }

    if ((!reviews && rating) || (reviews && !rating)) {
      toast.error("Please enter a both review message and give a rating");
      return;
    }

    addReview(productsId, rating, reviews).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviews("");
        getReview(productsId);
        toast.success("Review Added Successfully");
      }
    });
  };

  useEffect(() => {
    if (productsId) {
      getReview(productsId);
    }
  }, [productsId]);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  return (
    <div>
      <div className="max-h-[300px] overflow-auto">
        <div className="grid gap-6">
          {Array.isArray(review) && review.length > 0 ? (
            review.map((reviewItem) => (
              <div key={reviewItem._id} className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>
                    {reviewItem?.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{}</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarRating rating={reviewItem?.reviews[0].reviewValue} />
                  </div>
                  <p className="text-muted-foreground">
                    {reviewItem?.reviews[0]?.reviewMessage}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Reviews</h1>
          )}
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <Label>Write a Review</Label>
          <div className="flex mt-2 gap-1">
            <StarRating
              rating={rating}
              handleRatingChange={handleRatingChange}
            />
          </div>
          <Input
            name="reviewMsg"
            className="mt-2 w-auto rounded-md px-2 ml-1.5"
            value={reviews}
            onChange={(event) => setReviews(event.target.value)}
            placeholder="Write a review..."
          />
          <Button
            className="mx-2 mt-2  bg-black rounded-md"
            onClick={handleReview}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
