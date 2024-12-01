import Controls from "@/components/Controls";
import GeneratorPanel from "@/components/GeneratorPanel";

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh] max-h-full flex justify-center items-start bg-zinc-100 pt-3 sm:pt-6 p-6">
      <Controls />
    </div>
  );
}
