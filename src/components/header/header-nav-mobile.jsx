import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

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
  onLogout,
  onClose,
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-[998]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 p-6 border-b bg-background shadow-lg z-[999] transition-all duration-300 ease-in-out max-h-[calc(100vh-4rem)] overflow-y-auto",
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-8 opacity-0 pointer-events-none"
        )}
        role="navigation"
        aria-label="Mobile navigation">
        <nav className="mb-6">
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:hidden">
          {isLoggedIn && profile ? (
            <div className="flex flex-col gap-3 w-full border-t pt-6">
              {profile.email && (
                <div className="px-4 py-2">
                  <div className="text-sm font-medium text-foreground">
                    {profile.username}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {profile.email}
                  </div>
                </div>
              )}
              <Button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                variant="destructive"
                size="lg"
                className="w-full justify-center gap-2">
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full border-t pt-6">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full justify-center">
                <Link to="/login" onClick={onClose}>
                  Sign in
                </Link>
              </Button>
              <Button asChild size="lg" className="w-full justify-center">
                <Link to="/signup" onClick={onClose}>
                  Sign up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
