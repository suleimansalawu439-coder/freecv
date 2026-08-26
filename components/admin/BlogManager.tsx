"use client";

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import { Plus, Edit2, Trash2, Check, X, FileText, Globe, EyeOff, Save, Bold, Italic, List, ListOrdered } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BlogManager({ blogPosts, isDarkMode }: { blogPosts: any[], isDarkMode: boolean }) {
  const [posts, setPosts] = useState<any[]>(blogPosts || []);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (post: any) => {
    setEditingPost({ ...post });
  };

  const handleCreate = () => {
    setEditingPost({
      title: '',
      slug: '',
      content: '',
      meta_description: '',
      header_image: '',
      is_published: false
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      
      setPosts(posts.filter(p => p.id !== id));
      toast.success('Post deleted');
    } catch (err: any) {
      toast.error(err.message || 'Error deleting post');
    }
  };

  const handleSave = async () => {
    if (!editingPost.title || !editingPost.slug || !editingPost.content) {
      toast.error('Title, slug, and content are required');
      return;
    }
    
    setIsSaving(true);
    try {
      const isNew = !editingPost.id;
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${editingPost.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost)
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      
      const savedPost = await res.json();
      
      if (isNew) {
        setPosts([savedPost, ...posts]);
      } else {
        setPosts(posts.map(p => p.id === savedPost.id ? savedPost : p));
      }
      
      toast.success('Post saved successfully');
      setEditingPost(null);
    } catch (err: any) {
      toast.error(err.message || 'Error saving post');
    } finally {
      setIsSaving(false);
    }
  };

  if (editingPost) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{editingPost.id ? 'Edit Post' : 'Create New Post'}</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => setEditingPost(null)}
              className={cn("px-4 py-2 rounded-lg font-medium transition-colors", isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200")}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSaving ? <span className="animate-spin text-xl leading-none">⟳</span> : <Save size={18} />}
              {isSaving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className={cn("p-6 rounded-xl border shadow-sm", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
              <div className="space-y-4">
                <div>
                  <label className={cn("block text-sm font-medium mb-1", isDarkMode ? "text-gray-300" : "text-gray-700")}>Title</label>
                  <input 
                    type="text" 
                    value={editingPost.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                      setEditingPost({ ...editingPost, title, slug: editingPost.id ? editingPost.slug : slug });
                    }}
                    className={cn("w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all", isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300")}
                    placeholder="E.g. How to Write a Winning Resume"
                  />
                </div>
                
                <div>
                  <label className={cn("block text-sm font-medium mb-1", isDarkMode ? "text-gray-300" : "text-gray-700")}>Content</label>
                  <div className={cn("border rounded-lg overflow-hidden", isDarkMode ? "border-gray-700" : "border-gray-300")}>
                    <TiptapEditor 
                      content={editingPost.content} 
                      onChange={(content) => setEditingPost({ ...editingPost, content })}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className={cn("p-6 rounded-xl border shadow-sm", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
              <h3 className="font-bold text-lg mb-4">Post Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className={cn("block text-sm font-medium mb-1", isDarkMode ? "text-gray-300" : "text-gray-700")}>URL Slug</label>
                  <input 
                    type="text" 
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className={cn("w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all", isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300")}
                    placeholder="how-to-write-a-winning-resume"
                  />
                </div>
                
                <div>
                  <label className={cn("block text-sm font-medium mb-1", isDarkMode ? "text-gray-300" : "text-gray-700")}>Meta Description</label>
                  <textarea 
                    value={editingPost.meta_description || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, meta_description: e.target.value })}
                    rows={3}
                    className={cn("w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all", isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300")}
                    placeholder="Brief summary for SEO..."
                  />
                </div>
                
                <div>
                  <label className={cn("block text-sm font-medium mb-1", isDarkMode ? "text-gray-300" : "text-gray-700")}>Header Image URL</label>
                  <input 
                    type="text" 
                    value={editingPost.header_image || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, header_image: e.target.value })}
                    className={cn("w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all", isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300")}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className={cn("text-xs mt-1", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                    Used as the hero image and OpenGraph image for social sharing.
                  </p>
                  {editingPost.header_image && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-700">
                      <img src={editingPost.header_image} alt="Header preview" className="w-full h-32 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  )}
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={editingPost.is_published}
                        onChange={(e) => setEditingPost({ ...editingPost, is_published: e.target.checked })}
                      />
                      <div className={cn("block w-10 h-6 rounded-full transition-colors", editingPost.is_published ? "bg-blue-600" : "bg-gray-600")}></div>
                      <div className={cn("dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform", editingPost.is_published ? "translate-x-4" : "")}></div>
                    </div>
                    <div className="font-medium">
                      Publish Post
                      <p className={cn("text-xs font-normal", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                        {editingPost.is_published ? 'Visible to public' : 'Hidden as draft'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Blog CMS</h2>
          <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>Manage your SEO content and marketing articles.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} />
          Create Post
        </button>
      </div>

      <div className={cn("rounded-xl border shadow-sm overflow-hidden transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className={cn("text-xs uppercase font-semibold border-b transition-colors tracking-wider", isDarkMode ? "bg-gray-900/50 text-gray-400 border-gray-800" : "bg-gray-50 text-gray-500 border-gray-200")}>
            <tr>
              <th className="px-6 py-4">Post Title & Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={cn("divide-y transition-colors", isDarkMode ? "divide-gray-800" : "divide-gray-100")}>
            {posts.map((post) => (
              <tr key={post.id} className={cn("transition-colors", isDarkMode ? "hover:bg-gray-900/30" : "hover:bg-gray-50")}>
                <td className="px-6 py-4">
                  <div className="font-bold text-base flex items-center gap-2">
                    <FileText size={16} className="text-blue-500" />
                    {post.title}
                  </div>
                  <div className={cn("text-xs mt-1 font-mono", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                    /blog/{post.slug}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {post.is_published ? (
                    <span className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 w-max", isDarkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-700")}>
                      <Globe size={12} /> Published
                    </span>
                  ) : (
                    <span className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 w-max", isDarkMode ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700")}>
                      <EyeOff size={12} /> Draft
                    </span>
                  )}
                </td>
                <td className={cn("px-6 py-4", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(post)}
                      className={cn("p-2 rounded-lg transition-colors", isDarkMode ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-900")}
                      title="Edit post"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-lg transition-colors hover:bg-red-500/10 text-red-500"
                      title="Delete post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className={cn("px-6 py-12 text-center", isDarkMode ? "text-gray-500 bg-gray-900/50" : "text-gray-500 bg-gray-50")}>
                  No blog posts found. Create your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Tiptap Editor Component
const MenuBar = ({ editor, isDarkMode }: { editor: any, isDarkMode: boolean }) => {
  if (!editor) return null;
  
  return (
    <div className={cn("flex flex-wrap gap-1 p-2 border-b", isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300")}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn("p-1.5 rounded transition-colors", editor.isActive('bold') ? (isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black") : (isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"))}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn("p-1.5 rounded transition-colors", editor.isActive('italic') ? (isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black") : (isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"))}
      >
        <Italic size={16} />
      </button>
      
      <div className="w-px h-6 bg-gray-600 mx-1 self-center"></div>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn("px-2 py-1 text-sm font-bold rounded transition-colors", editor.isActive('heading', { level: 2 }) ? (isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black") : (isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"))}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn("px-2 py-1 text-sm font-bold rounded transition-colors", editor.isActive('heading', { level: 3 }) ? (isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black") : (isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"))}
      >
        H3
      </button>
      
      <div className="w-px h-6 bg-gray-600 mx-1 self-center"></div>
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn("p-1.5 rounded transition-colors", editor.isActive('bulletList') ? (isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black") : (isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"))}
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn("p-1.5 rounded transition-colors", editor.isActive('orderedList') ? (isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black") : (isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"))}
      >
        <ListOrdered size={16} />
      </button>
    </div>
  );
};

const TiptapEditor = ({ content, onChange, isDarkMode }: { content: string, onChange: (html: string) => void, isDarkMode: boolean }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: false })
    ],
    content: content || '<p>Start writing your post here...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn('prose max-w-none p-4 min-h-[400px] outline-none', isDarkMode ? 'prose-invert' : ''),
      },
    },
  });

  return (
    <div className={cn("flex flex-col h-full", isDarkMode ? "bg-gray-900" : "bg-white")}>
      <MenuBar editor={editor} isDarkMode={isDarkMode} />
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
    </div>
  );
};
