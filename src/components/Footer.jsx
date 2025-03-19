import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
                    © {new Date().getFullYear()} Minimalist Blog. All rights reserved.
                </p>
                <nav className="flex items-center gap-4 text-sm">
                    <Link href="/terms" className="text-muted-foreground underline-offset-4 hover:underline">
                        Terms
                    </Link>
                    <Link href="/privacy" className="text-muted-foreground underline-offset-4 hover:underline">
                        Privacy
                    </Link>
                    <Link href="/contact" className="text-muted-foreground underline-offset-4 hover:underline">
                        Contact
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
