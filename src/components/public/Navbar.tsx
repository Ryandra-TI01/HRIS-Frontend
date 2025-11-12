import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  // Toggle dark mode
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <header className="border-b bg-muted/40 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* === LEFT: LOGO === */}
        <Link to="/" className="font-bold text-xl tracking-tight">
          HRIS
        </Link>

        {/* === CENTER: NAVIGATION MENU === */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/features"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Features
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* === RIGHT: SIGN IN BUTTON === */}
        <div className="flex items-center gap-4">
          <Button variant={"ghost"} onClick={toggleTheme}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Link to="/login">
            <Button variant="default">Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
