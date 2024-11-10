import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-separator";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Plus } from "lucide-react";
import React, { useState } from "react";

interface Props {
  pdfRef: HTMLDivElement;
  predefinedImages: string[];
  setBackgroundImage: (path: string) => void;
  predefinedFonts: string[];
  selectedFont: string;
  setSelectedFont: (selectedFont: string) => void;
  headerColor: string;
  setHeaderColor: (headerColor: string) => void;
  contentColor: string;
  setContentColor: (contentColor: string) => void;
  blurAmount: number;
  setBlurAmount: (blurAmount: number) => void;
}

const Sidebar = (props: Props) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const exportAsPDF = async (pdfRef: HTMLDivElement) => {
    if (!pdfRef) return;

    const jpegQuality = 1;

    // Add 'pdf-export' class to all slides to apply export-specific styling
    const slides = pdfRef.querySelectorAll(".embla__slide");
    const toAddPdfExports = pdfRef.querySelectorAll("h3");
    toAddPdfExports.forEach((toAdd) => toAdd.classList.add("pdf-export"));

    // Generate PDF settings based on the first slide's canvas
    const firstSlideCanvas = await html2canvas(slides[0] as HTMLElement, {
      scale: 1.5,
      useCORS: true,
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

    // Remove 'pdf-export' class after export to avoid affecting in-app styles
    toAddPdfExports.forEach((toAdd) => toAdd.classList.remove("pdf-export"));

    pdf.save("embla-slides.pdf");
  };

  const generateContent = async (pdfRef: HTMLDivElement) => {
    setIsGenerating(true);
    await exportAsPDF(pdfRef);
    setIsGenerating(false);
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setBackgroundImage: (path: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setBackgroundImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">AI Carousel Generator</h2>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => generateContent(props.pdfRef)}
            disabled={isGenerating}
          >
            {isGenerating ? "Downloading..." : "Download Carousel"}
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <Label>Background Image</Label>
            <div className="grid grid-cols-6 mt-2">
              {props.predefinedImages.map((img, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={img}
                  alt={`Background ${index + 1}`}
                  className="w-10 h-auto cursor-pointer border-2 rounded"
                  onClick={() => props.setBackgroundImage(img)}
                />
              ))}
              <label className="flex items-center justify-center border-2 border-dashed rounded cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) =>
                    handleImageUpload(event, props.setBackgroundImage)
                  }
                  accept="image/*"
                />
                <Plus className="w-6 h-6" />
              </label>
            </div>
          </div>
          {/* <div>
            <Label>Background Blur</Label>
            <Slider
              value={[props.blurAmount]}
              min={0}
              max={20}
              step={1}
              className="mt-2"
              onValueChange={(value) => props.setBlurAmount(value[0])}
            />
          </div> */}
          <div>
            <Label>Font</Label>
            <Select
              value={props.selectedFont}
              onValueChange={props.setSelectedFont}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {props.predefinedFonts.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Header Color</Label>
            <Input
              type="color"
              value={props.headerColor}
              onChange={(e) => props.setHeaderColor(e.target.value)}
              className="mt-2 h-10"
            />
          </div>

          <div>
            <Label>Content Color</Label>
            <Input
              type="color"
              value={props.contentColor}
              onChange={(e) => props.setContentColor(e.target.value)}
              className="mt-2 h-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
