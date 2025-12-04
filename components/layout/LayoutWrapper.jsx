"use client";
import { usePathname } from 'next/navigation';
import AppLayout from './AppLayout';
import InstructorLayout from './InstructorLayout';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Use InstructorLayout for instructor routes
  if (pathname?.startsWith('/instructor')) {
    return <InstructorLayout>{children}</InstructorLayout>;
  }
  
  // Use AppLayout for all other routes
  return <AppLayout>{children}</AppLayout>;
}
