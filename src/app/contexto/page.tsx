import Navigation from "@/components/Navigation";
import ContextoPBI from "@/components/sections/ContextoPBI";

export const metadata = { title: "Contexto & PBI | Macroeconomía" };

export default function ContextoPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContextoPBI />
      </main>
    </>
  );
}
