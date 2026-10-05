import { Flavours } from "@/components/Flavours";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Ingredients } from "@/components/Ingredients";
import { Lifestyle } from "@/components/Lifestyle";
import { PromiseSection } from "@/components/PromiseSection";
import { Subscription } from "@/components/Subscription";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromiseSection />
        <Ingredients />
        <Flavours />
        <Lifestyle />
        <Subscription />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
