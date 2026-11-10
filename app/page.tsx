import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import Newsletter from "@/components/Newsletter";
import WhyCome from "@/components/WhyCome";
import SocialProof from "@/components/SocialProof";
import TicketCTA from "@/components/TicketCTA";
import Testimonials from "@/components/Testimonials";
import PressRelease from "@/components/PressRelease";
import DownloadStrip from "@/components/DownloadStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Program />
        <Speakers />
        {/*<Newsletter />*/}
        <WhyCome />
        <SocialProof />
        <TicketCTA />
        <Testimonials />
        <PressRelease />
        <DownloadStrip />
      </main>
      <Footer />
    </>
  );
}
