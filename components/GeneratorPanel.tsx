"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";

type Props = {
  setImages: (prev: any) => void;
};

const GeneratorPanel = (props: Props) => {
  const [image, setImage] = useState<any>(null);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [steps, setSteps] = useState(25);
  const [seeds, setSeeds] = useState(
    Math.floor(
      Math.random() *
        new Date().getMilliseconds() *
        new Date().getMinutes() *
        new Date().getSeconds()
    )
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const data = {
    prompt: prompt,
    negative: negativePrompt,
    steps: steps,
    seed: seeds,
    width: width,
    height: height,
  };

  const request = async () => {
    if (prompt.length < 1) return;
    setIsCreating(true);

    const res = await axios.post("/api/ai/do", data);
    setImage((prev: any) => `data:image/jpeg;base64,${res.data.data.image}`);
    props.setImages((prev: any) => [
      ...prev,
      {
        prompt: prompt,
        image: `data:image/jpeg;base64,${res.data.data.image}`,
        created_at: new Date().toISOString(),
      },
    ]);

    setIsCreating(false);
  };

  const handlePromptChange = (e: any) => {
    setPrompt(e.target.value);
  };

  const handleWidthChange = (e: any) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e: any) => {
    setHeight(e.target.value);
  };

  const handleNegativePromptChange = (e: any) => {
    setNegativePrompt(e.target.value);
  };

  const handleStepsChange = (e: any) => {
    setSteps(e.target.value);
  };

  const handleSeedChange = (e: any) => {
    setSeeds(e.target.value);
  };

  useEffect(() => {
    if (isCreating) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1000);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setElapsedTime(0);
    }
  }, [isCreating]);

  return (
    <div className="flex flex-col-reverse mt-4 sm:mt-0 sm:flex-row justify-center gap-2 sm:gap-10 w-full bg-zinc-50 drop-shadow-md rounded-md p-10">
      <div className="flex flex-col gap-2 w-full">
        <div className=" gap-1 items-center hidden sm:flex -mt-4">
          <span className="text-4xl first-letter:font-semibold">Butterfly</span>
          <span className="px-2 bg-zinc-50 text-xs rounded border border-zinc-300">
            AI
          </span>
        </div>
        <span className="font-semibold text-sm sm:text-md">Image Prompt:</span>
        <textarea
          disabled={isCreating}
          value={prompt}
          onChange={handlePromptChange}
          className="p-2 appearance-none outline-none ring-0 border rounded-md min-w-[280px] w-full text-sm font-mono"
          rows={5}
        ></textarea>
        <span className="font-semibold text-sm sm:text-md">
          Negative Prompt:
        </span>
        <textarea
          disabled={isCreating}
          value={negativePrompt}
          onChange={handleNegativePromptChange}
          className="p-2 appearance-none outline-none ring-0 border rounded-md min-w-[280px] w-full text-sm font-mono"
          rows={5}
        ></textarea>
        <div className="grid grid-cols-2 gap-2 w-full">
          <div>
            <span className="font-semibold text-sm sm:text-md">
              Inference steps:
            </span>
            <input
              value={steps}
              disabled={isCreating}
              onChange={handleStepsChange}
              className="p-2 appearance-none outline-none ring-0 border rounded-md w-full text-sm font-mono"
            />
          </div>
          <div>
            <span className="font-semibold text-sm sm:text-md">Seed:</span>
            <input
              value={seeds}
              disabled={isCreating}
              onChange={handleSeedChange}
              className="p-2 appearance-none outline-none ring-0 border rounded-md w-full text-sm font-mono"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <div>
            <span className="font-semibold text-sm sm:text-md">Width:</span>
            <input
              value={width}
              disabled={isCreating}
              onChange={handleWidthChange}
              className="p-2 appearance-none outline-none ring-0 border rounded-md w-full text-sm font-mono"
            />
          </div>
          <div>
            <span className="font-semibold text-sm sm:text-md">Height:</span>
            <input
              value={height}
              disabled={isCreating}
              onChange={handleHeightChange}
              className="p-2 appearance-none outline-none ring-0 border rounded-md w-full text-sm font-mono"
            />
          </div>
        </div>
        <div className="mt-2">
          <button
            onClick={() => request()}
            disabled={isCreating}
            className={`p-2 px-4 text-sm border rounded-md w-full ${
              isCreating
                ? "bg-zinc-100 hover:bg-zinc-50 animate-pulse"
                : "bg-[#3B8FB5] hover:bg-[#499abc] transition-all duration-200 text-white font-bold tracking-widest border-[#38AFCD] drop-shadow-sm"
            } `}
          >
            {isCreating ? `${formatTime(elapsedTime)}` : "Generate"}
          </button>
          <div className="text-xs my-1 text-zinc-500">
            ⚠️ This tool is build on free APIs which may impact speed of
            generating images.
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-1 items-center mb-4 -mt-4 sm:hidden">
          <span className="text-4xl first-letter:font-semibold">Butterfly</span>
          <span className="px-2 bg-zinc-50 text-xs rounded border border-zinc-300">
            AI
          </span>
        </div>
        <div className="min-w-[250px] pointer-events-none select-none">
          {<ImageViewer image={image} />}
        </div>
      </div>
    </div>
  );
};

export default GeneratorPanel;

function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = [];
  if (hours > 0) result.push(`${hours} hr`);
  if (minutes > 0) result.push(`${minutes} min`);
  if (seconds > 0) result.push(`${seconds} sec`);

  return result.join(" ");
}
