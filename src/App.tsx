import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase, type Message, type SiteSettings } from '@/lib/supabase';
import { AmbientBackground } from '@/components/AmbientBackground';
import { Hero } from '@/components/Hero';
import { TreeSection } from '@/components/TreeSection';
import { MessageCard } from '@/components/MessageCard';
import { AddLeafForm } from '@/components/AddLeafForm';
import { Footer } from '@/components/Footer';
import { SoundToggle } from '@/components/SoundToggle';
import { AdminPage } from '@/components/AdminPage';

type Route = 'public' | 'admin';

function getRoute(): Route {
  return window.location.hash.replace('#', '') === '/admin' ? 'admin' : 'public';
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute());
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showHero, setShowHero] = useState(true);

  // Listen for route changes
  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Load site settings
  useEffect(() => {
    supabase
      .from('site_settings')
      .select('*')
      .maybeSingle()
      .then(({ data }) => {
        if (data) setSettings(data as SiteSettings);
      });
  }, []);

  // Load approved messages
  const loadMessages = useCallback(() => {
    supabase
      .from('messages')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data as Message[]);
      });
  }, []);

  useEffect(() => {
    if (route === 'public') {
      loadMessages();
    }
  }, [route, loadMessages]);

  // Refresh settings when returning to public
  useEffect(() => {
    if (route === 'public') {
      supabase
        .from('site_settings')
        .select('*')
        .maybeSingle()
        .then(({ data }) => {
          if (data) setSettings(data as SiteSettings);
        });
    }
  }, [route]);

  const handleEnterGarden = () => {
    setShowHero(false);
    setTimeout(() => {
      document.getElementById('tree-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  if (route === 'admin') {
    return <AdminPage />;
  }

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <SoundToggle />

      <AnimatePresence>
        {showHero && (
          <Hero key="hero" settings={settings} onEnter={handleEnterGarden} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showHero ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <TreeSection
          messages={messages}
          onLeafClick={setSelectedMessage}
          onAddLeaf={() => setShowForm(true)}
        />
      </motion.div>

      <Footer settings={settings} />

      {/* Message card overlay */}
      <AnimatePresence>
        {selectedMessage && (
          <MessageCard
            key={`card-${selectedMessage.id}`}
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
          />
        )}
      </AnimatePresence>

      {/* Add leaf form */}
      <AddLeafForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitted={() => {
          // Messages need admin approval, so we don't add to the tree directly.
          // Just close the form — the confirmation animation is handled inside the form.
        }}
      />
    </div>
  );
}

export default App;
