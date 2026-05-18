import Navigation from "@/components/Navigation";
import ConclusionNewsletter from "@/components/sections/ConclusionNewsletter";

export const metadata = { title: "Conclusión | Macroeconomía" };

export default function ConclusionPage() {
  return (
    <>
      <Navigation />
      <main>
        <ConclusionNewsletter />
      </main>
    </>
  );
}
