import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Send, Share2, ThumbsUp } from "lucide-react";
import React from "react";

const LinkedInPostFooter = () => {
  return (
    <>
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
    </>
  );
};

export default LinkedInPostFooter;
