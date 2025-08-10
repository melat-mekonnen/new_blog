import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Events", href: "/events" },
  { name: "Communities", href: "/communities" },
  { name: "News", href: "/news" },
  { name: "Games", href: "/games" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b pl-5 pr-5">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-9 h-9">
            <Image
              src="/assets/images/EGA_logo.png"
              alt="Company Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4">
                <ModeToggle />
              </div>
              <Button asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
