import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

//@ts-ignore
import Logo from "@/components/Logo";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 border-b bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        {/* LOGO — kecil di mobile, normal di desktop */}
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition select-none"
        >
          <div className="block md:hidden">
            <Logo size={110} />
          </div>

          <div className="hidden md:block">
            <Logo size={180} />
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex">
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
        </div>

        {/* RIGHT SECTION (theme toggle + mobile hamburger) */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* THEME TOGGLE TETAP DI LUAR DI MOBILE */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* SIGN IN (desktop only) */}
          <div className="hidden md:block">
            <Link to="/login">
              <Button className="px-4">Sign In</Button>
            </Link>
          </div>

          {/* HAMBURGER MENU */}
          <button
            className="md:hidden p-2 rounded hover:bg-muted"
            onClick={() => setMobileOpen(prev => !prev)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white dark:bg-neutral-900 px-4 py-3 space-y-4 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <a href="#features" onClick={() => setMobileOpen(false)}>
              Features
            </a>
          </nav>

          <div className="mt-4 w-full">
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button className="w-full">Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
