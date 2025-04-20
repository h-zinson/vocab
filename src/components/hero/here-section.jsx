import HeroBackground from "./hero-bacground";
import HeroHeader from "./hero-header";
import HeroTitle from "./hero-title";
import HeroButtons from "./hero-button";
import HeroVideoShowcase from "./hero-video-showcase";
import CustomerLogos from "./customers-logos";

export default function HeroSection() {
  return (
    <main className="overflow-hidden">
      <HeroBackground />
      <section>
        <div className="relative pt-24 md:pt-36">
          <HeroHeader />
          <HeroTitle />
          <HeroButtons />
          <HeroVideoShowcase />
        </div>
      </section>
      <CustomerLogos />
    </main>
  );
}
