import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "w-64 border-r border-border bg-card p-6 hidden lg:block",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Main({ className, children, ...props }: MainProps) {
  return (
    <main
      className={cn("flex-1 overflow-auto p-6 sm:p-8 lg:p-12", className)}
      {...props}
    >
      {children}
    </main>
  );
}

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Layout({ className, children, ...props }: LayoutProps) {
  return (
    <div
      className={cn("flex h-screen flex-col overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}
