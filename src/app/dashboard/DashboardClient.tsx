'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import {
  Wrench, FileText, ArrowRight, Camera, MapPin, MessageSquare,
  Clock, Eye, TrendingUp, Activity, BarChart3, HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ContactItem {
  _id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  service?: string;
  type: string;
  status: string;
  createdAt: string;
}

interface InitialCounts {
  services: number;
  blogs: number;
  showcases: number;
  cities: number;
  faqs: number;
}

export default function DashboardClient({ initialCounts }: { initialCounts: InitialCounts }) {
  const { dbUser, user } = useAuth();
  const [contacts, setContacts] = useState<number | null>(null);
  const [newContacts, setNewContacts] = useState<number | null>(null);
  const [recentContacts, setRecentContacts] = useState<ContactItem[]>([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const token = await user?.getIdToken();
        const res = await fetch(`${API_URL}/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setContacts(data.length);
          setNewContacts(data.filter((c: ContactItem) => c.status === 'new').length);
          setRecentContacts(data.slice(0, 5));
        }
      } catch {
        setContacts(0);
        setNewContacts(0);
      }
    }
    if (user) fetchContacts();
  }, [user]);

  const firstName = dbUser?.name?.split(' ')[0] || 'Admin';

  const statCards = [
    { label: 'Services', count: initialCounts.services, icon: Wrench, color: '#e65100', href: '/dashboard/services' },
    { label: 'Blog Posts', count: initialCounts.blogs, icon: FileText, color: '#1565c0', href: '/dashboard/blog' },
    { label: 'Showcases', count: initialCounts.showcases, icon: Camera, color: '#6a1b9a', href: '/dashboard/showcase' },
    { label: 'Cities', count: initialCounts.cities, icon: MapPin, color: '#2e7d32', href: '/dashboard/cities' },
    { label: 'FAQs', count: initialCounts.faqs, icon: HelpCircle, color: '#7b1fa2', href: '/dashboard/faq' },
    { label: 'Total Contacts', count: contacts, icon: MessageSquare, color: '#00838f', href: '/dashboard/contacts' },
    { label: 'New Inquiries', count: newContacts, icon: Activity, color: '#c62828', href: '/dashboard/contacts' },
  ];

  const quickActions = [
    { label: 'Manage Services', desc: 'Add, edit, or remove services', icon: Wrench, href: '/dashboard/services' },
    { label: 'Manage Blog', desc: 'Write and publish blog posts', icon: FileText, href: '/dashboard/blog' },
    { label: 'Manage Showcase', desc: 'Add project showcases', icon: Camera, href: '/dashboard/showcase' },
    { label: 'Manage Cities', desc: 'Add or edit service areas', icon: MapPin, href: '/dashboard/cities' },
    { label: 'Manage FAQs', desc: 'Add or edit FAQ items', icon: HelpCircle, href: '/dashboard/faq' },
    { label: 'View Contacts', desc: 'Review customer inquiries', icon: MessageSquare, href: '/dashboard/contacts' },
  ];

  const statusColors: Record<string, { bg: string; text: string }> = {
    new: { bg: 'rgba(37,99,235,0.12)', text: '#2563eb' },
    'in-progress': { bg: 'rgba(5,150,105,0.12)', text: '#059669' },
    completed: { bg: 'rgba(22,163,74,0.12)', text: '#16a34a' },
    cancelled: { bg: 'rgba(220,38,38,0.12)', text: '#dc2626' },
  };

  return (
    <div className="max-w-6xl mx-auto mt-20">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
          >
            {firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
              Welcome back, {firstName}
            </h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Here&apos;s your LDN Decks dashboard overview.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <Link href={card.href}>
              <div
                className="rounded-xl p-4 transition-all duration-200 cursor-pointer group"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = card.color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${card.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${card.color}14`, color: card.color }}
                >
                  <card.icon size={18} />
                </div>
                <p className="text-2xl font-bold mb-0.5" style={{ color: 'var(--foreground)' }}>
                  {card.count !== null ? card.count : (
                    <span className="inline-block w-8 h-7 rounded animate-pulse" style={{ background: 'var(--muted)' }} />
                  )}
                </p>
                <p className="text-[11px] font-medium" style={{ color: 'var(--muted-foreground)' }}>
                  {card.label}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="lg:col-span-3"
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2">
                <BarChart3 size={16} style={{ color: 'var(--accent)' }} />
                <h2 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                  Recent Inquiries
                </h2>
                {newContacts !== null && newContacts > 0 && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(220,38,38,0.12)', color: '#dc2626' }}
                  >
                    {newContacts} new
                  </span>
                )}
              </div>
              <Link
                href="/dashboard/contacts"
                className="text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            {recentContacts.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <MessageSquare size={32} className="mx-auto mb-3 opacity-20" style={{ color: 'var(--muted-foreground)' }} />
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No contact submissions yet.</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {recentContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-center justify-between px-5 py-3.5 transition-colors"
                    style={{ borderColor: 'var(--border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--muted)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          background: contact.type === 'estimate' ? 'rgba(37,99,235,0.1)' : 'rgba(139,92,246,0.1)',
                          color: contact.type === 'estimate' ? '#2563eb' : '#8b5cf6',
                        }}
                      >
                        {contact.firstName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                          {contact.firstName} {contact.lastName || ''}
                        </p>
                        <p className="text-[11px] truncate" style={{ color: 'var(--muted-foreground)' }}>
                          {contact.service || contact.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                        style={{
                          background: statusColors[contact.status]?.bg || 'var(--muted)',
                          color: statusColors[contact.status]?.text || 'var(--muted-foreground)',
                        }}
                      >
                        {contact.status}
                      </span>
                      <div className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                        <Clock size={11} />
                        {new Date(contact.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="lg:col-span-2"
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
              <h2 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                Quick Actions
              </h2>
            </div>

            <div className="p-2">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <div
                    className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--muted)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                    >
                      <action.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        {action.label}
                      </p>
                      <p className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                        {action.desc}
                      </p>
                    </div>
                    <ArrowRight size={14} style={{ color: 'var(--muted-foreground)' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pb-4"
      >
        <p className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
          <Eye size={11} className="inline mr-1 -mt-px" />
          Public site changes are reflected within 60 seconds via ISR.
        </p>
      </motion.div>
    </div>
  );
}
