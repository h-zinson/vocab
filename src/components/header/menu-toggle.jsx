import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function MenuToggle({ isOpen, onClick }) {
  return (
    <button
      id="menu-button"
      onClick={onClick}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className="relative cursor-pointer p-2 hover:bg-accent rounded-md transition-colors">
      <Menu
        className={cn(
          "size-5 transition-all duration-300",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      />
      <X
        className={cn(
          "absolute inset-0 m-auto size-5 transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      />
    </button>
  );
}
