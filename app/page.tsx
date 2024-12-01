import Controls from "@/components/Controls";
import GeneratorPanel from "@/components/GeneratorPanel";

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh] max-h-full flex justify-center items-start bg-zinc-50 p-2 px-6">
      <Controls />
    </div>
  );
}
