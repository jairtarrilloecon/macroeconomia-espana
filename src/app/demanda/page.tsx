import Navigation from "@/components/Navigation";
import ComponentesDemanda from "@/components/sections/ComponentesDemanda";

export const metadata = { title: "Demanda Agregada | Macroeconomía" };

export default function DemandaPage() {
  return (
    <>
      <Navigation />
      <main>
        <ComponentesDemanda />
      </main>
    </>
  );
}
