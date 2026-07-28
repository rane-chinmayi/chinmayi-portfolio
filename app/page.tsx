import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Toolkit from "@/components/Toolkit";
import HowIThink from "@/components/HowIThink";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import WhoIHelp from "@/components/WhoIHelp";
import Advisory from "@/components/Advisory";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <About />
      <Expertise />
      <Toolkit />
      <HowIThink />
      <Experience />
      <Education />
      <Projects />
      <WhoIHelp />
      <Advisory />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}
