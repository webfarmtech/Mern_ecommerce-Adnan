import React, { useContext, useEffect, useState } from "react";
import { heroContent } from "../constant";
import { ThickTitleBorder, ThinTitleBorder } from "./Title";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ShopContext } from "@/context/ShopContext";

const Hero = () => {
  const { banner } = useContext(ShopContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banner.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [banner]);

  return (
    <div className="mt-2 flex flex-col sm:flex-row border border-gray-400F rounded-lg">
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
        {banner && banner.length > 0
          ? banner.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover ease-in duration-700`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + banner.length) % banner.length
            )
          }
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % banner.length)
          }
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
