"use client";

import { Slide } from "./Slide";
import CarouselNav from "./components/CarouselNav";
import CarouselPages from "./components/CarouselPages";
import LinkedInPostFooter from "./components/LinkedinPostFooter";
import LinkedInPostHeader from "./components/LinkedinPostHeader";
import Sidebar from "./components/Sidebar";
import SlideControls from "./components/SlideControls";
import { Separator } from "@/components/ui/separator";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";

const predefinedImages = [
  "https://picsum.photos/id/20/500/500?blur=10",
  "https://picsum.photos/id/10/500/500?blur=10",
  "https://picsum.photos/id/80/500/500?blur=10",
  "https://picsum.photos/id/30/500/500?blur=10",
];
const predefinedFonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];
export default function Component() {
  const slideDatabase: Slide[] = [
    {
      id: 1,
      title: "Boost Your LinkedIn Presence",
      content:
        "Learn how to create engaging carousel posts that captivate your audience.",
    },
    {
      id: 2,
      title: "Craft Compelling Content",
      content:
        "Discover the secrets to writing headlines and copy that drive engagement.",
    },
    {
      id: 3,
      title: "Optimize Your Design",
      content:
        "Use eye-catching visuals and layouts to make your carousels stand out.",
    },
    {
      id: 4,
      title: "Measure Your Success",
      content:
        "Track key metrics to continually improve your carousel performance.",
    },
  ];
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
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newSlides = Array.from({ length: numSlides }, (_, i) => ({
      id: i + 1,
      title: `AI Generated Title ${i + 1} based on: ${prompt}`,
      content: `AI Generated Content for slide ${i + 1}`,
    }));

    setSlides(newSlides);
    setCurrentSlide(0);
    setIsGenerating(false);
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
