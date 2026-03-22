/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback, useRef, type FormEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Tag,
  Eye,
  EyeOff,
  Loader2,
  Check,
  AlertCircle,
  Search,
  ChevronDown,
  Link2,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { useAuth } from '@/context/AuthContext';
import { uploadToCloudinary } from '@/lib/cloudinary';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/* -- Types ---------------------------------------------------------------- */

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  relatedServices: string[] | { _id: string; title: string; slug: string; image: string }[];
  sections?: BlogSection[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
}

interface BlogSection {
  title: string;
  description: string;
  image: string;
}

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  relatedServices: string[];
  sections: BlogSection[];
  isPublished: boolean;
}

const emptyForm: BlogForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  author: 'Nick Zugrav',
  category: '',
  tags: [],
  readTime: '5 min read',
  relatedServices: [],
  sections: [{ title: '', description: '', image: '' }],
  isPublished: false,
};

/* -- Helpers -------------------------------------------------------------- */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/* -- Quill config --------------------------------------------------------- */

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['blockquote', 'code-block'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'link',
  'image',
  'blockquote',
  'code-block',
];

/* -- Shared focus/blur handlers ------------------------------------------- */

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'var(--accent)';
  e.currentTarget.style.boxShadow =
    '0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent)';
};

const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'var(--border)';
  e.currentTarget.style.boxShadow = 'none';
};

/* ========================================================================= */
/*  Component                                                                 */
/* ========================================================================= */

export default function DashboardBlogPage() {
  const { user } = useAuth();

  /* -- State -------------------------------------------------------------- */
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadingSectionIndex, setUploadingSectionIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  /* -- Auto-dismiss message ----------------------------------------------- */
  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  /* -- Close services dropdown on outside click --------------------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* -- Auth token --------------------------------------------------------- */
  const getToken = useCallback(async () => {
    if (!user) return '';
    return await user.getIdToken();
  }, [user]);

  /* -- Fetch blogs -------------------------------------------------------- */
  const fetchBlogs = useCallback(async () => {
    try {
      setLoadingBlogs(true);
      const res = await fetch(`${API_URL}/blogs`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch {
      setMessage({ type: 'error', text: 'Failed to load blogs' });
    } finally {
      setLoadingBlogs(false);
    }
  }, []);

  /* -- Fetch services for dropdown ---------------------------------------- */
  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((r) => r.json())
      .then(setAllServices)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  /* -- Auto-slug from title ----------------------------------------------- */
  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: editingId ? prev.slug : slugify(value),
    }));
  };

  /* -- Image upload ------------------------------------------------------- */
  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const token = await getToken();
      const url = await uploadToCloudinary(file, token);
      setForm((prev) => ({ ...prev, image: url }));
    } catch {
      setMessage({ type: 'error', text: 'Image upload failed' });
    } finally {
      setUploading(false);
    }
  };

  /* -- Drag & drop for image ---------------------------------------------- */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  /* -- Sections ----------------------------------------------------------- */
  const handleSectionChange = (index: number, field: keyof BlogSection, value: string) => {
    setForm((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: '', description: '', image: '' }],
    }));
  };

  const removeSection = (index: number) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSectionImageUpload = async (file: File, index: number) => {
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file.' });
      return;
    }
    setUploadingSectionIndex(index);
    try {
      const token = await getToken();
      const url = await uploadToCloudinary(file, token);
      handleSectionChange(index, 'image', url);
    } catch {
      setMessage({ type: 'error', text: 'Section image upload failed.' });
    } finally {
      setUploadingSectionIndex(null);
    }
  };

  /* -- Tags --------------------------------------------------------------- */
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  /* -- Related services toggle -------------------------------------------- */
  const toggleService = (serviceId: string) => {
    setForm((prev) => ({
      ...prev,
      relatedServices: prev.relatedServices.includes(serviceId)
        ? prev.relatedServices.filter((id) => id !== serviceId)
        : [...prev.relatedServices, serviceId],
    }));
  };

  const removeService = (serviceId: string) => {
    setForm((prev) => ({
      ...prev,
      relatedServices: prev.relatedServices.filter((id) => id !== serviceId),
    }));
  };

  /* -- Submit (create / update) ------------------------------------------- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      const token = await getToken();
      const url = editingId ? `${API_URL}/blogs/${editingId}` : `${API_URL}/blogs`;
      const method = editingId ? 'PATCH' : 'POST';

      const payload = {
        ...form,
        sections: form.sections.filter(s => s.title.trim() || s.description.trim() || s.image),
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to save blog');
      }

      setMessage({
        type: 'success',
        text: editingId ? 'Blog post updated successfully!' : 'Blog post created successfully!',
      });
      setForm(emptyForm);
      setEditingId(null);
      await fetchBlogs();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  /* -- Edit --------------------------------------------------------------- */
  const startEdit = (blog: Blog) => {
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      readTime: blog.readTime,
      relatedServices: blog.relatedServices.map((s: any) =>
        typeof s === 'string' ? s : s._id,
      ),
      sections: blog.sections?.length ? blog.sections : [{ title: '', description: '', image: '' }],
      isPublished: blog.isPublished,
    });
    setEditingId(blog._id);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
    setMessage(null);
  };

  /* -- Delete ------------------------------------------------------------- */
  const handleDelete = async (id: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete blog');
      setDeleteConfirm(null);
      setMessage({ type: 'success', text: 'Blog post deleted successfully!' });
      await fetchBlogs();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete blog' });
    }
  };

  /* -- Filter blogs ------------------------------------------------------- */
  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  /* -- Get service count for a blog --------------------------------------- */
  const getServiceCount = (blog: Blog): number => {
    return Array.isArray(blog.relatedServices) ? blog.relatedServices.length : 0;
  };

  /* -- Animation variants ------------------------------------------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  /* ======================================================================= */
  /*  Render                                                                  */
  /* ======================================================================= */

  return (
    <>
      {/* Quill theme overrides */}
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border-color: var(--border) !important;
          border-radius: 0.75rem 0.75rem 0 0;
          background: var(--muted);
        }
        .ql-toolbar.ql-snow .ql-stroke {
          stroke: var(--muted-foreground) !important;
        }
        .ql-toolbar.ql-snow .ql-fill {
          fill: var(--muted-foreground) !important;
        }
        .ql-toolbar.ql-snow .ql-picker-label {
          color: var(--muted-foreground) !important;
        }
        .ql-toolbar.ql-snow .ql-picker-options {
          background: var(--card) !important;
          border-color: var(--border) !important;
        }
        .ql-toolbar.ql-snow .ql-picker-item {
          color: var(--foreground) !important;
        }
        .ql-container.ql-snow {
          border-color: var(--border) !important;
          border-radius: 0 0 0.75rem 0.75rem;
          font-size: 0.875rem;
        }
        .ql-editor {
          min-height: 200px;
          color: var(--foreground) !important;
          background: var(--card) !important;
          border-radius: 0 0 0.75rem 0.75rem;
        }
        .ql-editor.ql-blank::before {
          color: var(--muted-foreground) !important;
          font-style: normal;
        }
        .ql-snow .ql-tooltip {
          background: var(--card) !important;
          border-color: var(--border) !important;
          color: var(--foreground) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12) !important;
          border-radius: 0.5rem !important;
        }
        .ql-snow .ql-tooltip input[type='text'] {
          background: var(--muted) !important;
          border-color: var(--border) !important;
          color: var(--foreground) !important;
          border-radius: 0.375rem !important;
        }
      `}</style>

      <div
        className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 mt-20"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="mx-auto max-w-6xl space-y-8">
          {/* -- Page header ------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
              }}
            >
              <FileText size={22} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <h1
                className="text-2xl font-black tracking-tight"
                style={{ color: 'var(--foreground)' }}
              >
                Blog Management
              </h1>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Create, edit and manage blog posts
              </p>
            </div>
          </motion.div>

          {/* ============ Add / Edit Form ============ */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              boxShadow: '0 4px 24px rgba(0,0,0,.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              {editingId ? (
                <Pencil size={18} style={{ color: 'var(--accent)' }} />
              ) : (
                <Plus size={18} style={{ color: 'var(--accent)' }} />
              )}
              <h2
                className="text-lg font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row: Title + Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Blog post title"
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                {/* Slug */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                    placeholder="blog-post-slug"
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Excerpt
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                  placeholder="Short summary of the blog post..."
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 resize-none"
                  style={{
                    backgroundColor: 'var(--muted)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                  }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

              {/* Content (Rich Text Editor) */}
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={form.content}
                  onChange={(value: string) => setForm((p) => ({ ...p, content: value }))}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your blog post content here..."
                />
              </div>

              {/* Featured Image upload with drag & drop */}
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Featured Image
                </label>

                {!form.image ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-10 cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: dragOver
                        ? 'color-mix(in srgb, var(--accent) 8%, transparent)'
                        : 'var(--muted)',
                      border: dragOver
                        ? '2px dashed var(--accent)'
                        : '2px dashed var(--border)',
                    }}
                  >
                    {uploading ? (
                      <Loader2
                        size={28}
                        className="animate-spin"
                        style={{ color: 'var(--accent)' }}
                      />
                    ) : (
                      <Upload size={28} style={{ color: 'var(--muted-foreground)' }} />
                    )}
                    <div className="text-center">
                      <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                        {uploading ? 'Uploading...' : 'Drop an image here or click to upload'}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        PNG, JPG, WebP up to 10MB
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <Image
                      src={form.image}
                      alt="Preview"
                      width={280}
                      height={160}
                      className="rounded-xl object-cover"
                      style={{ border: '1px solid var(--border)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, image: '' }))}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#fff',
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Content Sections */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>
                    Content Sections
                  </label>
                </div>
                <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>
                  Add structured content sections with images for the blog post.
                </p>
                <div className="flex flex-col gap-4">
                  {form.sections.map((section, i) => (
                    <div
                      key={i}
                      className="relative rounded-xl p-4 flex flex-col gap-3"
                      style={{ background: 'var(--muted)' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                          Section {i + 1}
                        </span>
                        {form.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSection(i)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200"
                            style={{ color: 'var(--muted-foreground)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#dc2626';
                              e.currentTarget.style.background = 'var(--background)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--muted-foreground)';
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => handleSectionChange(i, 'title', e.target.value)}
                        placeholder="Section title"
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--card)',
                          color: 'var(--foreground)',
                          border: '1px solid var(--border)',
                        }}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                      <textarea
                        value={section.description}
                        onChange={(e) => handleSectionChange(i, 'description', e.target.value)}
                        placeholder="Section description..."
                        rows={4}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 resize-none"
                        style={{
                          backgroundColor: 'var(--card)',
                          color: 'var(--foreground)',
                          border: '1px solid var(--border)',
                        }}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                      {/* Section Image */}
                      <div>
                        {uploadingSectionIndex === i ? (
                          <div
                            className="rounded-xl p-4 flex flex-col items-center gap-2"
                            style={{ border: '2px dashed var(--border)' }}
                          >
                            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)' }} />
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Uploading...</p>
                          </div>
                        ) : section.image ? (
                          <div className="flex items-center gap-3">
                            <div className="relative inline-block">
                              <Image
                                src={section.image}
                                alt={`Section ${i + 1}`}
                                width={120}
                                height={80}
                                className="rounded-lg object-cover"
                                style={{ border: '1px solid var(--border)' }}
                              />
                              <button
                                type="button"
                                onClick={() => handleSectionChange(i, 'image', '')}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                                style={{ background: '#ef4444', color: '#fff' }}
                              >
                                <X size={10} />
                              </button>
                            </div>
                            <label
                              className="text-xs cursor-pointer font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                              style={{ color: 'var(--accent)', background: 'var(--card)' }}
                            >
                              Replace
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleSectionImageUpload(file, i);
                                }}
                              />
                            </label>
                          </div>
                        ) : (
                          <label
                            className="rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all duration-200"
                            style={{ border: '2px dashed var(--border)' }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const file = e.dataTransfer.files[0];
                              if (file) handleSectionImageUpload(file, i);
                            }}
                          >
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: 'var(--card)' }}
                            >
                              <Upload size={16} style={{ color: 'var(--muted-foreground)' }} />
                            </div>
                            <div>
                              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                                Upload section image
                              </p>
                              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                Click or drag and drop
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleSectionImageUpload(file, i);
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSection}
                    className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg w-fit cursor-pointer transition-colors duration-200"
                    style={{ color: 'var(--accent)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--muted)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Plus size={16} />
                    Add Section
                  </button>
                </div>
              </div>

              {/* Row: Author + Category + Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Author */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                    placeholder="Author name"
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    placeholder="e.g. Decking Tips"
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm((p) => ({ ...p, readTime: e.target.value }))}
                    placeholder="5 min read"
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>
              </div>

              {/* Related Services multi-select dropdown */}
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Related Services
                </label>
                <p
                  className="text-xs mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Select services related to this blog post
                </p>

                <div ref={servicesDropdownRef} className="relative">
                  {/* Dropdown trigger button */}
                  <button
                    type="button"
                    onClick={() => setServicesDropdownOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: form.relatedServices.length > 0
                        ? 'var(--foreground)'
                        : 'var(--muted-foreground)',
                      border: servicesDropdownOpen
                        ? '1px solid var(--accent)'
                        : '1px solid var(--border)',
                      boxShadow: servicesDropdownOpen
                        ? '0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent)'
                        : 'none',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <Link2 size={15} style={{ color: 'var(--accent)' }} />
                      {form.relatedServices.length > 0
                        ? `${form.relatedServices.length} service${form.relatedServices.length > 1 ? 's' : ''} selected`
                        : 'Select services...'}
                    </span>
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-200"
                      style={{
                        color: 'var(--muted-foreground)',
                        transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 mt-2 w-full rounded-xl overflow-hidden"
                        style={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          boxShadow: '0 8px 32px rgba(0,0,0,.12)',
                        }}
                      >
                        <div className="max-h-52 overflow-y-auto p-2">
                          {allServices.length === 0 && (
                            <p
                              className="px-3 py-2 text-xs"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              No services available
                            </p>
                          )}
                          {allServices.map((service) => {
                            const isSelected = form.relatedServices.includes(service._id);
                            return (
                              <button
                                key={service._id}
                                type="button"
                                onClick={() => toggleService(service._id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
                                style={{
                                  color: 'var(--foreground)',
                                  backgroundColor: isSelected
                                    ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                    : 'transparent',
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) {
                                    (e.currentTarget as HTMLElement).style.backgroundColor =
                                      'var(--muted)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.backgroundColor = isSelected
                                    ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                    : 'transparent';
                                }}
                              >
                                <div
                                  className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all duration-150"
                                  style={{
                                    backgroundColor: isSelected
                                      ? 'var(--accent)'
                                      : 'transparent',
                                    border: isSelected
                                      ? '1px solid var(--accent)'
                                      : '1px solid var(--border)',
                                  }}
                                >
                                  {isSelected && (
                                    <Check
                                      size={12}
                                      style={{ color: 'var(--accent-foreground)' }}
                                    />
                                  )}
                                </div>
                                {service.title}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Selected services as pills */}
                {form.relatedServices.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.relatedServices.map((id) => {
                      const service = allServices.find((s) => s._id === id);
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                          style={{
                            backgroundColor:
                              'color-mix(in srgb, var(--accent) 12%, transparent)',
                            color: 'var(--accent)',
                          }}
                        >
                          {service?.title || id}
                          <button
                            type="button"
                            onClick={() => removeService(id)}
                            className="hover:opacity-70 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Tags
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addTag}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--accent) 12%, transparent)',
                      color: 'var(--accent)',
                      border:
                        '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                    }}
                  >
                    <Tag size={14} />
                    Add
                  </motion.button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{
                          backgroundColor:
                            'color-mix(in srgb, var(--accent) 12%, transparent)',
                          color: 'var(--accent)',
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, isPublished: !p.isPublished }))}
                  className="relative w-12 h-7 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: form.isPublished ? 'var(--accent)' : 'var(--muted)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300"
                    style={{
                      left: form.isPublished ? '24px' : '3px',
                      backgroundColor: form.isPublished
                        ? 'var(--accent-foreground)'
                        : 'var(--muted-foreground)',
                    }}
                  />
                </button>
                <span
                  className="text-sm font-semibold flex items-center gap-1.5"
                  style={{
                    color: form.isPublished ? 'var(--accent)' : 'var(--muted-foreground)',
                  }}
                >
                  {form.isPublished ? (
                    <>
                      <Eye size={15} /> Published
                    </>
                  ) : (
                    <>
                      <EyeOff size={15} /> Draft
                    </>
                  )}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-60"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                    boxShadow:
                      '0 4px 16px color-mix(in srgb, var(--accent) 30%, transparent)',
                  }}
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : editingId ? (
                    <Pencil size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                  {submitting
                    ? 'Saving...'
                    : editingId
                      ? 'Update Blog'
                      : 'Create Blog'}
                </motion.button>

                {editingId && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <X size={16} />
                    Cancel
                  </motion.button>
                )}
              </div>

              {/* Message toast below buttons */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
                    style={{
                      background:
                        message.type === 'success' ? '#065f4620' : '#dc262620',
                      border: `1px solid ${message.type === 'success' ? '#16a34a40' : '#dc262640'}`,
                      color: message.type === 'success' ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {message.type === 'success' ? (
                      <Check size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    {message.text}
                    <button
                      type="button"
                      onClick={() => setMessage(null)}
                      className="ml-auto hover:opacity-70 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* ============ Blog Table ============ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              boxShadow: '0 4px 24px rgba(0,0,0,.06)',
            }}
          >
            {/* Table header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <h2
                className="text-lg font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                All Blog Posts{' '}
                <span
                  className="text-sm font-normal ml-1"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  ({filteredBlogs.length})
                </span>
              </h2>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted-foreground)' }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blogs..."
                  className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--muted)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                    width: '220px',
                  }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
            </div>

            {/* Loading state */}
            {loadingBlogs && (
              <div className="flex items-center justify-center py-16">
                <Loader2
                  size={28}
                  className="animate-spin"
                  style={{ color: 'var(--accent)' }}
                />
                <span
                  className="ml-3 text-sm font-medium"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Loading blogs...
                </span>
              </div>
            )}

            {/* Empty state */}
            {!loadingBlogs && filteredBlogs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor:
                      'color-mix(in srgb, var(--accent) 10%, transparent)',
                  }}
                >
                  <FileText size={24} style={{ color: 'var(--muted-foreground)' }} />
                </div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {searchQuery ? 'No blogs match your search' : 'No blog posts yet'}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {searchQuery
                    ? 'Try a different search term'
                    : 'Create your first blog post using the form above'}
                </p>
              </div>
            )}

            {/* Table */}
            {!loadingBlogs && filteredBlogs.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {[
                        'Image',
                        'Title',
                        'Category',
                        'Sections',
                        'Services',
                        'Published',
                        'Date',
                        'Actions',
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-6 py-3 text-left text-xs font-bold uppercase tracking-widest"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <motion.tbody
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredBlogs.map((blog) => (
                      <motion.tr
                        key={blog._id}
                        variants={rowVariants}
                        className="transition-colors duration-150"
                        style={{ borderBottom: '1px solid var(--border)' }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor =
                            'color-mix(in srgb, var(--accent) 4%, transparent)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor =
                            'transparent';
                        }}
                      >
                        {/* Image */}
                        <td className="px-6 py-4">
                          {blog.image ? (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              width={56}
                              height={40}
                              className="rounded-lg object-cover"
                              style={{
                                border: '1px solid var(--border)',
                                width: 56,
                                height: 40,
                              }}
                            />
                          ) : (
                            <div
                              className="w-14 h-10 rounded-lg flex items-center justify-center"
                              style={{
                                backgroundColor: 'var(--muted)',
                                border: '1px solid var(--border)',
                              }}
                            >
                              <FileText
                                size={16}
                                style={{ color: 'var(--muted-foreground)' }}
                              />
                            </div>
                          )}
                        </td>

                        {/* Title */}
                        <td className="px-6 py-4">
                          <p
                            className="text-sm font-semibold truncate max-w-55"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {blog.title}
                          </p>
                          <p
                            className="text-xs mt-0.5 truncate max-w-55"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            /{blog.slug}
                          </p>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span
                            className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={{
                              backgroundColor:
                                'color-mix(in srgb, var(--accent) 10%, transparent)',
                              color: 'var(--accent)',
                            }}
                          >
                            {blog.category}
                          </span>
                        </td>

                        {/* Sections count */}
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={{
                              backgroundColor:
                                (blog.sections?.length || 0) > 0
                                  ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                  : 'color-mix(in srgb, var(--muted-foreground) 10%, transparent)',
                              color:
                                (blog.sections?.length || 0) > 0
                                  ? 'var(--accent)'
                                  : 'var(--muted-foreground)',
                            }}
                          >
                            <FileText size={12} />
                            {blog.sections?.length || 0}
                          </span>
                        </td>

                        {/* Services count */}
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={{
                              backgroundColor:
                                getServiceCount(blog) > 0
                                  ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                  : 'color-mix(in srgb, var(--muted-foreground) 10%, transparent)',
                              color:
                                getServiceCount(blog) > 0
                                  ? 'var(--accent)'
                                  : 'var(--muted-foreground)',
                            }}
                          >
                            <Link2 size={12} />
                            {getServiceCount(blog)}
                          </span>
                        </td>

                        {/* Published */}
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={{
                              backgroundColor: blog.isPublished
                                ? 'color-mix(in srgb, #22c55e 10%, transparent)'
                                : 'color-mix(in srgb, var(--muted-foreground) 10%, transparent)',
                              color: blog.isPublished
                                ? '#22c55e'
                                : 'var(--muted-foreground)',
                            }}
                          >
                            {blog.isPublished ? (
                              <Eye size={12} />
                            ) : (
                              <EyeOff size={12} />
                            )}
                            {blog.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <span
                            className="text-xs"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => startEdit(blog)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                              style={{
                                backgroundColor:
                                  'color-mix(in srgb, var(--accent) 10%, transparent)',
                                color: 'var(--accent)',
                              }}
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </motion.button>

                            {deleteConfirm === blog._id ? (
                              <div className="flex items-center gap-1">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(blog._id)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                                  style={{
                                    backgroundColor:
                                      'color-mix(in srgb, #ef4444 12%, transparent)',
                                    color: '#ef4444',
                                  }}
                                  title="Confirm delete"
                                >
                                  <Trash2 size={14} />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => setDeleteConfirm(null)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--muted)',
                                    color: 'var(--muted-foreground)',
                                  }}
                                  title="Cancel"
                                >
                                  <X size={14} />
                                </motion.button>
                              </div>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setDeleteConfirm(blog._id)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                                style={{
                                  backgroundColor:
                                    'color-mix(in srgb, #ef4444 8%, transparent)',
                                  color: '#ef4444',
                                }}
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
