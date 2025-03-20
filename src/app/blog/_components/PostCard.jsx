import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

export function PostCard({ post }) {
    return (
        <Card className="flex h-full flex-col overflow-hidden">
            <div className="relative h-48 w-full">
                <Link href={`/blog/${post.slug}`}>
                    <Image
                        src={post.cover_image || 'https://placehold.co/1200x600'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                    />
                </Link>
                <Badge className="absolute top-4 left-4">{post.category?.name}</Badge>
            </div>
            <CardHeader className="flex-1">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                </Link>
                <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-sm">{post.author.name}</span>
                </div>
                <div className="text-muted-foreground flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3" />
                    {post.date}
                </div>
            </CardFooter>
        </Card>
    );
}
