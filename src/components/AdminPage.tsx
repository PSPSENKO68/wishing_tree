import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, LogOut, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AdminDashboard } from './AdminDashboard';

export function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(!!sess);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) throw signInError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (session === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
      </div>
    );
  }

  if (session) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-warm-sand/30 to-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-cream rounded-2xl shadow-xl p-8 max-w-md w-full border border-warm-sand/40"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-terracotta/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-terracotta" />
          </div>
          <h1 className="font-serif text-2xl font-600 text-warm-brown">Admin Login</h1>
          <p className="text-sm text-warm-brown/50 mt-2">Sign in to manage the Flavor Tree</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-brown/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-warm-sand/50 bg-cream text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all"
                placeholder="admin@example.com"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-brown/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-warm-sand/50 bg-cream text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all"
                placeholder="••••••••"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-burnt bg-burnt/10 px-4 py-2 rounded-lg">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-cream font-sans font-600 py-3 rounded-lg shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { window.location.hash = ''; window.location.pathname = '/'; }}
              className="flex items-center gap-1.5 text-sm text-warm-brown/50 hover:text-terracotta transition-colors mx-auto"
            >
              <LogOut className="w-4 h-4 rotate-180" />
              Back to tree
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
