import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OrderForm } from "@/components/OrderForm";
import {
  FaqSection,
  IngredientsBlock,
  BrandBand,
  LifestyleBand,
  OrderingSection,
  ProductIntro,
  ReviewsPlaceholder,
  SafetySection,
  TrustRow,
} from "@/components/Sections";
import { StickyCta } from "@/components/StickyCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustRow />
        <ProductIntro />
        <LifestyleBand />
        <BrandBand />
        <SafetySection />
        <IngredientsBlock />
        <OrderingSection />
        <ReviewsPlaceholder />
        <FaqSection />
        <OrderForm />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
