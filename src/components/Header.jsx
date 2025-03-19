import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <MobileNav />
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="text-xl font-bold">
                        Minimalist Blog
                    </Link>
                </div>
                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="hover:text-primary text-sm font-medium transition-colors">
                        Home
                    </Link>
                    <Link href="/blog" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                        Blog
                    </Link>
                    <Link href="/about" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                        About
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    <nav className="flex items-center gap-2">
                        <Link
                            href="/login"
                            className="text-muted-foreground hover:text-primary hidden text-sm font-medium transition-colors md:inline-block"
                        >
                            Login
                        </Link>
                        <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
                            <Link href="/register">Sign Up</Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}

function MobileNav() {
    return (
        <div className="flex flex-col gap-4 py-4 container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="hover:text-primary text-sm font-medium transition-colors">
                Home
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                Blog
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                About
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                Login
            </Link>
            <Link href="/register" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                Sign Up
            </Link>
        </div>
    );
}
