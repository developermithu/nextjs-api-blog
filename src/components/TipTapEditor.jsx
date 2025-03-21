"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';

export default function TipTapEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'Write your content here...',
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'min-h-[180px] outline-none w-full p-4',
            },
        },
    });

    // This effect updates the editor content when the content prop changes
    useEffect(() => {
        if (editor && content && editor.getHTML() !== content) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-50 p-2 border-b border-gray-300 flex flex-wrap gap-1">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                >
                    Bold
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                >
                    Italic
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
                >
                    H2
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
                >
                    H3
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
                >
                    Bullet List
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
                >
                    Ordered List
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
                >
                    Quote
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    Divider
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt('Enter the URL of the image:');
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                >
                    Image
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt('Enter the URL:');
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                    className={editor.isActive('link') ? 'bg-gray-200' : ''}
                >
                    Link
                </Button>
            </div>
            <EditorContent editor={editor} className="prose max-w-none" />
        </div>
    );
}