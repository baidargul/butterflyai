"use client";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
  image: {
    prompt: string;
    image: string;
    created_at: string;
  };
};

const Dialog = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModel = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  return (
    <div>
      <div onClick={toggleModel}>{props.children}</div>
      {isOpen && (
        <div className="absolute bg-white inset-0 p-2 rounded-md overflow-hidden">
          <div className="p-2">
            <div className="flex flex-col sm:flex-row gap-2 items-start">
              <img
                src={props.image.image}
                alt={props.image.prompt}
                className="w-[260px] h-[260px] rounded-md object-contain"
              />
              <div className="w-full px-2">
                <p className="text-lg font-semibold italic select-text cursor-text selection:bg-zinc-200">
                  {props.image.prompt}
                </p>
                <p className="text-xs tracking-wide">
                  {new Date(props.image.created_at).toDateString() +
                    ", " +
                    new Date(props.image.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={toggleModel}
              className="absolute bottom-2 right-2 bg-[#3B8FB5] p-1 px-2 rounded text-white font-mono"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
