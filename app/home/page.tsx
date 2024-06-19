import { CtaBox } from "@/components/landing-page/CtaBox";
import { ExplainerVideo } from "@/components/landing-page/ExplainerVideo";
import { FAQ } from "@/components/landing-page/FAQ";
import { Features } from "@/components/landing-page/Features";
import { Footer } from "@/components/landing-page/Footer";
import { Header } from "@/components/landing-page/Header";
import { Hero } from "@/components/landing-page/Hero";
import { Pricing } from "@/components/landing-page/Pricing";
// import { Testimonials } from "@/components/Testimonials/Testimonials";
import { Waitlist } from "@/components/landing-page/Waitlist";

export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <Hero />
        <Waitlist/>
        <ExplainerVideo />
        <Features />
        {/* <Testimonials /> */}
        <Pricing />
        <FAQ />
        <CtaBox />
      </main>
      <Footer />
    </>
  );
}