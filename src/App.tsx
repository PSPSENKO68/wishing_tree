import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase, type Message, type SiteSettings } from '@/lib/supabase';
import { TreeSection } from '@/components/TreeSection';
import { MessageCard } from '@/components/MessageCard';
import { AddLeafForm } from '@/components/AddLeafForm';
import { Footer } from '@/components/Footer';
import { SoundToggle } from '@/components/SoundToggle';
import { AdminPage } from '@/components/AdminPage';
import { FallingLeavesEffect } from '@/components/FallingLeavesEffect';
import { SceneryBackground } from '@/components/SceneryBackground';

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

  if (route === 'admin') {
    return <AdminPage />;
  }

  const heroTitle = settings?.hero_title || 'Our Flavor Tree';
  const heroSubtitle = settings?.hero_subtitle || 'Every leaf is a taste we shared.';
  const honoreeName = settings?.honoree_name || '';

  return (
    <div className="relative min-h-screen">
      <FallingLeavesEffect />
      <SoundToggle />

      {/* Inline hero text above tree */}
      <section className="relative z-10 text-center pt-16 md:pt-24 pb-4 px-4">
        <p className="font-hand text-xl md:text-2xl text-terracotta mb-3 opacity-80">
          A heartfelt farewell for
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-700 text-warm-brown leading-tight mb-4">
          {heroTitle}
          {honoreeName && (
            <>
              {' for '}
              <br className="md:hidden" />
              {honoreeName}
            </>
          )}
        </h1>
        <p className="font-hand text-xl md:text-2xl text-warm-brown/60 italic">
          {heroSubtitle}
        </p>
        {settings?.honoree_role && (
          <p className="mt-2 text-sm font-sans tracking-widest text-warm-brown/40 uppercase">
            {settings.honoree_role}
          </p>
        )}
      </section>

      <div className="relative">
        <SceneryBackground />
        <TreeSection
          messages={messages}
          onLeafClick={setSelectedMessage}
          onAddLeaf={() => setShowForm(true)}
        />
      </div>

      <Footer settings={settings} />

      {/* Message card overlay */}
      <AnimatePresence>
        {selectedMessage && (() => {
          const currentIndex = messages.findIndex(m => m.id === selectedMessage.id);
          const hasPrev = currentIndex > 0;
          const hasNext = currentIndex !== -1 && currentIndex < messages.length - 1;

          return (
            <MessageCard
              key={`card-${selectedMessage.id}`}
              message={selectedMessage}
              onClose={() => setSelectedMessage(null)}
              onPrev={hasPrev ? () => setSelectedMessage(messages[currentIndex - 1]) : undefined}
              onNext={hasNext ? () => setSelectedMessage(messages[currentIndex + 1]) : undefined}
            />
          );
        })()}
      </AnimatePresence>

      {/* Add leaf form */}
      <AddLeafForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitted={() => {
          setShowForm(false);
          loadMessages();
        }}
      />
    </div>
  );
}

export default App;
