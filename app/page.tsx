"use client";

import { Slide } from "./Slide";
import CarouselNav from "./components/CarouselNav";
import CarouselPages from "./components/CarouselPages";
import LinkedInPostFooter from "./components/LinkedinPostFooter";
import LinkedInPostHeader from "./components/LinkedinPostHeader";
import Sidebar from "./components/Sidebar";
import SlideControls from "./components/SlideControls";
import {
  getSlidesFromAi,
  predefinedFonts,
  predefinedImages,
  slideDatabase,
} from "./utilities/carouselGenerator";
import { Separator } from "@/components/ui/separator";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Component() {
  const [slides, setSlides] = useState<Slide[]>(slideDatabase);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [backgroundImage, setBackgroundImage] = useState(predefinedImages[0]);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [selectedFont, setSelectedFont] = useState(predefinedFonts[0]);
  const [headerColor, setHeaderColor] = useState("#000000");
  const [contentColor, setContentColor] = useState("#000000");
  const [blurAmount, setBlurAmount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const addSlide = () => {
    setSlides([
      ...slides,
      {
        id: Date.now(),
        title: "New slide",
        content: "Add your content here",
      },
    ]);
    setTimeout(() => {
      emblaApi?.scrollTo(slides.length);
    }, 0);
  };

  const deleteSlide = (id: number) => {
    setSlides((prevSlides) => {
      if (prevSlides.length <= 1) return prevSlides; // Ensure at least one slide remains
      const newSlides = prevSlides.filter((slide) => slide.id !== id);
      setCurrentSlide((prevCurrentSlide) =>
        prevCurrentSlide >= newSlides.length
          ? newSlides.length - 1
          : prevCurrentSlide
      );
      return newSlides;
    });
  };
  const onSlideChange = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSlideChange();
    emblaApi.on("select", onSlideChange);
    return () => {
      emblaApi.off("select", onSlideChange);
    };
  }, [emblaApi, onSlideChange]);

  const prevSlide = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const nextSlide = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const confirmGenerate = async (prompt: string, numSlides: number) => {
    setIsGenerating(true);
    const slides = await getSlidesFromAi(prompt, numSlides);
    if (!slides) {
      setIsGenerating(false);
      return;
    }
    const newSlides = slides.map((slide, i) => ({
      id: i + 1,
      title: slide.title,
      content: slide.content,
    }));

    setSlides(newSlides);
    setCurrentSlide(0);
    setIsGenerating(false);
    setTimeout(() => {
      emblaApi?.scrollTo(0);
    }, 0);
  };

  return (
    <div className="flex  bg-gray-100">
      <div className="w-80 bg-white p-6 border-r">
        <Sidebar
          pdfRef={pdfRef.current!}
          setBackgroundImage={setBackgroundImage}
          predefinedImages={predefinedImages}
          predefinedFonts={predefinedFonts}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          headerColor={headerColor}
          setHeaderColor={setHeaderColor}
          contentColor={contentColor}
          setContentColor={setContentColor}
          blurAmount={blurAmount}
          setBlurAmount={setBlurAmount}
        />
      </div>

      <div className="flex flex-col md:flex-row p-6 justify-between space-x-5">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow">
          <LinkedInPostHeader />
          <Separator />
          <CarouselPages
            pdfRef={pdfRef}
            emblaRef={emblaRef}
            slides={slides}
            backgroundImage={backgroundImage}
            selectedFont={selectedFont}
            headerColor={headerColor}
            contentColor={contentColor}
            blurAmount={blurAmount}
          />
          <CarouselNav
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            scrollTo={scrollTo}
            currentSlide={currentSlide}
            slides={slides}
          />
          <LinkedInPostFooter />
        </div>

        <div className="min-w-full">
          <SlideControls
            slides={slides}
            currentSlide={currentSlide}
            onSlidesUpdate={(newSlides) => setSlides(newSlides)}
            addSlide={addSlide}
            deleteSlide={deleteSlide}
            isGenerating={isGenerating}
            generateAI={confirmGenerate}
          />
        </div>
      </div>
    </div>
  );
}
