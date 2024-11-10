import { Slide } from "../Slide";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface Props {
  prevSlide: () => void;
  nextSlide: () => void;
  currentSlide: number;
  slides: Slide[];
  scrollTo: (target: number) => void;
}

const CarouselNav = ({
  prevSlide,
  nextSlide,
  scrollTo,
  currentSlide,
  slides,
}: Props) => {
  return (
    <>
      <div className="px-4 py-2 flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={prevSlide}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 flex items-center space-x-2">
          <Slider
            value={[currentSlide]}
            min={0}
            max={slides.length - 1}
            step={1}
            className="flex-1"
            onValueChange={(value) => scrollTo(value[0])}
          />
          <span className="text-sm text-gray-500 min-w-[40px] text-center">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
        <Button variant="outline" size="icon" onClick={nextSlide}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default CarouselNav;
