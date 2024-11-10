import { Slide } from "../Slide";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";

interface Props {
  slides: Slide[];
  currentSlide: number;
  deleteSlide: (id: number) => void;
  addSlide: () => void;
  onSlidesUpdate: (slides: Slide[]) => void;
}

const SlideControls = ({
  slides,
  deleteSlide,
  addSlide,
  onSlidesUpdate,
  currentSlide,
}: Props) => {
  return (
    <>
      <Card>
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
                onClick={() => deleteSlide(currentSlide)}
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
                    onSlidesUpdate(newSlides);
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
                    onSlidesUpdate(newSlides);
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
    </>
  );
};

export default SlideControls;
