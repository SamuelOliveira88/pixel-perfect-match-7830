import type { ReactNode } from "react";
import { SiteHeader } from "@/components/mcmv/SiteHeader";
import { SiteFooter } from "@/components/mcmv/SiteFooter";

export function PaginaConteudo({
  titulo,
  subtitulo,
  children,
}: {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-gradient-to-br from-primary to-primary-dark py-14 text-primary-foreground">
        <div className="mx-auto max-w-[900px] px-5">
          <h1 className="text-3xl font-extrabold md:text-4xl">{titulo}</h1>
          <p className="mt-3 max-w-2xl opacity-90">{subtitulo}</p>
        </div>
      </section>
      <main className="py-14">
        <div className="mx-auto max-w-[900px] space-y-6 px-5 text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-primary [&_li]:ml-5 [&_li]:list-disc">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
