import { Slide } from "../Slide";
import { EmblaViewportRefType } from "embla-carousel-react";
import React, { RefObject, useEffect, useState } from "react";

interface Props {
  pdfRef: RefObject<HTMLDivElement>;
  emblaRef: EmblaViewportRefType;
  slides: Slide[];
}

const CarouselPages = ({ pdfRef, emblaRef, slides }: Props) => {
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://random.imagecdn.app/500/150");
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageData(reader.result as string); // Store the base64 image data
        };
        reader.readAsDataURL(blob); // Convert blob to base64
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    fetchImage(); // Fetch and set image on component mount
  }, []);

  return (
    <>
      <div ref={pdfRef}>
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slide) => (
              <div key={slide.id} className="embla__slide flex-[0_0_100%]">
                <div className="aspect-square flex flex-col justify-center p-8 bg-gradient-to-br from-blue-100 to-purple-100">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    {slide.title}
                  </h2>
                  <p className="text-xl text-gray-600">{slide.content}</p>
                  {imageData && (
                    <img
                      src={imageData} // Apply base64 image data to src
                      alt="Custom Image"
                      className="mt-4 w-full h-auto"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselPages;
