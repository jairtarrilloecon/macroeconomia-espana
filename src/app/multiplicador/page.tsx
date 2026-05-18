import Navigation from "@/components/Navigation";
import MultiplicadorKeynesiano from "@/components/sections/MultiplicadorKeynesiano";

export const metadata = { title: "Multiplicador Keynesiano | Macroeconomía" };

export default function MultiplicadorPage() {
  return (
    <>
      <Navigation />
      <main>
        <MultiplicadorKeynesiano />
      </main>
    </>
  );
}
