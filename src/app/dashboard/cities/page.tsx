'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Pencil,
  Check,
  AlertCircle,
  Loader2,
  MapPin,
  Search,
  X,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const COUNTY_OPTIONS = [
  'Loudoun County',
  'Fairfax County',
  'Prince William County',
];

interface City {
  _id: string;
  name: string;
  slug: string;
  county: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface CityForm {
  name: string;
  slug: string;
  county: string;
  isActive: boolean;
  order: number;
}

const emptyForm: CityForm = {
  name: '',
  slug: '',
  county: '',
  isActive: true,
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

export default function CitiesPage() {
  const { user } = useAuth();
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CityForm>({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomCounty, setShowCustomCounty] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const getToken = useCallback(async () => {
    if (!user) return '';
    return await user.getIdToken();
  }, [user]);

  const fetchCities = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/cities`);
      const data = await res.json();
      setCities(Array.isArray(data) ? data : []);
    } catch {
      setCities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  /* ── Name / Slug ── */
  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: editingId ? prev.slug : slugify(value),
    }));
  };

  /* ── County selection ── */
  const handleCountySelect = (value: string) => {
    if (value === '__custom__') {
      setShowCustomCounty(true);
      setForm((prev) => ({ ...prev, county: '' }));
    } else {
      setShowCustomCounty(false);
      setForm((prev) => ({ ...prev, county: value }));
    }
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) {
      setMessage({ type: 'error', text: 'Name and slug are required.' });
      return;
    }
    if (!form.county.trim()) {
      setMessage({ type: 'error', text: 'County is required.' });
      return;
    }

    setSubmitting(true);
    try {
      const token = await getToken();
      const url = editingId
        ? `${API_URL}/cities/${editingId}`
        : `${API_URL}/cities`;
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to save city.');
      }

      setMessage({
        type: 'success',
        text: editingId ? 'City updated successfully.' : 'City created successfully.',
      });
      setForm({ ...emptyForm });
      setEditingId(null);
      setShowCustomCounty(false);
      await fetchCities();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Edit ── */
  const handleEdit = (city: City) => {
    setEditingId(city._id);
    const isPreset = COUNTY_OPTIONS.includes(city.county);
    setShowCustomCounty(!isPreset);
    setForm({
      name: city.name,
      slug: city.slug,
      county: city.county,
      isActive: city.isActive,
      order: city.order,
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Delete ── */
  const handleDelete = async (id: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/cities/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete city.');
      setMessage({ type: 'success', text: 'City deleted successfully.' });
      setDeleteConfirm(null);
      if (editingId === id) {
        setEditingId(null);
        setForm({ ...emptyForm });
        setShowCustomCounty(false);
      }
      await fetchCities();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete city.' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowCustomCounty(false);
  };

  /* ── Filter & group ── */
  const filteredCities = cities.filter((city) => {
    const q = searchQuery.toLowerCase();
    return (
      city.name.toLowerCase().includes(q) ||
      city.county.toLowerCase().includes(q)
    );
  });

  const groupedCities = filteredCities
    .sort((a, b) => {
      if (a.county !== b.county) return a.county.localeCompare(b.county);
      return a.order - b.order;
    })
    .reduce<Record<string, City[]>>((acc, city) => {
      if (!acc[city.county]) acc[city.county] = [];
      acc[city.county].push(city);
      return acc;
    }, {});

  /* ── Shared input styles ── */
  const inputStyle: React.CSSProperties = {
    background: 'var(--background)',
    color: 'var(--foreground)',
    border: '1px solid var(--border)',
    outline: 'none',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px',
  };

  const inputFocusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(217,119,6,0.15)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
          City Management
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Create, edit, and manage your service areas.
        </p>
      </motion.div>

      {/* Message Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
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
          {editingId ? 'Edit City' : 'Add New City'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name & Slug Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Ashburn"
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
                placeholder="ashburn"
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={inputStyle}
                {...inputFocusHandlers}
                required
              />
            </div>
          </div>

          {/* County */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              County *
            </label>
            {showCustomCounty ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.county}
                  onChange={(e) => setForm((p) => ({ ...p, county: e.target.value }))}
                  placeholder="Enter custom county name"
                  className="flex-1 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                  style={inputStyle}
                  {...inputFocusHandlers}
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomCounty(false);
                    setForm((p) => ({ ...p, county: '' }));
                  }}
                  className="p-2.5 rounded-lg cursor-pointer transition-colors duration-200"
                  style={{ color: 'var(--muted-foreground)', background: 'var(--muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--foreground)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-foreground)';
                  }}
                  title="Switch to dropdown"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <select
                value={COUNTY_OPTIONS.includes(form.county) ? form.county : '__custom__'}
                onChange={(e) => handleCountySelect(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer"
                style={selectStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(217,119,6,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                required
              >
                <option value="">Select a county...</option>
                {COUNTY_OPTIONS.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
                <option value="__custom__">Other (custom)...</option>
              </select>
            )}
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
              {submitting ? 'Saving...' : editingId ? 'Update City' : 'Create City'}
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
        </form>
      </motion.div>

      {/* ────────────── Cities Table ────────────── */}
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
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
              All Cities
            </h2>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
            >
              {cities.length} total
            </span>
          </div>
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--muted-foreground)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cities or counties..."
              className="pl-9 pr-3 py-2 rounded-lg text-sm w-full sm:w-64 transition-all duration-200"
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(217,119,6,0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded cursor-pointer"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
          </div>
        ) : filteredCities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'var(--muted)' }}
            >
              <MapPin size={24} style={{ color: 'var(--muted-foreground)' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {searchQuery
                ? 'No cities match your search.'
                : 'No cities yet. Create your first one above.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {Object.entries(groupedCities).map(([county, countyCities]) => (
              <div key={county}>
                {/* County Group Header */}
                <div
                  className="px-4 py-2.5 flex items-center gap-2"
                  style={{ background: 'var(--muted)', borderBottom: '1px solid var(--border)' }}
                >
                  <MapPin size={14} style={{ color: 'var(--accent)' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
                    {county}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--background)', color: 'var(--muted-foreground)' }}
                  >
                    {countyCities.length}
                  </span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Name', 'County', 'Order', 'Status', 'Actions'].map((header) => (
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
                      {countyCities.map((city) => (
                        <motion.tr
                          key={city._id}
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
                            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                              {city.name}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                              /{city.slug}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                              {city.county}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                              {city.order}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{
                                background: city.isActive ? '#16a34a18' : '#dc262618',
                                color: city.isActive ? '#16a34a' : '#dc2626',
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: city.isActive ? '#16a34a' : '#dc2626',
                                }}
                              />
                              {city.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleEdit(city)}
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
                              {deleteConfirm === city._id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleDelete(city._id)}
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
                                  onClick={() => setDeleteConfirm(city._id)}
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
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
