import { Link } from "react-router";
import React from "react";
import { Logo } from "./logo";
import { HeaderNavDesktop } from "./header-nav-desktop";
import { HeaderNavMobile } from "./header-nav-mobile";
import { AuthControls } from "./auth-controls";
import { MenuToggle } from "./menu-toggle";
import { useAuth } from "../../hooks/use-auth";
import { ModeToggle } from "../mode-toggle";

export function Header() {
  const [menuState, setMenuState] = React.useState(false);

  const { isLoggedIn, profile, logout } = useAuth();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");
      if (
        menuState &&
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        !menuButton?.contains(event.target)
      ) {
        setMenuState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuState]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl relative">
        <div className="flex items-center gap-8 relative z-[1001]">
          <Link
            to="/"
            aria-label="home"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <Logo />
          </Link>

          <HeaderNavDesktop />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 lg:hidden relative z-[1001]">
            <ModeToggle />
            <MenuToggle
              isOpen={menuState}
              onClick={() => setMenuState(!menuState)}
            />
          </div>

          <AuthControls
            isLoggedIn={isLoggedIn}
            profile={profile}
            onLogout={logout}
          />
        </div>
      </div>

      <HeaderNavMobile
        isOpen={menuState}
        isLoggedIn={isLoggedIn}
        profile={profile}
        onLogout={logout}
        onClose={() => setMenuState(false)}
      />
    </header>
  );
}
