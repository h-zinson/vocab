import { Link } from "react-router";

const links = [
  { title: "Home", href: "/" },
  { title: "Sentence Generator", href: "sentence-generator" },
  { title: "Quiz", href: "quiz" },
  { title: "Vocabulary List", href: "vocabulary-list" },
];

export default function Footer() {
  return (
    <footer className="py-16 md:pt-1 md:pb-5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-muted-foreground hover:text-primary block duration-150">
              <span>{link.title}</span>
            </Link>
          ))}
        </div>

        <span className="text-muted-foreground block text-center text-sm">
          © {new Date().getFullYear()} Vocab, All rights reserved
        </span>
      </div>
    </footer>
  );
}
