import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function FeaturedPost({ post }) {
    return (
        <div className="bg-card relative overflow-hidden rounded-lg border">
            <div className="flex flex-col md:flex-row">
                <div className="relative h-60 lg:h-72 w-full md:h-auto md:w-1/2">
                    <Image src={post.cover_image || 'https://placehold.co/1200x600'} alt={post.title} fill className="object-cover" />
                    <Badge className="absolute top-4 left-4">{post.category?.name}</Badge>
                </div>
                <div className="flex flex-col justify-between p-6 md:w-1/2">
                    <div className="space-y-4">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{post.title}</h2>
                        </Link>
                        <p className="text-muted-foreground">{post.excerpt}</p>
                    </div>
                    <div className="mt-6 flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{post.author.name}</p>
                                <p className="text-muted-foreground text-sm">{post.date}</p>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href={`/blog/${post.slug}`}>Read More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
