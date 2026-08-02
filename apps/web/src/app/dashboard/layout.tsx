"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Settings, LogOut, LayoutGrid } from "lucide-react";
import { useSession, signOut } from "@/lib/auth/client";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const displayName = session?.user?.name || (session?.user?.email ? session.user.email.split('@')[0] : "Traveler");

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col relative z-10">
      {/* Floating Header */}
      <header className="sticky top-6 z-50 w-full px-6 flex justify-center">
        <div className="w-full max-w-5xl flex items-center justify-between px-6 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="VerseCV" width={28} height={28} className="rounded-md" />
            <span className="font-outfit font-bold tracking-wide">VerseCV</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className={`flex items-center gap-2 transition-colors ${pathname === '/dashboard' ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`}
            >
              <LayoutGrid className={`w-4 h-4 ${pathname === '/dashboard' ? 'text-primary' : ''}`} />
              Manifestations
            </Link>
            <Link 
              href="/dashboard/favorites" 
              className={`flex items-center gap-2 transition-colors ${pathname === '/dashboard/favorites' ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`}
            >
              <Star className={`w-4 h-4 ${pathname === '/dashboard/favorites' ? 'text-yellow-400' : ''}`} />
              Favorites
            </Link>
            <Link 
              href="/dashboard/settings" 
              className={`flex items-center gap-2 transition-colors ${pathname === '/dashboard/settings' ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`}
            >
              <Settings className={`w-4 h-4 ${pathname === '/dashboard/settings' ? 'text-blue-400' : ''}`} />
              Settings
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-white/70">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span>{displayName}</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all border border-white/10"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col">
        {children}
      </div>
    </div>
  );
}
