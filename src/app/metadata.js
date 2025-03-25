export const metadata = {
    title: 'Minimalist Blog - Next.js, and Laravel Rest API',
    description: 'A clean and modern blog built with Next.js, Laravel, and Tailwind CSS',
    keywords: ['blog', 'programming', 'web development', 'next.js', 'laravel', 'react'],
    authors: [{ name: 'developermithu' }],

    // Open Graph metadata
    openGraph: {
        title: 'Minimalist Blog - Next.js, and Laravel Rest API',
        description: 'A clean and modern blog built with Next.js, Laravel, and Tailwind CSS',
        url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        siteName: 'Minimalist Blog',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=630&q=80',
                width: 1200,
                height: 630,
                alt: 'Programming and coding on a laptop',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },

    // Twitter metadata
    twitter: {
        card: 'summary_large_image',
        title: 'Minimalist Blog - Next.js, and Laravel Rest API',
        description: 'A clean and modern blog built with Next.js, Laravel, and Tailwind CSS',
        images: [
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=630&q=80',
        ],
        creator: 'developermithu',
    },
};
