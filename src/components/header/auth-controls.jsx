import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { UserButton } from "./user-button";

export function AuthControls({ isLoggedIn, profile, onLogout }) {
  return (
    <div className="hidden lg:flex items-center gap-3 relative z-50">
      {isLoggedIn && profile ? (
        <>
          <UserButton user={profile} onLogout={onLogout} />

          <div className="h-4 w-px bg-border" />
        </>
      ) : (
        <>
          <Button asChild variant="ghost" size="sm">
            <Link to="/signin">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/signup">Sign up</Link>
          </Button>
          <div className="h-4 w-px bg-border" />
        </>
      )}
    </div>
  );
}
