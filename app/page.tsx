"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useEmblaCarousel from "embla-carousel-react";
import { jsPDF } from "jspdf";
import {
  MessageCircle,
  ThumbsUp,
  Share2,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Slide {
  id: number;
  title: string;
  content: string;
}

export default function Component() {
  const [slides, setSlides] = useState<Slide[]>([
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
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

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
  const downloadPDF = () => {
    const doc = new jsPDF();
    slides.forEach((slide, index) => {
      if (index > 0) doc.addPage(); // Add a new page for each slide

      // Set background gradient (simulated with a solid color)
      doc.setFillColor(173, 216, 230); // Light blue (similar to 'bg-gradient-to-br from-blue-100')
      doc.rect(0, 0, 210, 297, "F"); // Fill the entire page background

      // Title styling (mimicking 'text-3xl font-bold mb-4 text-gray-800')
      doc.setFontSize(24);
      doc.setTextColor(50, 50, 50); // Dark gray (similar to text-gray-800)
      doc.text(slide.title, 20, 40);

      // Content styling (mimicking 'text-xl text-gray-600')
      doc.setFontSize(18);
      doc.setTextColor(100, 100, 100); // Lighter gray (similar to text-gray-600)
      doc.text(slide.content, 20, 60);
    });
    doc.save("carousel.pdf");
  };
  const deleteSlide = (id: number) => {
    if (slides.length > 1) {
      setSlides(slides.filter((slide) => slide.id !== id));
      if (currentSlide >= slides.length - 1) {
        setCurrentSlide(slides.length - 2);
      }
    }
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
      <div className="w-80 bg-white p-6 border-r overflow-y-auto">
        <Button variant="outline" size="sm" onClick={downloadPDF}>
          Download PDF
        </Button>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">AI Carousel Generator</h2>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={generateContent}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Carousel"}
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <Label>Template Settings</Label>
              <Input placeholder="Enter template name" className="mt-2" />
            </div>

            <div>
              <Label>Background Color</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  type="color"
                  className="w-10 h-10 p-1"
                  defaultValue="#ffffff"
                />
                <span className="text-sm text-gray-500">
                  Select background color
                </span>
              </div>
            </div>

            <div>
              <Label>Slide Counter</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Switch id="counter" />
                <Label htmlFor="counter">Show slide numbers</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow">
          {/* LinkedIn Post Header */}
          <div className="p-4 flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">AI Carousel Creator</h3>
              <p className="text-sm text-gray-500">1,234 followers</p>
            </div>
          </div>

          <Separator />

          {/* Carousel */}
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
          <div className="p-4">
            <div className="flex justify-between text-gray-500 mb-2">
              <span>42 Likes</span>
              <span>12 Comments</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <Button variant="ghost" size="sm" className="flex-1">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Comment
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Slide Settings</h3>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={addSlide}>
                  Add Slide
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteSlide(slides[currentSlide].id)}
                >
                  Delete Slide
                </Button>
              </div>
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={slides[currentSlide]?.title}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[currentSlide].title = e.target.value;
                      setSlides(newSlides);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={slides[currentSlide]?.content}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[currentSlide].content = e.target.value;
                      setSlides(newSlides);
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="design">
                <p className="text-sm text-gray-500">
                  Design settings coming soon...
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
