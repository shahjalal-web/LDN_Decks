'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Eye,
  X,
  Check,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  Save,
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type ContactStatus = 'new' | 'in-progress' | 'completed' | 'cancelled';

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  service?: string;
  message?: string;
  type: 'estimate' | 'callback';
  status: ContactStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_OPTIONS: { value: ContactStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_COLORS: Record<ContactStatus, { bg: string; color: string; dot: string }> = {
  new: { bg: '#3b82f618', color: '#3b82f6', dot: '#3b82f6' },
  'in-progress': { bg: '#f59e0b18', color: '#f59e0b', dot: '#f59e0b' },
  completed: { bg: '#16a34a18', color: '#16a34a', dot: '#16a34a' },
  cancelled: { bg: '#dc262618', color: '#dc2626', dot: '#dc2626' },
};

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  estimate: { bg: '#8b5cf618', color: '#8b5cf6' },
  callback: { bg: '#06b6d418', color: '#06b6d4' },
};

type FilterTab = 'all' | ContactStatus;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ContactsPage() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalStatus, setModalStatus] = useState<ContactStatus>('new');
  const [modalNotes, setModalNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const getToken = useCallback(async () => {
    if (!user) return '';
    return await user.getIdToken();
  }, [user]);

  const fetchContacts = useCallback(async () => {
    try {
      const token = await user?.getIdToken();
      const res = await fetch(`${API}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchContacts();
  }, [user, fetchContacts]);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  /* ── Filtering ── */
  const filteredContacts = activeTab === 'all'
    ? contacts
    : contacts.filter((c) => c.status === activeTab);

  const newCount = contacts.filter((c) => c.status === 'new').length;

  /* ── Open modal ── */
  const openModal = (contact: Contact) => {
    setSelectedContact(contact);
    setModalStatus(contact.status);
    setModalNotes(contact.notes || '');
  };

  const closeModal = () => {
    setSelectedContact(null);
    setModalStatus('new');
    setModalNotes('');
  };

  /* ── Save (update status & notes) ── */
  const handleSave = async () => {
    if (!selectedContact) return;
    setSaving(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API}/contacts/${selectedContact._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: modalStatus, notes: modalNotes }),
      });
      if (!res.ok) throw new Error('Failed to update contact.');
      setMessage({ type: 'success', text: 'Contact updated successfully.' });
      closeModal();
      await fetchContacts();
    } catch {
      setMessage({ type: 'error', text: 'Failed to update contact.' });
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete ── */
  const handleDelete = async (id: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API}/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete contact.');
      setMessage({ type: 'success', text: 'Contact deleted successfully.' });
      setDeleteConfirm(null);
      if (selectedContact?._id === id) closeModal();
      await fetchContacts();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete contact.' });
    }
  };

  /* ── Shared input styles ── */
  const inputStyle: React.CSSProperties = {
    background: 'var(--background)',
    color: 'var(--foreground)',
    border: '1px solid var(--border)',
    outline: 'none',
  };

  const inputFocusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(217,119,6,0.15)';
    },
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };

  /* ── Filter tabs config ── */
  const tabs: { value: FilterTab; label: string; count?: number }[] = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New', count: newCount },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-20">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Contact Submissions
          </h1>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
          >
            {contacts.length} total
          </span>
        </div>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          View and manage contact form submissions.
        </p>
      </motion.div>

      {/* ── Message Toast ── */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
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

      {/* ── Status Filter Tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-1 mb-6 overflow-x-auto pb-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2"
            style={{
              background: activeTab === tab.value ? 'var(--accent)' : 'var(--muted)',
              color: activeTab === tab.value ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.value) {
                e.currentTarget.style.background = 'var(--border)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.value) {
                e.currentTarget.style.background = 'var(--muted)';
              }
            }}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                style={{
                  background: activeTab === tab.value ? 'rgba(255,255,255,0.25)' : '#3b82f6',
                  color: '#fff',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* ── Table Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl overflow-hidden"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        {loading ? (
          /* ── Loading Skeleton ── */
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div
                    className="h-4 rounded w-20"
                    style={{ background: 'var(--muted)' }}
                  />
                  <div
                    className="h-4 rounded w-32"
                    style={{ background: 'var(--muted)' }}
                  />
                  <div
                    className="h-4 rounded w-16"
                    style={{ background: 'var(--muted)' }}
                  />
                  <div
                    className="h-4 rounded w-28"
                    style={{ background: 'var(--muted)' }}
                  />
                  <div
                    className="h-4 rounded w-36"
                    style={{ background: 'var(--muted)' }}
                  />
                  <div
                    className="h-4 rounded w-24"
                    style={{ background: 'var(--muted)' }}
                  />
                  <div
                    className="h-4 rounded w-16"
                    style={{ background: 'var(--muted)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'var(--muted)' }}
            >
              <MessageSquare size={24} style={{ color: 'var(--muted-foreground)' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {activeTab === 'all'
                ? 'No contact submissions yet.'
                : `No ${activeTab} contacts found.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Date', 'Name', 'Type', 'Phone', 'Email', 'Service', 'Status', 'Actions'].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--muted-foreground)', background: 'var(--muted)' }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredContacts
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                    .map((contact) => {
                      const statusStyle = STATUS_COLORS[contact.status] || STATUS_COLORS.new;
                      const typeStyle = TYPE_COLORS[contact.type] || TYPE_COLORS.estimate;

                      return (
                        <motion.tr
                          key={contact._id}
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
                          {/* Date */}
                          <td className="px-4 py-3">
                            <span
                              className="text-sm whitespace-nowrap"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              {formatDate(contact.createdAt)}
                            </span>
                          </td>

                          {/* Name */}
                          <td className="px-4 py-3">
                            <span
                              className="text-sm font-medium whitespace-nowrap"
                              style={{ color: 'var(--foreground)' }}
                            >
                              {contact.firstName} {contact.lastName}
                            </span>
                          </td>

                          {/* Type */}
                          <td className="px-4 py-3">
                            <span
                              className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full capitalize"
                              style={{
                                background: typeStyle.bg,
                                color: typeStyle.color,
                              }}
                            >
                              {contact.type}
                            </span>
                          </td>

                          {/* Phone */}
                          <td className="px-4 py-3">
                            <span
                              className="text-sm whitespace-nowrap"
                              style={{ color: 'var(--foreground)' }}
                            >
                              {contact.phone}
                            </span>
                          </td>

                          {/* Email */}
                          <td className="px-4 py-3">
                            <span
                              className="text-sm whitespace-nowrap"
                              style={{ color: contact.email ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                            >
                              {contact.email || '-'}
                            </span>
                          </td>

                          {/* Service */}
                          <td className="px-4 py-3">
                            <span
                              className="text-sm whitespace-nowrap"
                              style={{ color: contact.service ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                            >
                              {contact.service || '-'}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">
                            <span
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                              style={{
                                background: statusStyle.bg,
                                color: statusStyle.color,
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: statusStyle.dot }}
                              />
                              {contact.status === 'in-progress'
                                ? 'In Progress'
                                : contact.status.charAt(0).toUpperCase() +
                                  contact.status.slice(1)}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => openModal(contact)}
                                className="p-2 rounded-lg cursor-pointer transition-colors duration-200"
                                title="View"
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
                                <Eye size={15} />
                              </button>
                              {deleteConfirm === contact._id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleDelete(contact._id)}
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
                                  onClick={() => setDeleteConfirm(contact._id)}
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
                      );
                    })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* ── View/Edit Modal ── */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-xl overflow-hidden"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              }}
            >
              {/* Modal Header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <h2
                  className="text-lg font-semibold"
                  style={{ color: 'var(--foreground)' }}
                >
                  Contact Details
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg cursor-pointer transition-colors duration-200"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--foreground)';
                    e.currentTarget.style.background = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-foreground)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                {/* Type & Date badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full capitalize"
                    style={{
                      background: TYPE_COLORS[selectedContact.type]?.bg,
                      color: TYPE_COLORS[selectedContact.type]?.color,
                    }}
                  >
                    {selectedContact.type}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: STATUS_COLORS[selectedContact.status]?.bg,
                      color: STATUS_COLORS[selectedContact.status]?.color,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: STATUS_COLORS[selectedContact.status]?.dot }}
                    />
                    {selectedContact.status === 'in-progress'
                      ? 'In Progress'
                      : selectedContact.status.charAt(0).toUpperCase() +
                        selectedContact.status.slice(1)}
                  </span>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    style={{ background: 'var(--muted)' }}
                  >
                    <User size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                        Name
                      </p>
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        {selectedContact.firstName} {selectedContact.lastName}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    style={{ background: 'var(--muted)' }}
                  >
                    <Phone size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                        Phone
                      </p>
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        {selectedContact.phone}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    style={{ background: 'var(--muted)' }}
                  >
                    <Mail size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                        Email
                      </p>
                      <p className="text-sm font-medium" style={{ color: selectedContact.email ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
                        {selectedContact.email || '-'}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    style={{ background: 'var(--muted)' }}
                  >
                    <Calendar size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                        Submitted
                      </p>
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        {formatDateTime(selectedContact.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service */}
                {selectedContact.service && (
                  <div
                    className="px-4 py-3 rounded-lg"
                    style={{ background: 'var(--muted)' }}
                  >
                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
                      Service
                    </p>
                    <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                      {selectedContact.service}
                    </p>
                  </div>
                )}

                {/* Message */}
                {selectedContact.message && (
                  <div
                    className="px-4 py-3 rounded-lg"
                    style={{ background: 'var(--muted)' }}
                  >
                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
                      Message
                    </p>
                    <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--foreground)' }}>
                      {selectedContact.message}
                    </p>
                  </div>
                )}

                {/* Status Dropdown */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as ContactStatus)}
                    className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Admin Notes
                  </label>
                  <textarea
                    value={modalNotes}
                    onChange={(e) => setModalNotes(e.target.value)}
                    placeholder="Add notes about this contact..."
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-lg text-sm resize-y transition-all duration-200"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this contact?')) {
                      handleDelete(selectedContact._id);
                    }
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200 cursor-pointer"
                  style={{ color: '#dc2626' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#dc262610';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
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
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
                    style={{
                      background: 'var(--accent)',
                      color: 'var(--accent-foreground)',
                    }}
                    onMouseEnter={(e) => {
                      if (!saving) e.currentTarget.style.background = 'var(--accent-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--accent)';
                    }}
                  >
                    {saving ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
