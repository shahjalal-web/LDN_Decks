/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Pencil,
  Upload,
  X,
  Check,
  AlertCircle,
  Loader2,
  ImageIcon,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ServiceOption {
  _id: string;
  title: string;
  slug: string;
}

interface ShowcaseSection {
  title: string;
  description: string;
  image: string;
}

interface Showcase {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  category: string;
  images: string[];
  sections?: ShowcaseSection[];
  service?: ServiceOption | string;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface ShowcaseForm {
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  category: string;
  images: string[];
  sections: ShowcaseSection[];
  service: string;
  isPublished: boolean;
  order: number;
}

const CATEGORIES = [
  'New Deck',
  'Resurfacing',
  'Fence',
  'Porch',
  'Patio',
  'Pergola',
  'Other',
];

const emptyForm: ShowcaseForm = {
  title: '',
  slug: '',
  description: '',
  location: '',
  date: '',
  category: '',
  images: [],
  sections: [{ title: '', description: '', image: '' }],
  service: '',
  isPublished: false,
  order: 0,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export default function ShowcasePage() {
  const { user } = useAuth();
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ShowcaseForm>({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const getToken = useCallback(async () => {
    if (!user) return '';
    return await user.getIdToken();
  }, [user]);

  const fetchShowcases = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/showcases`);
      const data = await res.json();
      setShowcases(Array.isArray(data) ? data : []);
    } catch {
      setShowcases([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setServices([]);
    }
  }, []);

  useEffect(() => {
    fetchShowcases();
    fetchServices();
  }, [fetchShowcases, fetchServices]);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  /* ── Title / Slug ── */
  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: editingId ? prev.slug : slugify(value),
    }));
  };

  /* ── Image Upload (multiple at once) ── */
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadingSectionIndex, setUploadingSectionIndex] = useState<number | null>(null);

  const handleMultipleImageUpload = async (files: FileList) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      setMessage({ type: 'error', text: 'Please select image files.' });
      return;
    }
    setUploadingCount(imageFiles.length);
    const token = await getToken();
    const results: string[] = [];
    for (const file of imageFiles) {
      try {
        const url = await uploadToCloudinary(file, token);
        results.push(url);
        setForm((prev) => ({
          ...prev,
          images: [...prev.images.filter(Boolean), url],
        }));
        setUploadingCount((c) => c - 1);
      } catch {
        setUploadingCount((c) => c - 1);
      }
    }
    if (results.length < imageFiles.length) {
      setMessage({ type: 'error', text: `${imageFiles.length - results.length} image(s) failed to upload.` });
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /* ── Section Handlers ── */
  const handleSectionChange = (index: number, field: keyof ShowcaseSection, value: string) => {
    setForm((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
  };

  const addSection = () => {
    setForm((prev) => ({ ...prev, sections: [...prev.sections, { title: '', description: '', image: '' }] }));
  };

  const removeSection = (index: number) => {
    setForm((prev) => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));
  };

  const handleSectionImageUpload = async (file: File, index: number) => {
    if (!file.type.startsWith('image/')) return;
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

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setMessage({ type: 'error', text: 'Title and slug are required.' });
      return;
    }

    setSubmitting(true);
    try {
      const token = await getToken();
      const body: Record<string, unknown> = {
        ...form,
        images: form.images.filter((img) => img.trim() !== ''),
        sections: form.sections.filter(s => s.title.trim() || s.description.trim() || s.image),
      };
      if (!form.service) {
        delete body.service;
      }

      const url = editingId
        ? `${API_URL}/showcases/${editingId}`
        : `${API_URL}/showcases`;
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || 'Failed to save showcase.');
      }

      setMessage({
        type: 'success',
        text: editingId ? 'Showcase updated successfully.' : 'Showcase created successfully.',
      });
      setForm({ ...emptyForm });
      setEditingId(null);
      await fetchShowcases();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Edit ── */
  const handleEdit = (showcase: Showcase) => {
    setEditingId(showcase._id);
    const serviceId =
      typeof showcase.service === 'object' && showcase.service
        ? showcase.service._id
        : (showcase.service as string) || '';
    setForm({
      title: showcase.title,
      slug: showcase.slug,
      description: showcase.description,
      location: showcase.location || '',
      date: showcase.date || '',
      category: showcase.category || '',
      images: showcase.images && showcase.images.length > 0 ? [...showcase.images] : [],
      sections: showcase.sections?.length ? showcase.sections : [{ title: '', description: '', image: '' }],
      service: serviceId,
      isPublished: showcase.isPublished,
      order: showcase.order,
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Delete ── */
  const handleDelete = async (id: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/showcases/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete showcase.');
      setMessage({ type: 'success', text: 'Showcase deleted successfully.' });
      setDeleteConfirm(null);
      if (editingId === id) {
        setEditingId(null);
        setForm({ ...emptyForm });
      }
      await fetchShowcases();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete showcase.' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  /* ── Shared input styles ── */
  const inputStyle: React.CSSProperties = {
    background: 'var(--background)',
    color: 'var(--foreground)',
    border: '1px solid var(--border)',
    outline: 'none',
  };

  const inputFocusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(217,119,6,0.15)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };

  return (
    <div className="max-w-5xl mx-auto mt-20">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
          Showcase Management
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Create, edit, and manage your project showcase gallery.
        </p>
      </motion.div>

      {/* ────────────── Form Section ────────────── */}
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl p-6 mb-8"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <h2
          className="text-lg font-semibold mb-5"
          style={{ color: 'var(--foreground)' }}
        >
          {editingId ? 'Edit Showcase' : 'Add New Showcase'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title & Slug Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Modern Composite Deck"
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={inputStyle}
                {...inputFocusHandlers}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Slug *
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                placeholder="modern-composite-deck"
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={inputStyle}
                {...inputFocusHandlers}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="A brief description of this project..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg text-sm resize-y transition-all duration-200"
              style={inputStyle}
              {...inputFocusHandlers}
            />
          </div>

          {/* Location & Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="e.g. Ashburn, VA"
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={inputStyle}
                {...inputFocusHandlers}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Date
              </label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                placeholder="e.g. February 2025"
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={inputStyle}
                {...inputFocusHandlers}
              />
            </div>
          </div>

          {/* Category & Service Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer"
                style={inputStyle}
                {...inputFocusHandlers}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Related Service
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer"
                style={inputStyle}
                {...inputFocusHandlers}
              >
                <option value="">None</option>
                {services.map((svc) => (
                  <option key={svc._id} value={svc._id}>
                    {svc.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Multiple Images ── */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Images
            </label>

            {/* Upload area - select multiple at once */}
            <label
              className="flex flex-col items-center justify-center gap-2 py-6 rounded-lg cursor-pointer transition-all duration-200 mb-3"
              style={{ border: '2px dashed var(--border)', background: 'var(--muted)' }}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onDragLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = 'var(--border)';
                if (e.dataTransfer.files.length) handleMultipleImageUpload(e.dataTransfer.files);
              }}
            >
              {uploadingCount > 0 ? (
                <>
                  <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                    Uploading {uploadingCount} image{uploadingCount > 1 ? 's' : ''}...
                  </p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--background)' }}>
                    <Upload size={20} style={{ color: 'var(--muted-foreground)' }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    Click to select images or drag & drop
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Select multiple images at once. PNG, JPG, WEBP.
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) handleMultipleImageUpload(e.target.files);
                  e.target.value = '';
                }}
              />
            </label>

            {/* Preview grid of uploaded images */}
            {form.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {form.images.map((img, i) => !img ? null : (
                  <div
                    key={i}
                    className="relative rounded-lg overflow-hidden aspect-square group"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    <img
                      src={img}
                      alt={`Showcase ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: '#dc2626', color: '#fff' }}
                    >
                      <X size={12} />
                    </button>
                    <div
                      className="absolute bottom-1 left-1 text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
                    >
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {form.images.length > 0 && (
              <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                {form.images.length} image{form.images.length > 1 ? 's' : ''} uploaded. Hover to remove.
              </p>
            )}
          </div>

          {/* ── Content Sections ── */}
          <div>
            <label className="block text-sm font-medium mb-0.5" style={{ color: 'var(--foreground)' }}>
              Content Sections
            </label>
            <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>
              Add sections like &quot;Why Choose Our Service&quot; with title, description, and image
            </p>

            <div className="flex flex-col gap-3">
              {form.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-4 relative"
                  style={{ background: 'var(--muted)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                      Section {idx + 1}
                    </span>
                    {form.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        className="p-1.5 rounded-lg cursor-pointer transition-colors duration-200"
                        title="Remove section"
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
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                        Title
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                        placeholder="e.g. Why Choose Our Service"
                        className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-200"
                        style={inputStyle}
                        {...inputFocusHandlers}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                        Description
                      </label>
                      <textarea
                        value={section.description}
                        onChange={(e) => handleSectionChange(idx, 'description', e.target.value)}
                        placeholder="Describe this section..."
                        rows={4}
                        className="w-full px-3 py-2 rounded-lg text-sm resize-y transition-all duration-200"
                        style={inputStyle}
                        {...inputFocusHandlers}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                        Image
                      </label>
                      {section.image ? (
                        <div
                          className="relative inline-block rounded-lg overflow-hidden"
                          style={{ border: '1px solid var(--border)' }}
                        >
                          <img
                            src={section.image}
                            alt={`Section ${idx + 1}`}
                            className="w-32 h-24 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleSectionChange(idx, 'image', '')}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                            style={{ background: '#dc2626', color: '#fff' }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <label
                          className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-lg cursor-pointer transition-all duration-200"
                          style={{ border: '2px dashed var(--border)', background: 'var(--background)' }}
                          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent)'; }}
                          onDragLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.style.borderColor = 'var(--border)';
                            if (e.dataTransfer.files[0]) handleSectionImageUpload(e.dataTransfer.files[0], idx);
                          }}
                        >
                          {uploadingSectionIndex === idx ? (
                            <>
                              <Loader2 size={20} className="animate-spin" style={{ color: 'var(--accent)' }} />
                              <p className="text-xs font-medium" style={{ color: 'var(--accent)' }}>Uploading...</p>
                            </>
                          ) : (
                            <>
                              <Upload size={16} style={{ color: 'var(--muted-foreground)' }} />
                              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Click to upload section image</p>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleSectionImageUpload(e.target.files[0], idx);
                              e.target.value = '';
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSection}
              className="mt-3 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer"
              style={{ background: 'var(--muted)', color: 'var(--foreground)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--border)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--muted)'; }}
            >
              <Plus size={14} />
              Add Section
            </button>
          </div>

          {/* Order & Published Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={inputStyle}
                {...inputFocusHandlers}
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer"
                  style={{
                    background: form.isPublished ? 'var(--accent)' : 'var(--border)',
                  }}
                  onClick={() => setForm((p) => ({ ...p, isPublished: !p.isPublished }))}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
                    style={{
                      background: 'white',
                      transform: form.isPublished ? 'translateX(22px)' : 'translateX(2px)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  {form.isPublished ? 'Published' : 'Draft'}
                </span>
              </label>
            </div>
          </div>

          {/* ── Form Actions ── */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-foreground)',
              }}
              onMouseEnter={(e) => {
                if (!submitting) e.currentTarget.style.background = 'var(--accent-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
              }}
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : editingId ? (
                <Check size={16} />
              ) : (
                <Plus size={16} />
              )}
              {submitting ? 'Saving...' : editingId ? 'Update Showcase' : 'Create Showcase'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: 'var(--muted)',
                  color: 'var(--foreground)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--border)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--muted)';
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {/* Message Toast */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
                style={{
                  background: message.type === 'success' ? '#065f4620' : '#dc262620',
                  border: `1px solid ${message.type === 'success' ? '#16a34a40' : '#dc262640'}`,
                  color: message.type === 'success' ? '#16a34a' : '#dc2626',
                }}
              >
                {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* ────────────── Showcases Table ────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl overflow-hidden"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            All Showcases
          </h2>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
          >
            {showcases.length} total
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
          </div>
        ) : showcases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'var(--muted)' }}
            >
              <ImageIcon size={24} style={{ color: 'var(--muted-foreground)' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              No showcases yet. Create your first one above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Image', 'Title', 'Location', 'Category', 'Images', 'Sections', 'Published', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--muted-foreground)', background: 'var(--muted)' }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {showcases
                    .sort((a, b) => a.order - b.order)
                    .map((showcase) => (
                      <motion.tr
                        key={showcase._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                        className="transition-colors duration-150"
                        style={{ borderBottom: '1px solid var(--border)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--muted)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <td className="px-4 py-3">
                          {showcase.images && showcase.images.length > 0 ? (
                            <img
                              src={showcase.images[0]}
                              alt={showcase.title}
                              className="w-12 h-10 rounded-lg object-cover"
                              style={{ border: '1px solid var(--border)' }}
                            />
                          ) : (
                            <div
                              className="w-12 h-10 rounded-lg flex items-center justify-center"
                              style={{ background: 'var(--muted)' }}
                            >
                              <ImageIcon size={16} style={{ color: 'var(--muted-foreground)' }} />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                            {showcase.title}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                            /{showcase.slug}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                            {showcase.location || '-'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ background: 'var(--muted)', color: 'var(--foreground)' }}
                          >
                            {showcase.category || '-'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                            {showcase.images?.length || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                            {showcase.sections?.length || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{
                              background: showcase.isPublished ? '#16a34a18' : '#dc262618',
                              color: showcase.isPublished ? '#16a34a' : '#dc2626',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                background: showcase.isPublished ? '#16a34a' : '#dc2626',
                              }}
                            />
                            {showcase.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleEdit(showcase)}
                              className="p-2 rounded-lg cursor-pointer transition-colors duration-200"
                              title="Edit"
                              style={{ color: 'var(--muted-foreground)' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--accent)';
                                e.currentTarget.style.background = 'var(--background)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--muted-foreground)';
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              <Pencil size={15} />
                            </button>
                            {deleteConfirm === showcase._id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(showcase._id)}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-200"
                                  style={{ background: '#dc2626', color: '#fff' }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#b91c1c';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#dc2626';
                                  }}
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-200"
                                  style={{
                                    background: 'var(--muted)',
                                    color: 'var(--foreground)',
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(showcase._id)}
                                className="p-2 rounded-lg cursor-pointer transition-colors duration-200"
                                title="Delete"
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
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
