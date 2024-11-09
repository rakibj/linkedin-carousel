"use client";

import { Slide } from "./Slide";
import CarouselPages from "./components/CarouselPages";
import LinkedInPostFooter from "./components/LinkedinPostFooter";
import LinkedInPostHeader from "./components/LinkedinPostHeader";
import Sidebar from "./components/Sidebar";
import SlideControls from "./components/SlideControls";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const pdfRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const addSlide = () => {
    setSlides([
      ...slides,
      {
        id: slides.length + 1,
        title: "New slide",
        content: "Add your content here",
      },
    ]);
  };

  const deleteSlide = (id: number) => {
    if (slides.length > 1) {
      setSlides(slides.filter((slide) => slide.id !== id));
      if (currentSlide >= slides.length - 1) {
        setCurrentSlide(slides.length - 2);
      }
    }
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

  const generateContent = async () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const prevSlide = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const nextSlide = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Settings Sidebar */}
      <Sidebar
        isGenerating={isGenerating}
        generateContent={generateContent}
        pdfRef={pdfRef.current!}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow">
          {/* LinkedIn Post Header */}
          <LinkedInPostHeader />
          <Separator />

          {/* Carousel */}
          <CarouselPages pdfRef={pdfRef} emblaRef={emblaRef} slides={slides} />

          {/* Carousel Navigation */}
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

          {/* LinkedIn Post Footer */}
          <LinkedInPostFooter />
        </div>

        {/* Slide Controls */}
        <SlideControls
          slides={slides}
          currentSlide={currentSlide}
          onSlidesUpdate={(newSlides) => setSlides(newSlides)}
          addSlide={addSlide}
          deleteSlide={deleteSlide}
        />
      </div>
    </div>
  );
}
