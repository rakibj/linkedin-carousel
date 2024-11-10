import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@radix-ui/react-separator";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React from "react";

const exportAsPDF = async (pdfRef: HTMLDivElement) => {
  if (!pdfRef) return;

  const jpegQuality = 1;

  const slides = pdfRef.querySelectorAll(".embla__slide");
  const firstSlideCanvas = await html2canvas(slides[0] as HTMLElement, {
    scale: 1.5,
  });
  const slideWidth = firstSlideCanvas.width;
  const slideHeight = firstSlideCanvas.height;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [slideWidth, slideHeight],
    compress: true,
  });

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i] as HTMLElement;

    const canvas = await html2canvas(slide, { scale: 1.5, useCORS: true });
    const imgData = canvas.toDataURL("image/jpeg", jpegQuality);

    if (i > 0) pdf.addPage([slideWidth, slideHeight]);
    pdf.addImage(imgData, "JPEG", 0, 0, slideWidth, slideHeight);
  }

  pdf.save("embla-slides.pdf");
};

interface Props {
  isGenerating: boolean;
  generateContent: () => void;
  pdfRef: HTMLDivElement;
}

const Sidebar = ({ isGenerating, generateContent, pdfRef }: Props) => {
  return (
    <>
      <div className="w-80 bg-white p-6 border-r overflow-y-auto">
        <Button variant="outline" size="sm" onClick={() => exportAsPDF(pdfRef)}>
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
    </>
  );
};

export default Sidebar;
