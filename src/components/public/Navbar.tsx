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
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch (penting untuk dark mode next-themes)
  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        {/* === LOGO === */}
        <Link
          to="/"
          className="font-bold text-xl tracking-tight hover:opacity-80 transition"
        >
          HRIS
        </Link>

        {/* === NAVIGATION MENU === */}
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
                <a
                  href="#features"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Features
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* === RIGHT ACTIONS === */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Sign In */}
          <Link to="/login">
            <Button className="px-4">Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
