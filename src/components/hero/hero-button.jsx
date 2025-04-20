import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "../ui/animated-group";

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.5 },
    },
  },
};

export default function HeroButtons() {
  return (
    <AnimatedGroup
      variants={{
        container: {
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.75,
            },
          },
        },
        ...transitionVariants,
      }}
      className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
      <div className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
        <Button asChild size="lg" className="rounded-xl px-5 text-base">
          <Link to="/signup">Start Learning</Link>
        </Button>
      </div>
      <Button
        asChild
        size="lg"
        variant="ghost"
        className="h-10.5 rounded-xl px-5">
        <Link to="#link">Request a demo</Link>
      </Button>
    </AnimatedGroup>
  );
}
