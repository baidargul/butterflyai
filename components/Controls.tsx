"use client";
import React, { useState } from "react";
import GeneratorPanel from "./GeneratorPanel";
import ImageViewer from "./ImageViewer";

type Props = {};

const Controls = (props: Props) => {
  const [images, setImages] = useState<
    { prompt: string; image: string; created_at: string }[]
  >([]);

  return (
    <div className="flex flex-col min-h-[100dvh] justify-center items-center">
      <div>
        <GeneratorPanel setImages={setImages} />
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 mt-4 p-2 gap-2 w-full drop-shadow-sm bg-gradient-to-b from-white to-zinc-50 rounded border border-zinc-200 place-items-center justify-center justify-items-center place-content-center">
          {images.map((image, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-1 cursor-pointer select-none"
              >
                <ImageViewer image={image.image} />
                <div className="tracking-tight text-sm line-clamp-3">
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
