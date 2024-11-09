import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const LinkedInPostHeader = () => {
  return (
    <>
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
    </>
  );
};

export default LinkedInPostHeader;
