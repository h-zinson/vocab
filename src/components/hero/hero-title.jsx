import { TextEffect } from "../ui/text-effect";

export default function HeroTitle() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
          Smarter Vocabulary, Faster Learning
        </TextEffect>
        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mx-auto mt-8 max-w-2xl text-balance text-lg">
          Practice and quiz to build your vocabulary smarter with context-based
          AI tools that help you learn faster and retain better.
        </TextEffect>
      </div>
    </div>
  );
}
