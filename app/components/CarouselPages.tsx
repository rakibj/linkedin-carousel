import { Slide } from "../Slide";
import { EmblaViewportRefType } from "embla-carousel-react";
import React, { RefObject } from "react";

interface Props {
  pdfRef: RefObject<HTMLDivElement>;
  emblaRef: EmblaViewportRefType;
  slides: Slide[];
}

const CarouselPages = ({ pdfRef, emblaRef, slides }: Props) => {
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
