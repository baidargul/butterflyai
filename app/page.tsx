import Controls from "@/components/Controls";
import GeneratorPanel from "@/components/GeneratorPanel";

export default function Home() {
  return (
    <div className="w-full select-none min-h-[100dvh] max-h-full flex justify-center items-start bg-zinc-100 pt-3 sm:pt-6 pb-10 sm:pb-0 p-6 relative">
      <Controls />
      <div className="absolute flex gap-1 items-center bottom-1 right-1">
        <span className="font-semibold">Created by:</span>
        <span>
          <a
            className="text-[#3B8FB5] font-bold font-sans"
            href="https://www.linkedin.com/in/baidargul/"
            target="_blank"
          >
            Baidar Gul
          </a>
        </span>
      </div>
    </div>
  );
}
