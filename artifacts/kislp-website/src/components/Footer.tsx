import React from "react";
import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logoPath from "/kislp-logo.jpeg";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img src={logoPath} alt="KUI Logo" className="h-14 w-auto object-contain rounded-full bg-white p-1" />
              <div>
                <span className="font-serif font-bold text-white tracking-wide text-xl block">KUI</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Nurturing Leaders and Peace Building. We are a prestigious institute dedicated to fostering strategic leadership and driving global peace initiatives.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-secondary hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-secondary hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/programs" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Our Programs</Link></li>
              <li><Link href="/impact" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Our Impact</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">Get Involved</h3>
            <ul className="space-y-3">
              <li><Link href="/donate" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Make a Donation</Link></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Partner with Us</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Volunteer</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-0.5" size={18} />
                <span className="text-primary-foreground/80 text-sm">123 Peace Avenue, Diplomatic Quarter, Global City 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={18} />
                <span className="text-primary-foreground/80 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={18} />
                <span className="text-primary-foreground/80 text-sm">info@kussalainstitute.org</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Kussala Institute for Strategic Leadership and Peacebuilding. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
