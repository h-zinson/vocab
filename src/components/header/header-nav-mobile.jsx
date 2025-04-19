import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserButton } from "./user-button";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Vocabulary List", href: "/vocabulary" },
  { name: "Quiz", href: "/quiz" },
  { name: "Sentence Generator", href: "/sentence-generator" },
];

export function HeaderNavMobile({
  isOpen,
  isLoggedIn,
  profile,
  logout,
  onClose,
}) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "lg:hidden fixed inset-x-0 top-[65px] p-6 border-b bg-background z-[999]",
        isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-8 opacity-0 pointer-events-none"
      )}
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      }}
      role="navigation"
      aria-label="Mobile navigation">
      <nav className="mb-6">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                onClick={onClose}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="lg:hidden">
        {isLoggedIn && profile ? (
          <div className="flex items-center gap-4 w-full border-t pt-4">
            <UserButton user={profile} onLogout={logout} />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full border-t pt-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full justify-center">
              <Link to="/signin" onClick={onClose}>
                Sign in
              </Link>
            </Button>
            <Button asChild size="sm" className="w-full justify-center">
              <Link to="/signup" onClick={onClose}>
                Sign up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
