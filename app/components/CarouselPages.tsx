import { Slide } from "../Slide";
import { EmblaViewportRefType } from "embla-carousel-react";
import React, { useEffect, useState, RefObject } from "react";

interface Props {
  pdfRef: RefObject<HTMLDivElement>;
  emblaRef: EmblaViewportRefType;
  slides: Slide[];
}

const CarouselPages = ({ pdfRef, emblaRef, slides }: Props) => {
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the image after the component has mounted
    const fetchImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/200/300/?blur");
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageData(reader.result as string); // Set the image as base64 data URL
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div ref={pdfRef}>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="embla__slide flex-[0_0_100%] relative"
            >
              {/* Background Image */}
              {imageData && (
                <img
                  src={imageData}
                  alt="Background"
                  className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
              )}
              {/* Slide Content */}
              <div className="relative z-10 aspect-square flex flex-col justify-center p-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {slide.title}
                </h2>
                <p className="text-xl text-gray-600">{slide.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselPages;
