import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@radix-ui/react-separator";
import { jsPDF } from "jspdf";
import React from "react";

const downloadPDF = () => {
  const doc = new jsPDF();
  //   slides.forEach((slide, index) => {
  //     if (index > 0) doc.addPage(); // Add a new page for each slide

  //     // Set background gradient (simulated with a solid color)
  //     doc.setFillColor(173, 216, 230); // Light blue (similar to 'bg-gradient-to-br from-blue-100')
  //     doc.rect(0, 0, 210, 297, "F"); // Fill the entire page background

  //     // Title styling (mimicking 'text-3xl font-bold mb-4 text-gray-800')
  //     doc.setFontSize(24);
  //     doc.setTextColor(50, 50, 50); // Dark gray (similar to text-gray-800)
  //     doc.text(slide.title, 20, 40);

  //     // Content styling (mimicking 'text-xl text-gray-600')
  //     doc.setFontSize(18);
  //     doc.setTextColor(100, 100, 100); // Lighter gray (similar to text-gray-600)
  //     doc.text(slide.content, 20, 60);
  //   });
  doc.save("carousel.pdf");
};

const Sidebar = ({
  isGenerating,
  generateContent,
}: {
  isGenerating: boolean;
  generateContent: () => void;
}) => {
  return (
    <>
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
    </>
  );
};

export default Sidebar;
