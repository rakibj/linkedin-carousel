import { Slide } from "../Slide";
import { EmblaViewportRefType } from "embla-carousel-react";
import React, { useEffect, useState, RefObject } from "react";

interface Props {
  pdfRef: RefObject<HTMLDivElement>;
  emblaRef: EmblaViewportRefType;
  slides: Slide[];
  backgroundImage: string;
  selectedFont: string;
  headerColor: string;
  contentColor: string;
  blurAmount: number;
}

const CarouselPages = (props: Props) => {
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the image after the component has mounted
    const fetchImage = async () => {
      try {
        const response = await fetch(props.backgroundImage);
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
  }, [props.backgroundImage]);

  return (
    <div ref={props.pdfRef}>
      <div className="embla overflow-hidden" ref={props.emblaRef}>
        <div className="embla__container flex">
          {props.slides.map((slide, index) => (
            <div
              key={slide.id}
              className="aspect-square embla__slide flex-[0_0_100%] relative"
              style={{ fontFamily: props.selectedFont }}
            >
              {/* Background Image Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: imageData ? `url(${imageData})` : undefined,
                  filter: `blur(${props.blurAmount}px)`,
                  zIndex: 0,
                }}
              />

              {/* Content Layer */}
              <div className="relative z-10 w-full h-full flex flex-col justify-center p-10">
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center text-gray-800 font-bold text-lg shadow-md">
                  {index + 1}
                </div>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: props.headerColor }}
                >
                  {slide.title}
                </h2>
                <p className="text-xl" style={{ color: props.contentColor }}>
                  {slide.content}
                </p>
                <div className="absolute bottom-4 right-4 text-sm font-medium text-white bg-black bg-opacity-50 px-3 py-1 rounded-full shadow-md">
                  {index === props.slides.length - 1 ? "Last Slide" : "Swipe"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselPages;
