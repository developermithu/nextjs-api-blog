'use client'

import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function SharePost({ title, url }) {
    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            color: 'bg-[#1877f2] hover:bg-[#1877f2]/90',
        },
        {
            name: 'Twitter',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
            color: 'bg-[#1da1f2] hover:bg-[#1da1f2]/90',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            color: 'bg-[#0a66c2] hover:bg-[#0a66c2]/90',
        },
    ];

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
    };

    return (
        <div className="flex flex-col items-center gap-4 my-8">
            <h3 className="text-lg font-semibold">Share this post</h3>
            <div className="flex gap-3">
                {shareLinks.map((link) => (
                    <Button
                        key={link.name}
                        variant="ghost"
                        size="icon"
                        className={`${link.color} text-white cursor-pointer`}
                        onClick={() => window.open(link.href, '_blank')}
                        title={`Share on ${link.name}`}
                    >
                        <link.icon className="h-5 w-5" />
                    </Button>
                ))}

                <Button
                    variant="ghost"
                    size="icon"
                    className="bg-gray-500 hover:bg-gray-500/90 text-white cursor-pointer"
                    onClick={copyLink}
                    title="Copy link"
                >
                    <LinkIcon className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}