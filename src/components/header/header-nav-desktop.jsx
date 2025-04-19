import { Link } from "react-router";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Vocabulary List", href: "/vocabulary" },
  { name: "Quiz", href: "/quiz" },
  { name: "Sentence Generator", href: "/sentence-generator" },
];

export function HeaderNavDesktop() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-6" role="navigation">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {item.name}
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
