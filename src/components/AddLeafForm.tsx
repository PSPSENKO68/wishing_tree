import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, ImagePlus, Check, Loader2 } from 'lucide-react';
import type { LeafType, Message } from '@/lib/supabase';
import { LEAF_TYPES, LEAF_LABELS, LEAF_COLORS, supabase } from '@/lib/supabase';
import { LeafShape } from './LeafShapes';
import { playSuccessSound } from './SoundToggle';

interface AddLeafFormProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: (message: Message) => void;
}

const MAX_MESSAGE = 300;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB

export function AddLeafForm({ open, onClose, onSubmitted }: AddLeafFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [messageText, setMessageText] = useState('');
  const [leafType, setLeafType] = useState<LeafType | ''>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setName('');
    setRole('');
    setMessageText('');
    setLeafType('');
    setPhotoFile(null);
    setPhotoPreview(null);
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    if (!submitting) {
      resetForm();
      onClose();
    }
  };

  const handlePhotoSelect = (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setError('Image must be under 5MB.');
      return;
    }
    setError(null);
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handlePhotoSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handlePhotoSelect(file);
  };

  const resizeImage = (file: File, maxSize: number = 1600): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) { reject(new Error('Canvas not supported')); return; }
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to compress image'));
          }, 'image/jpeg', 0.85);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    setError(null);

    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!role.trim()) { setError('Please enter your role or team.'); return; }
    if (!messageText.trim()) { setError('Please write a message.'); return; }
    if (messageText.length > MAX_MESSAGE) { setError(`Message must be ${MAX_MESSAGE} characters or less.`); return; }

    setSubmitting(true);

    try {
      let photoUrl: string | null = null;

      if (photoFile) {
        const resized = await resizeImage(photoFile);
        const fileName = `leaf-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('farewell-photos')
          .upload(fileName, resized, { contentType: 'image/jpeg' });

        if (uploadError) throw new Error('Failed to upload photo. Please try again.');

        const { data: urlData } = supabase.storage
          .from('farewell-photos')
          .getPublicUrl(fileName);
        photoUrl = urlData.publicUrl;
      }

      const chosenLeafType: LeafType = leafType || LEAF_TYPES[Math.floor(Math.random() * LEAF_TYPES.length)];

      const { data, error: insertError } = await supabase
        .from('messages')
        .insert({
          sender_name: name.trim(),
          sender_role: role.trim(),
          message: messageText.trim(),
          photo_url: photoUrl,
          leaf_type: chosenLeafType,
          is_approved: true,
        })
        .select()
        .single();

      if (insertError) throw new Error('Failed to submit your message. Please try again.');

      playSuccessSound();
      setSuccess(true);

      setTimeout(() => {
        onSubmitted(data as Message);
        resetForm();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-warm-brown/40 backdrop-blur-sm" />

          <motion.div
            className="relative bg-cream rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-warm-sand/50"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-cream/95 backdrop-blur-sm px-6 py-4 border-b border-warm-sand/30 flex items-center justify-between z-10">
              <h2 className="font-serif text-xl font-600 text-warm-brown">Add Your Leaf</h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-warm-sand/30 flex items-center justify-center text-warm-brown hover:text-terracotta hover:bg-warm-sand/50 transition-colors"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {success ? (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage/20 flex items-center justify-center"
                >
                  <Check className="w-8 h-8 text-deep-green" />
                </motion.div>
                <p className="font-serif text-lg text-warm-brown mb-2">Your leaf is on its way!</p>
                <p className="text-sm text-warm-brown/50">It will appear on the tree once approved.</p>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">
                    Your Name <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 bg-cream text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all"
                    placeholder="e.g. Jamie Rivera"
                    maxLength={100}
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">
                    Role / Team <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 bg-cream text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all"
                    placeholder="e.g. R&D, Sensory Team"
                    maxLength={100}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">
                    Your Message <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-warm-sand/50 bg-cream text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all resize-none"
                    rows={4}
                    placeholder="Share a memory, piece of advice, or farewell..."
                    maxLength={MAX_MESSAGE}
                  />
                  <p className={`text-xs mt-1 text-right ${messageText.length > MAX_MESSAGE - 20 ? 'text-terracotta' : 'text-warm-brown/40'}`}>
                    {messageText.length}/{MAX_MESSAGE}
                  </p>
                </div>

                {/* Photo upload */}
                <div>
                  <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">
                    Photo <span className="text-warm-brown/40 font-400">(optional)</span>
                  </label>
                  {photoPreview ? (
                    <div className="relative rounded-lg overflow-hidden border border-warm-sand/50">
                      <img src={photoPreview} alt="Preview" className="w-full max-h-48 object-cover" />
                      <button
                        onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-warm-brown/60 text-cream flex items-center justify-center hover:bg-warm-brown/80 transition-colors"
                        aria-label="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      className="border-2 border-dashed border-warm-sand/50 rounded-lg p-6 text-center cursor-pointer hover:border-terracotta hover:bg-terracotta/5 transition-all"
                    >
                      <ImagePlus className="w-8 h-8 mx-auto mb-2 text-warm-brown/40" />
                      <p className="text-sm text-warm-brown/50">
                        Drag & drop or <span className="text-terracotta font-600">browse</span>
                      </p>
                      <p className="text-xs text-warm-brown/30 mt-1">JPG, PNG, or WebP up to 5MB</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {/* Leaf type picker */}
                <div>
                  <label className="block text-sm font-sans font-600 text-warm-brown mb-1.5">
                    Icon Type <span className="text-warm-brown/40 font-400">(optional)</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {LEAF_TYPES.map((type) => {
                      const colors = LEAF_COLORS[type];
                      const isSelected = leafType === type;
                      return (
                        <button
                          key={type}
                          onClick={() => setLeafType(isSelected ? '' : type)}
                          className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                            isSelected
                              ? 'border-terracotta bg-terracotta/10 scale-105'
                              : 'border-warm-sand/30 hover:border-warm-sand/60'
                          }`}
                          title={LEAF_LABELS[type]}
                          aria-label={LEAF_LABELS[type]}
                        >
                          <div className="w-8 h-8">
                            <LeafShape type={type} fill={colors[0]} className="w-full h-full" />
                          </div>
                          <span className="text-[10px] text-warm-brown/50">{LEAF_LABELS[type]}</span>
                        </button>
                      );
                    })}
                  </div>
                  {leafType === '' && (
                    <p className="text-xs text-warm-brown/40 mt-1">An icon will be chosen at random if you don't pick one.</p>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-burnt bg-burnt/10 px-4 py-2 rounded-lg">{error}</p>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-terracotta hover:bg-terracotta-dark text-cream font-sans font-600 text-lg py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Adding to the tree...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Add to the Tree
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
