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
          <CardContent className="">
            <div className="flex justify-between items-center py-3 space-x-20">
              <h3 className="font-semibold">Slide Settings</h3>
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
            </div>

            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ai">AI Prompt</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>
              <TabsContent value="ai" className="space-y-4">
                <div>
                  <Label htmlFor="ai-prompt">📝 Add your notes below</Label>
                  <Textarea
                    id="ai-prompt"
                    placeholder="Enter your prompt for AI generation"
                    className="mt-1 h-80"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="num-slides">
                    Suggest Number of Slides: {numSlides}
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
                    className="min-h-40"
                  />
                </div>
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
