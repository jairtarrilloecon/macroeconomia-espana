import Navigation from "@/components/Navigation";
import HeroIntro from "@/components/sections/HeroIntro";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="h-screen overflow-hidden">
        <HeroIntro />
      </main>
    </>
  );
}
