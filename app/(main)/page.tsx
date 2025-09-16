import Hero from "@/components/Hero";
import { Conversation } from "@/components/Conversation";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="z-10 max-w-5xl mx-auto w-full items-center justify-between font-mono text-sm p-8 lg:p-24">
        <Conversation />
      </div>
    </main>
  );
}
