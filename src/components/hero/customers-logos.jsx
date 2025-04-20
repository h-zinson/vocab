import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export default function CustomerLogos() {
  const logos = [
    "nvidia",
    "column",
    "github",
    "nike",
    "lemonsqueezy",
    "laravel",
    "lilly",
    "openai",
  ];

  return (
    <section className="bg-background pb-16 pt-16 md:pb-32">
      <div className="group relative m-auto max-w-5xl px-6">
        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
          <Link to="/" className="block text-sm duration-150 hover:opacity-75">
            Meet Our Customers
            <ChevronRight className="ml-1 inline-block size-3" />
          </Link>
        </div>
        <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
          {logos.map((logo) => (
            <div className="flex" key={logo}>
              <img
                className="mx-auto h-5 w-fit dark:invert"
                src={`https://html.tailus.io/blocks/customers/${logo}.svg`}
                alt={`${logo} Logo`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
