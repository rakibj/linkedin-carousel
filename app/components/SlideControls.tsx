import { Slide } from "../Slide";
import AlertYesNo from "./AlertYesNo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

interface Props {
  slides: Slide[];
  currentSlide: number;
  deleteSlide: (id: number) => void;
  addSlide: () => void;
  onSlidesUpdate: (slides: Slide[]) => void;
  isGenerating: boolean;
  generateAI: (prompt: string, slideCount: number) => void;
}

const SlideControls = (props: Props) => {
  const [aiPrompt, setAiPrompt] = useState("");
  const [numSlides, setNumSlides] = useState(4);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
      <div className="">
        <Card>
          <CardContent className="p-4">
            <div className="flex ">
              <h3 className="font-semibold">Slide Settings</h3>
            </div>

            <div className="space-x-2 py-2">
              <Button variant="outline" size="sm" onClick={props.addSlide}>
                Add Slide
              </Button>
              {props.slides.length > 3 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    props.deleteSlide(props.slides[props.currentSlide].id)
                  }
                >
                  Delete Slide
                </Button>
              )}
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="ai">AI Prompt</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={props.slides[props.currentSlide]?.title}
                    onChange={(e) => {
                      const newSlides = [...props.slides];
                      newSlides[props.currentSlide].title = e.target.value;
                      props.onSlidesUpdate(newSlides);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={props.slides[props.currentSlide]?.content}
                    onChange={(e) => {
                      const newSlides = [...props.slides];
                      newSlides[props.currentSlide].content = e.target.value;
                      props.onSlidesUpdate(newSlides);
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="ai" className="space-y-4">
                <div>
                  <Label htmlFor="ai-prompt">AI Prompt</Label>
                  <Textarea
                    id="ai-prompt"
                    placeholder="Enter your prompt for AI generation"
                    className="mt-1"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="num-slides">
                    Number of Slides: {numSlides}
                  </Label>
                  <Slider
                    id="num-slides"
                    min={3}
                    max={10}
                    step={1}
                    value={[numSlides]}
                    onValueChange={(value) => setNumSlides(value[0])}
                    className="mt-2"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => setIsAlertOpen(true)}
                  disabled={props.isGenerating}
                >
                  {props.isGenerating ? "Generating..." : "Generate"}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <AlertYesNo
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          confirm={() => {
            props.generateAI(aiPrompt, numSlides);
          }}
        />
      </div>
    </>
  );
};

export default SlideControls;
