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
  GripVertical,
  Check,
  AlertCircle,
  Loader2,
  ImageIcon,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ServiceSection {
  title: string;
  description: string;
  image: string;
}

interface ServiceFaq {
  question: string;
  answer: string;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  process: string[];
  features: string[];
  icon: string;
  isActive: boolean;
  order: number;
  parentService: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ServiceForm {
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  process: string[];
  features: string[];
  isActive: boolean;
  order: number;
  parentService: string | null;
}

const emptyForm: ServiceForm = {
  title: '',
  slug: '',
  description: '',
  image: '',
  icon: '',
  sections: [{ title: '', description: '', image: '' }],
  faqs: [{ question: '', answer: '' }],
  process: [''],
  features: [''],
  isActive: true,
  order: 0,
  parentService: null,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export default function ServicesPage() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingSectionIndex, setUploadingSectionIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceForm>({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const getToken = useCallback(async () => {
    if (!user) return '';
    return await user.getIdToken();
  }, [user]);

  const fetchServices = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/services/flat`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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

  /* ── Thumbnail image upload ── */
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file.' });
      return;
    }
    setUploading(true);
    try {
      const token = await getToken();
      const url = await uploadToCloudinary(file, token);
      setForm((prev) => ({ ...prev, image: url }));
    } catch {
      setMessage({ type: 'error', text: 'Image upload failed. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  /* ── Sections ── */
  const handleSectionChange = (index: number, field: keyof ServiceSection, value: string) => {
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
      setMessage({ type: 'error', text: 'Section image upload failed. Please try again.' });
    } finally {
      setUploadingSectionIndex(null);
    }
  };

  /* ── FAQs ── */
  const handleFaqChange = (index: number, field: keyof ServiceFaq, value: string) => {
    setForm((prev) => {
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [field]: value };
      return { ...prev, faqs };
    });
  };

  const addFaq = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const removeFaq = (index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  /* ── Process Steps ── */
  const handleProcessChange = (index: number, value: string) => {
    setForm((prev) => {
      const process = [...prev.process];
      process[index] = value;
      return { ...prev, process };
    });
  };

  const addProcess = () => {
    setForm((prev) => ({ ...prev, process: [...prev.process, ''] }));
  };

  const removeProcess = (index: number) => {
    setForm((prev) => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== index),
    }));
  };

  /* ── Features ── */
  const handleFeatureChange = (index: number, value: string) => {
    setForm((prev) => {
      const features = [...prev.features];
      features[index] = value;
      return { ...prev, features };
    });
  };

  const addFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
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
      const body = {
        ...form,
        features: form.features.filter((f) => f.trim() !== ''),
        process: form.process.filter((p) => p.trim() !== ''),
        sections: form.sections.filter((s) => s.title.trim() || s.description.trim() || s.image),
        faqs: form.faqs.filter((f) => f.question.trim() || f.answer.trim()),
      };

      const url = editingId
        ? `${API_URL}/services/${editingId}`
        : `${API_URL}/services`;
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
        throw new Error(err.error || err.message || 'Failed to save service.');
      }

      setMessage({
        type: 'success',
        text: editingId ? 'Service updated successfully.' : 'Service created successfully.',
      });
      setForm({ ...emptyForm });
      setEditingId(null);
      await fetchServices();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Edit ── */
  const handleEdit = (service: Service) => {
    setEditingId(service._id);
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description,
      image: service.image,
      icon: service.icon || '',
      sections: service.sections && service.sections.length > 0
        ? service.sections
        : [{ title: '', description: '', image: '' }],
      faqs: service.faqs && service.faqs.length > 0
        ? service.faqs
        : [{ question: '', answer: '' }],
      process: service.process && service.process.length > 0 ? service.process : [''],
      features: service.features && service.features.length > 0 ? service.features : [''],
      isActive: service.isActive,
      order: service.order,
      parentService: service.parentService || null,
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Delete ── */
  const handleDelete = async (id: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete service.');
      setMessage({ type: 'success', text: 'Service deleted successfully.' });
      setDeleteConfirm(null);
      if (editingId === id) {
        setEditingId(null);
        setForm({ ...emptyForm });
      }
      await fetchServices();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete service.' });
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
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(217,119,6,0.15)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          Service Management
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Create, edit, and manage your services.
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
          {editingId ? 'Edit Service' : 'Add New Service'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* ── Basic Info ── */}

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
                placeholder="e.g. Custom Deck Building"
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
                placeholder="custom-deck-building"
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={inputStyle}
                {...inputFocusHandlers}
                required
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Short Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="A brief description shown in the listing view..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg text-sm resize-y transition-all duration-200"
              style={inputStyle}
              {...inputFocusHandlers}
            />
          </div>

          {/* Thumbnail Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Thumbnail Image
            </label>
            <div
              className="rounded-lg p-4 text-center cursor-pointer transition-all duration-200"
              style={{
                border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border)'}`,
                background: dragOver ? 'var(--muted)' : 'transparent',
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
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
              {uploading ? (
                <div className="flex flex-col items-center gap-2 py-4">
                  <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Uploading...</p>
                </div>
              ) : form.image ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative inline-block">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-32 w-auto rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((p) => ({ ...p, image: '' }));
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                      style={{ background: '#dc2626', color: '#fff' }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Click or drag to replace
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--muted)' }}
                  >
                    <Upload size={20} style={{ color: 'var(--muted-foreground)' }} />
                  </div>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order & Active Row */}
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
                    background: form.isActive ? 'var(--accent)' : 'var(--border)',
                  }}
                  onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
                    style={{
                      background: 'white',
                      transform: form.isActive ? 'translateX(22px)' : 'translateX(2px)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  {form.isActive ? 'Active' : 'Inactive'}
                </span>
              </label>
            </div>
          </div>

          {/* ── Parent Service ── */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Parent Service <span className="text-xs font-normal" style={{ color: 'var(--muted-foreground)' }}>(leave empty for top-level service)</span>
            </label>
            <select
              value={form.parentService || ''}
              onChange={(e) => setForm((p) => ({ ...p, parentService: e.target.value || null }))}
              className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
              style={inputStyle}
            >
              <option value="">None (Top-level service)</option>
              {services
                .filter((s) => !s.parentService && s._id !== editingId)
                .map((s) => (
                  <option key={s._id} value={s._id}>{s.title}</option>
                ))
              }
            </select>
          </div>

          {/* ── Content Sections ── */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Content Sections
              </label>
            </div>
            <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>
              These sections appear on the detail page with an alternating image-text layout.
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
                    className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                  <textarea
                    value={section.description}
                    onChange={(e) => handleSectionChange(i, 'description', e.target.value)}
                    placeholder="Section description..."
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-lg text-sm resize-y transition-all duration-200"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                  {/* Section Image */}
                  <div>
                    {uploadingSectionIndex === i ? (
                      <div
                        className="rounded-lg p-4 flex flex-col items-center gap-2"
                        style={{ border: '2px dashed var(--border)' }}
                      >
                        <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)' }} />
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Uploading...</p>
                      </div>
                    ) : section.image ? (
                      <div className="flex items-center gap-3">
                        <div className="relative inline-block">
                          <img
                            src={section.image}
                            alt={`Section ${i + 1}`}
                            className="h-20 w-auto rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleSectionChange(i, 'image', '')}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
                            style={{ background: '#dc2626', color: '#fff' }}
                          >
                            <X size={10} />
                          </button>
                        </div>
                        <label
                          className="text-xs cursor-pointer font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                          style={{ color: 'var(--accent)', background: 'var(--background)' }}
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
                        className="rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all duration-200"
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
                          style={{ background: 'var(--background)' }}
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

          {/* ── Process Steps ── */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Process Steps
            </label>
            <div className="flex flex-col gap-2">
              {form.process.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <GripVertical size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleProcessChange(i, e.target.value)}
                    placeholder={`Step ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                  {form.process.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProcess(i)}
                      className="p-2 rounded-lg cursor-pointer transition-colors duration-200"
                      style={{ color: 'var(--muted-foreground)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#dc2626';
                        e.currentTarget.style.background = 'var(--muted)';
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
              ))}
              <button
                type="button"
                onClick={addProcess}
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
                Add Step
              </button>
            </div>
          </div>

          {/* ── Features ── */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Features
            </label>
            <div className="flex flex-col gap-2">
              {form.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <GripVertical size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="p-2 rounded-lg cursor-pointer transition-colors duration-200"
                      style={{ color: 'var(--muted-foreground)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#dc2626';
                        e.currentTarget.style.background = 'var(--muted)';
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
              ))}
              <button
                type="button"
                onClick={addFeature}
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
                Add Feature
              </button>
            </div>
          </div>

          {/* ── FAQs ── */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              FAQs
            </label>
            <div className="flex flex-col gap-4">
              {form.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="relative rounded-xl p-4 flex flex-col gap-3"
                  style={{ background: 'var(--muted)' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                      FAQ {i + 1}
                    </span>
                    {form.faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(i)}
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
                    value={faq.question}
                    onChange={(e) => handleFaqChange(i, 'question', e.target.value)}
                    placeholder="Question"
                    className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(i, 'answer', e.target.value)}
                    placeholder="Answer..."
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-lg text-sm resize-y transition-all duration-200"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addFaq}
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
                Add FAQ
              </button>
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
              {submitting ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
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

          {/* Message Toast - below buttons */}
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

      {/* ────────────── Services Table ────────────── */}
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
            All Services
          </h2>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
          >
            {services.length} total
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'var(--muted)' }}
            >
              <ImageIcon size={24} style={{ color: 'var(--muted-foreground)' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              No services yet. Create your first one above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Image', 'Title', 'Sections', 'FAQs', 'Order', 'Status', 'Actions'].map((header) => (
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
                  {services
                    .sort((a, b) => a.order - b.order)
                    .map((service) => (
                      <motion.tr
                        key={service._id}
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
                          {service.image ? (
                            <img
                              src={service.image}
                              alt={service.title}
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
                          <div className="flex items-center gap-1.5">
                            {service.parentService && (
                              <span
                                className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                                style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                              >
                                Sub
                              </span>
                            )}
                            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                              {service.title}
                            </p>
                          </div>
                          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                            {service.parentService
                              ? `↳ ${services.find((s) => s._id === service.parentService)?.title || 'Parent'} / ${service.slug}`
                              : `/${service.slug}`
                            }
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                            {service.sections?.length || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                            {service.faqs?.length || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                            {service.order}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{
                              background: service.isActive ? '#16a34a18' : '#dc262618',
                              color: service.isActive ? '#16a34a' : '#dc2626',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                background: service.isActive ? '#16a34a' : '#dc2626',
                              }}
                            />
                            {service.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleEdit(service)}
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
                            {deleteConfirm === service._id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(service._id)}
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
                                onClick={() => setDeleteConfirm(service._id)}
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
