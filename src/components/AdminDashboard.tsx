import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Check, X, Trash2, Edit3, Plus, Download, Save, LogOut,
  Settings, MessageSquare, Loader2, ChevronDown, ChevronUp, Image as ImageIcon,
} from 'lucide-react';
import type { Message, SiteSettings, LeafType } from '@/lib/supabase';
import { supabase, LEAF_TYPES, LEAF_LABELS, LEAF_COLORS } from '@/lib/supabase';
import { LeafShape } from './LeafShapes';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = 'messages' | 'settings';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Message>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [settingsForm, setSettingsForm] = useState<Partial<SiteSettings>>({});
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [msgRes, setRes] = await Promise.all([
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
      supabase.from('site_settings').select('*').maybeSingle(),
    ]);
    if (msgRes.data) setMessages(msgRes.data as Message[]);
    if (setRes.data) {
      setSettings(setRes.data as SiteSettings);
      setSettingsForm(setRes.data as SiteSettings);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleApprove = async (id: string, approve: boolean) => {
    const { error } = await supabase
      .from('messages')
      .update({ is_approved: approve })
      .eq('id', id);
    if (!error) {
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, is_approved: approve } : m));
    }
  };

  const handleDelete = async (msg: Message) => {
    if (!confirm(`Delete message from ${msg.sender_name}? This cannot be undone.`)) return;
    if (msg.photo_url) {
      const path = msg.photo_url.split('/farewell-photos/').pop();
      if (path) {
        await supabase.storage.from('farewell-photos').remove([path]);
      }
    }
    const { error } = await supabase.from('messages').delete().eq('id', msg.id);
    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    }
  };

  const startEdit = (msg: Message) => {
    setEditingId(msg.id);
    setEditForm(msg);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const { error } = await supabase
      .from('messages')
      .update({
        sender_name: editForm.sender_name,
        sender_role: editForm.sender_role,
        message: editForm.message,
        leaf_type: editForm.leaf_type,
      })
      .eq('id', editingId);
    if (!error) {
      setMessages((prev) => prev.map((m) => m.id === editingId ? { ...m, ...editForm } as Message : m));
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    const { error } = await supabase
      .from('site_settings')
      .update({
        honoree_name: settingsForm.honoree_name,
        honoree_role: settingsForm.honoree_role,
        hero_title: settingsForm.hero_title,
        hero_subtitle: settingsForm.hero_subtitle,
        footer_message: settingsForm.footer_message,
        updated_at: new Date().toISOString(),
      })
      .eq('id', settings?.id);
    if (!error) {
      setSettings(settingsForm as SiteSettings);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2000);
    }
    setSavingSettings(false);
  };

  const handleAddManual = async (data: { sender_name: string; sender_role: string; message: string; leaf_type: LeafType; is_approved: boolean }) => {
    const { data: newMsg, error } = await supabase
      .from('messages')
      .insert(data)
      .select()
      .single();
    if (!error && newMsg) {
      setMessages((prev) => [newMsg as Message, ...prev]);
      setShowAddForm(false);
    }
  };

  const exportCSV = () => {
    const approved = messages.filter((m) => m.is_approved);
    const headers = ['Name', 'Role', 'Message', 'Leaf Type', 'Photo URL', 'Date'];
    const rows = approved.map((m) => [
      `"${m.sender_name.replace(/"/g, '""')}"`,
      `"${m.sender_role.replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      m.leaf_type,
      m.photo_url || '',
      new Date(m.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farewell-messages-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const approvedCount = messages.filter((m) => m.is_approved).length;
  const pendingCount = messages.filter((m) => !m.is_approved).length;

  return (
    <div className="min-h-screen bg-warm-sand/20">
      {/* Top bar */}
      <header className="bg-cream border-b border-warm-sand/40 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl font-600 text-warm-brown">Flavor Tree Admin</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-sm text-warm-brown/60 hover:text-terracotta transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-cream rounded-xl p-5 border border-warm-sand/30 shadow-sm">
            <p className="text-3xl font-serif font-600 text-warm-brown">{messages.length}</p>
            <p className="text-sm text-warm-brown/50 mt-1">Total messages</p>
          </div>
          <div className="bg-cream rounded-xl p-5 border border-warm-sand/30 shadow-sm">
            <p className="text-3xl font-serif font-600 text-deep-green">{approvedCount}</p>
            <p className="text-sm text-warm-brown/50 mt-1">Approved</p>
          </div>
          <div className="bg-cream rounded-xl p-5 border border-warm-sand/30 shadow-sm">
            <p className="text-3xl font-serif font-600 text-terracotta">{pendingCount}</p>
            <p className="text-sm text-warm-brown/50 mt-1">Pending review</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('messages')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-600 transition-all ${
              tab === 'messages' ? 'bg-terracotta text-cream shadow-md' : 'bg-cream text-warm-brown/60 hover:bg-warm-sand/30 border border-warm-sand/30'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Messages
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-600 transition-all ${
              tab === 'settings' ? 'bg-terracotta text-cream shadow-md' : 'bg-cream text-warm-brown/60 hover:bg-warm-sand/30 border border-warm-sand/30'
            }`}
          >
            <Settings className="w-4 h-4" />
            Site Content
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
          </div>
        ) : tab === 'messages' ? (
          <>
            {/* Action buttons */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-deep-green hover:bg-deep-green/90 text-cream font-sans font-600 px-4 py-2.5 rounded-lg transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Message
              </button>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 bg-warm-brown hover:bg-warm-brown/90 text-cream font-sans font-600 px-4 py-2.5 rounded-lg transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Messages table */}
            <div className="bg-cream rounded-xl border border-warm-sand/30 shadow-sm overflow-hidden">
              {messages.length === 0 ? (
                <p className="text-center text-warm-brown/50 py-20">No messages yet. The tree is waiting for its first leaf.</p>
              ) : (
                <div className="divide-y divide-warm-sand/20">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 hover:bg-warm-sand/10 transition-colors">
                      {editingId === msg.id ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={editForm.sender_name || ''}
                              onChange={(e) => setEditForm({ ...editForm, sender_name: e.target.value })}
                              className="px-3 py-2 rounded-lg border border-warm-sand/50 text-warm-brown text-sm"
                              placeholder="Name"
                            />
                            <input
                              type="text"
                              value={editForm.sender_role || ''}
                              onChange={(e) => setEditForm({ ...editForm, sender_role: e.target.value })}
                              className="px-3 py-2 rounded-lg border border-warm-sand/50 text-warm-brown text-sm"
                              placeholder="Role"
                            />
                          </div>
                          <textarea
                            value={editForm.message || ''}
                            onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-warm-sand/50 text-warm-brown text-sm"
                            rows={3}
                            placeholder="Message"
                          />
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-warm-brown/60">Leaf:</label>
                            <select
                              value={editForm.leaf_type || 'mint'}
                              onChange={(e) => setEditForm({ ...editForm, leaf_type: e.target.value as LeafType })}
                              className="px-3 py-1.5 rounded-lg border border-warm-sand/50 text-warm-brown text-sm"
                            >
                              {LEAF_TYPES.map((t) => (
                                <option key={t} value={t}>{LEAF_LABELS[t]}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={saveEdit}
                              className="flex items-center gap-1.5 bg-terracotta text-cream px-3 py-1.5 rounded-lg text-sm font-600"
                            >
                              <Save className="w-3.5 h-3.5" />
                              Save
                            </button>
                            <button
                              onClick={() => { setEditingId(null); setEditForm({}); }}
                              className="flex items-center gap-1.5 bg-warm-sand/40 text-warm-brown px-3 py-1.5 rounded-lg text-sm font-600"
                            >
                              <X className="w-3.5 h-3.5" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-4">
                          {/* Leaf icon */}
                          <div className="w-10 h-10 flex-shrink-0 mt-1">
                            <LeafShape
                              type={msg.leaf_type}
                              fill={LEAF_COLORS[msg.leaf_type]?.[0] || '#7C9070'}
                              className="w-full h-full"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-sans font-600 text-warm-brown">{msg.sender_name}</span>
                              <span className="text-xs text-warm-brown/40">{msg.sender_role}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-600 ${
                                msg.is_approved
                                  ? 'bg-deep-green/15 text-deep-green'
                                  : 'bg-terracotta/15 text-terracotta'
                              }`}>
                                {msg.is_approved ? 'Approved' : 'Pending'}
                              </span>
                            </div>
                            <p className="text-sm text-warm-brown/70 line-clamp-2 mb-1">{msg.message}</p>
                            <div className="flex items-center gap-3 text-xs text-warm-brown/40">
                              <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                              <span>{LEAF_LABELS[msg.leaf_type]}</span>
                              {msg.photo_url && (
                                <span className="flex items-center gap-1">
                                  <ImageIcon className="w-3 h-3" />
                                  Photo
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => handleApprove(msg.id, !msg.is_approved)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                msg.is_approved
                                  ? 'bg-warm-sand/40 text-warm-brown/50 hover:bg-warm-sand/60'
                                  : 'bg-deep-green/15 text-deep-green hover:bg-deep-green/25'
                              }`}
                              title={msg.is_approved ? 'Unapprove' : 'Approve'}
                              aria-label={msg.is_approved ? 'Unapprove message' : 'Approve message'}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => startEdit(msg)}
                              className="w-8 h-8 rounded-lg bg-warm-sand/40 text-warm-brown/60 hover:bg-warm-sand/60 flex items-center justify-center transition-colors"
                              title="Edit"
                              aria-label="Edit message"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(msg)}
                              className="w-8 h-8 rounded-lg bg-burnt/10 text-burnt hover:bg-burnt/20 flex items-center justify-center transition-colors"
                              title="Delete"
                              aria-label="Delete message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Settings tab */
          <div className="bg-cream rounded-xl border border-warm-sand/30 shadow-sm p-6 max-w-2xl">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">Honoree Name</label>
                <input
                  type="text"
                  value={settingsForm.honoree_name || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, honoree_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                />
              </div>
              <div>
                <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">Honoree Role</label>
                <input
                  type="text"
                  value={settingsForm.honoree_role || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, honoree_role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                />
              </div>
              <div>
                <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">Hero Title</label>
                <input
                  type="text"
                  value={settingsForm.hero_title || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hero_title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                />
                <p className="text-xs text-warm-brown/40 mt-1">Use [NAME] as a placeholder for the honoree's name.</p>
              </div>
              <div>
                <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">Hero Subtitle</label>
                <input
                  type="text"
                  value={settingsForm.hero_subtitle || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hero_subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                />
              </div>
              <div>
                <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">Footer Message</label>
                <textarea
                  value={settingsForm.footer_message || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, footer_message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40 resize-none"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream font-sans font-600 px-5 py-2.5 rounded-lg shadow-md transition-all disabled:opacity-60"
                >
                  {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
                {settingsSaved && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-deep-green flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Saved!
                  </motion.span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Manual add form modal */}
      {showAddForm && (
        <ManualAddForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddManual}
        />
      )}
    </div>
  );
}

// --- Manual add form ---
interface ManualAddFormProps {
  onClose: () => void;
  onAdd: (data: { sender_name: string; sender_role: string; message: string; leaf_type: LeafType; is_approved: boolean }) => void;
}

function ManualAddForm({ onClose, onAdd }: ManualAddFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [messageText, setMessageText] = useState('');
  const [leafType, setLeafType] = useState<LeafType>('mint');
  const [approve, setApprove] = useState(true);

  const handleSubmit = () => {
    if (!name.trim() || !role.trim() || !messageText.trim()) return;
    onAdd({
      sender_name: name.trim(),
      sender_role: role.trim(),
      message: messageText.trim(),
      leaf_type: leafType,
      is_approved: approve,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-warm-brown/40 backdrop-blur-sm" />
      <motion.div
        className="relative bg-cream rounded-2xl shadow-2xl max-w-md w-full p-6 border border-warm-sand/50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-lg font-600 text-warm-brown mb-4">Add Message</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40"
            placeholder="Name"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40"
            placeholder="Role / Team"
          />
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40 resize-none"
            rows={4}
            placeholder="Message"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm text-warm-brown/60">Leaf type:</label>
            <select
              value={leafType}
              onChange={(e) => setLeafType(e.target.value as LeafType)}
              className="px-3 py-1.5 rounded-lg border border-warm-sand/50 text-warm-brown text-sm"
            >
              {LEAF_TYPES.map((t) => (
                <option key={t} value={t}>{LEAF_LABELS[t]}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-warm-brown">
            <input
              type="checkbox"
              checked={approve}
              onChange={(e) => setApprove(e.target.checked)}
              className="w-4 h-4 accent-terracotta"
            />
            Approve immediately
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-terracotta text-cream font-600 py-2.5 rounded-lg"
            >
              Add Message
            </button>
            <button
              onClick={onClose}
              className="px-4 bg-warm-sand/40 text-warm-brown font-600 py-2.5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
