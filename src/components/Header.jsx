'use client'

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/auth';
import { SidebarNavigation } from './SidebarNavigation';

export function Header() {
    const { user } = useAuth({ middleware: 'guest' });
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/blog', label: 'Blog' },
        { href: '/about', label: 'About' },
    ];

    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] p-0">
                                <SidebarNavigation user={user} currentPath={pathname} />
                            </SheetContent>
                        </Sheet>
                        <Link href="/" className="text-xl font-bold">
                            Blog
                        </Link>
                    </div>
                    <nav className="hidden items-center gap-6 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    isActive(link.href)
                                        ? "text-primary font-semibold"
                                        : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <nav className="flex items-center gap-2">
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    className={cn(
                                        "hidden text-sm font-medium transition-colors md:inline-block",
                                        isActive('/dashboard')
                                            ? "text-primary font-semibold"
                                            : "text-muted-foreground hover:text-primary"
                                    )}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className={cn(
                                            "hidden text-sm font-medium transition-colors md:inline-block",
                                            isActive('/login')
                                                ? "text-primary font-semibold"
                                                : "text-muted-foreground hover:text-primary"
                                        )}
                                    >
                                        Login
                                    </Link>
                                    <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
                                        <Link href="/register">Sign Up</Link>
                                    </Button>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
