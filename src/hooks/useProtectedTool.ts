'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getToolConfig } from '@/config/tools';

export function useProtectedTool() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const toolConfig = getToolConfig(pathname);
    
    // If tool doesn't require auth, skip check
    if (!toolConfig?.requiresAuth) {
      setIsChecking(false);
      setIsAuthenticated(true);
      return;
    }

    // Check authentication for protected tools
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        
        if (!response.ok) {
          // Not authenticated - redirect to signin with return URL
          router.push(`/auth?redirect=${pathname}`);
          return;
        }
        
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          router.push(`/auth?redirect=${pathname}`);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push(`/auth?redirect=${pathname}`);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  return { isChecking, isAuthenticated };
}