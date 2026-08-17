import React from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  HeartHandshake,
  Image as ImageIcon,
  Users,
  ShieldAlert,
  LogOut,
  Globe,
  ExternalLink
} from "lucide-react";
import { removeToken } from "../services/api";

interface SidebarProps {
  user: any;
}

export default function Sidebar({ user }: SidebarProps) {
  const [location] = useLocation();

  const handleLogout = () => {
    removeToken();
    window.location.href = "/login";
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/articles", label: "Articles", icon: FileText },
    { href: "/news", label: "News & Events", icon: Newspaper },
    { href: "/impact", label: "Impact Stories", icon: HeartHandshake },
    { href: "/media", label: "Media Library", icon: ImageIcon },
  ];

  if (user?.role === "SUPER_ADMIN" || user?.role === "ADMIN") {
    navItems.push(
      { href: "/users", label: "Users & Roles", icon: Users },
      { href: "/audit-logs", label: "Audit Logs", icon: ShieldAlert }
    );
  }

  return (
    <aside className="w-64 bg-[#002B49] text-white flex flex-col min-h-screen shrink-0 shadow-lg">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center font-bold text-[#002B49] text-xl font-serif">
          K
        </div>
        <div>
          <h1 className="font-serif font-bold text-lg leading-tight tracking-wide">KUSSALA</h1>
          <p className="text-xs text-[#C5A059] uppercase tracking-widest font-semibold">CMS Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#C5A059] text-[#002B49] font-bold shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/90 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe size={14} className="text-[#C5A059]" />
            Public Website
          </span>
          <ExternalLink size={12} />
        </a>

        <a
          href="https://lms.kussalainstitute.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/90 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} className="text-[#C5A059]" />
            Learning LMS (Moodle)
          </span>
        </a>

        <div className="pt-2 flex items-center justify-between px-2">
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{user?.full_name}</p>
            <p className="text-[10px] text-[#C5A059] uppercase font-bold tracking-wider">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 text-white/70 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
