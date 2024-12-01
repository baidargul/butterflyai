"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";

type Props = {
  setImages: (prev: any) => void;
};

const GeneratorPanel = (props: Props) => {
  const [image, setImage] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const data = {
    prompt: prompt,
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

  const handleKeyDown = (e: any) => {
    // if (e.key === "Enter") {
    //   request();
    // }
  };

  return (
    <div className="flex flex-col-reverse mt-4 sm:mt-0 sm:flex-row justify-center gap-2 sm:gap-10 w-full">
      <div className="flex flex-col gap-2 w-full">
        <span className="font-semibold text-sm sm:text-md">Image Prompt:</span>
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
          className="p-2 appearance-none outline-none ring-0 border rounded-md min-w-[280px] w-full text-sm font-mono"
          rows={8}
        ></textarea>
        <div>
          <button
            onClick={() => request()}
            className={`p-1 px-2 text-sm border rounded-md w-full ${
              isCreating
                ? "bg-zinc-100 hover:bg-zinc-50 animate-pulse"
                : "bg-green-100 hover:bg-green-50 border-green-200 drop-shadow-sm"
            } `}
          >
            {isCreating ? `${formatTime(elapsedTime)}` : "Generate"}
          </button>
        </div>
      </div>
      <div>{<ImageViewer image={image} />}</div>
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
