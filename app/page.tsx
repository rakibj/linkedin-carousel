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
  "https://picsum.photos/id/1/500/500?blur=10",
  "https://picsum.photos/id/10/500/500?blur=10",
  "https://picsum.photos/id/20/500/500?blur=10",
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

  const prevSlide = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const nextSlide = () => {
    if (emblaApi) emblaApi.scrollNext();
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
          />
        </div>
      </div>
    </div>
  );
}
