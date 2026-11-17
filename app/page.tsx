import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Expertise from "@/components/sections/Expertise";
import Hero from "@/components/sections/Hero";
import Offers from "@/components/sections/Offers";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";
import Writing from "@/components/sections/Writing";
import JsonLd from "@/components/ui/JsonLd";
import { personJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <About />
      <Expertise />
      <Work />
      <Experience />
      <Writing />
      <Offers />
      <Testimonials />
      <Contact />
    </>
  );
}
