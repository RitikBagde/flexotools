// src/components/Navigation.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface User {
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const hasCheckedUser = useRef(false);

  useEffect(() => {
    const savedTheme = (typeof window !== 'undefined' && localStorage.getItem('theme')) as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!hasCheckedUser.current) {
      hasCheckedUser.current = true;
      checkUser();
    }
  }, []);

  const checkUser = async () => {
  try {
    console.log('🔍 Checking user session...');

    const response = await fetch('/api/auth/user', {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Response status:', response.status);

    // ⭐ Handle logged-out state (401) gracefully
    if (response.status === 401) {
      console.log('ℹ️ No active session (401). User is logged out.');
      setUser(null);
      return;
    }

    if (response.ok) {
      const data = await response.json();
      console.log('✅ User data received:', data.user ? 'User found' : 'No user');
      setUser(data.user ?? null);
    } else {
      console.log('⚠️ Response not OK:', response.statusText);
      const errorText = await response.text();
      console.log('Error details:', errorText);
      setUser(null);
    }
  } catch (error) {
    console.error('❌ Error checking user:', error);

    if (error instanceof TypeError) {
      console.error('Network error - API route might not be accessible');
    }

    setUser(null);
  } finally {
    setLoading(false);
    console.log('✔️ User check complete');
  }
};


  const handleSignOut = async () => {
    try {
      console.log('🚪 Signing out...');
      const response = await fetch('/api/auth/signout', { 
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        console.log('✅ Signout successful');
        setUser(null);
        setShowUserMenu(false);
        setMobileMenuOpen(false);
        router.push('/');
        // Use window.location for a hard refresh after sign out
        setTimeout(() => window.location.href = '/', 100);
      } else {
        console.error('❌ Signout failed:', response.statusText);
      }
    } catch (error) {
      console.error('❌ Error signing out:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const navLinks = [
    { href: "/", label: "Tools" },
    // { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    // SEO: Semantic nav element with proper role
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/10 shadow-lg' 
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - SEO: Descriptive aria-label */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            aria-label="FlexoTools - Home"
          >
            <div className="w-9 h-9 bg-linear-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 shadow-lg" aria-hidden="true">
              <span className="text-white font-bold text-sm">FT</span>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              FlexoTools
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-foreground bg-foreground/5'
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Theme Toggle - SEO: Better aria-label */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Auth Section */}
            <div className="ml-2 min-w-[100px] flex justify-end">
              {loading ? (
                <div className="w-9 h-9 rounded-full bg-foreground/5 animate-pulse" aria-label="Loading user"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                    aria-label="User menu"
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                  >
                    <div className="w-9 h-9 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:scale-110 transition-transform">
                      {getUserInitials()}
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowUserMenu(false)}
                        aria-hidden="true"
                      ></div>
                      <div 
                        className="absolute right-0 mt-2 w-64 bg-background border border-foreground/10 rounded-xl shadow-2xl z-20 overflow-hidden"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="p-4 bg-linear-to-br from-purple-500/10 to-blue-500/10 border-b border-foreground/10">
                          <p className="font-semibold text-foreground truncate">
                            {user.user_metadata?.full_name || 'User'}
                          </p>
                          <p className="text-sm text-foreground/60 truncate">
                            {user.email}
                          </p>
                        </div>

                        <div className="py-2">
                          <Link
                            href="/dashboard"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Account Settings
                          </Link>
                          <div className="border-t border-foreground/10 my-2" role="separator"></div>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="px-5 py-2 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-200"
                  aria-label="Sign in or create account"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {!loading && user ? (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {getUserInitials()}
              </button>
            ) : (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-128 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="px-4 py-4 space-y-2 bg-background/95 backdrop-blur-xl border-b border-foreground/10">
          {user && (
            <div className="mb-4 p-3 bg-linear-to-br from-purple-500/10 to-blue-500/10 rounded-lg border border-foreground/10">
              <p className="font-semibold text-foreground text-sm truncate">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-foreground/60 truncate">
                {user.email}
              </p>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? 'text-foreground bg-foreground/10'
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
              >
                Account Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 text-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="block w-full px-4 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-center text-sm"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}