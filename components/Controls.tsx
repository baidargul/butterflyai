"use client";
import React, { useState } from "react";
import GeneratorPanel from "./GeneratorPanel";
import ImageViewer from "./ImageViewer";

type Props = {};

const Controls = (props: Props) => {
  const [images, setImages] = useState<
    { prompt: string; image: string; created_at: string }[]
  >([
    { prompt: "This is a demo", image: "/images/01.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/02.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/01.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/02.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/01.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/02.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/01.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/02.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/01.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/02.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/01.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/02.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/01.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/02.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/01.jpg", created_at: "" },
    { prompt: "This is a demo", image: "/images/02.jpg", created_at: "" },
  ]);

  const handleOldImageClick = (image: {
    prompt: string;
    image: string;
    created_at: string;
  }) => {
    //copy prompt to clipboard
    navigator.clipboard.writeText(image.prompt);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] justify-center items-center">
      <div>
        <GeneratorPanel setImages={setImages} />
      </div>
      {images.length > 0 && (
        <div className="columns-2 sm:columns-4 lg:columns-8 my-4 p-4 pb-2 gap-2 w-full drop-shadow-sm bg-gradient-to-b from-white to-zinc-50 rounded border border-zinc-200 place-items-center justify-center justify-items-center place-content-center">
          {images.map((image, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-1 cursor-pointer select-none mb-1"
              >
                <ImageViewer image={image.image} />
                <div
                  onClick={() => handleOldImageClick(image)}
                  className="tracking-wide p-1 bg-gradient-to-r from-white to-zinc-50 border border-zinc-200 rounded text-xs line-clamp-3 italic active:scale-95 transition-all duration-100 ease-in-out"
                >
                  {image.prompt}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Controls;
