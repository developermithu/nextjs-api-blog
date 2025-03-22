import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function SidebarNavigation({ user, currentPath }) {
    const isActive = (path) => currentPath === path;

    return (
        <>
            <SheetHeader className="border-b p-6">
                <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col py-6">
                <Link
                    href="/"
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-colors",
                        isActive('/')
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    )}
                >
                    Home
                </Link>
                <Link
                    href="/blog"
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-colors",
                        isActive('/blog')
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    )}
                >
                    Blog
                </Link>
                <Link
                    href="/about"
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-colors",
                        isActive('/about')
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    )}
                >
                    About
                </Link>
                {user ? (
                    <Link
                        href="/dashboard"
                        className={cn(
                            "px-6 py-3 text-sm font-medium transition-colors",
                            isActive('/dashboard')
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                        )}
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className={cn(
                                "px-6 py-3 text-sm font-medium transition-colors",
                                isActive('/login')
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                            )}
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className={cn(
                                "px-6 py-3 text-sm font-medium transition-colors",
                                isActive('/register')
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                            )}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}