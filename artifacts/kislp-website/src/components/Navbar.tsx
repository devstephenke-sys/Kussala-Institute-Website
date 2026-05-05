import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import logoPath from "/kislp-logo.jpeg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <img src={logoPath} alt="KISLP Logo" className="h-12 w-auto object-contain rounded-full border-2 border-primary" />
            <div className="hidden sm:block flex-col">
              <span className="font-serif font-bold text-primary tracking-wide text-lg block leading-tight">KISLP</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Peacebuilding & Leadership</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location === link.href ? "text-secondary font-semibold" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/donate"
              className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold text-sm transition-all hover:bg-secondary/90 hover:scale-105 active:scale-95 shadow-sm"
            >
              Donate
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 text-center bg-secondary text-secondary-foreground px-3 py-3 rounded-md text-base font-bold shadow-sm"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
