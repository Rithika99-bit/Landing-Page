import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, Send, Activity, ShieldCheck, Zap } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

const PRESET_QUERIES = [
  {
    q: "What is your emergency triage wait time?",
    a: "Our emergency facility operates with zero-wait digital intake: immediate robotic triaging and clinical assignment in under 120 seconds."
  },
  {
    q: "Which department manages cardiac arrhythmia?",
    a: "Dr. Marcus Vance chairs our Precision Cardiology center, utilizing robotic catheterization and real-time hemodynamic electrophysiology mapping."
  },
  {
    q: "How does the 7-Tesla high-field MRI work?",
    a: "Our 7-Tesla MRI achieves sub-cellular resolution in under 15 minutes, with automated neural AI anomaly screening and same-day physician verification."
  }
];

export default function AIHealthAssistantOrb({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am the Aetheria Clinical AI Copilot. Ask me anything about our specialists, diagnostic protocols, or emergency services."
    }
  ]);
  const [input, setInput] = useState('');

  const handleToggle = () => {
    audioManager.playHeartbeat(0.08);
    setIsOpen(!isOpen);
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    audioManager.playConfirmation(0.06);

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Trigger Symptom -> Specialist Neural Trace animation
    let targetSpecialist = 'Clinical Diagnostics';
    let targetSelector = '#services';
    const lower = text.toLowerCase();
    if (lower.includes('cardiac') || lower.includes('arrhythmia') || lower.includes('heart')) {
      targetSpecialist = 'Precision Cardiology';
      targetSelector = '#services';
    } else if (lower.includes('emergency') || lower.includes('wait') || lower.includes('triage')) {
      targetSpecialist = 'Emergency Robotics';
      targetSelector = '#services';
    } else if (lower.includes('mri') || lower.includes('brain') || lower.includes('neuro')) {
      targetSpecialist = '7T Neuro-Radiology';
      targetSelector = '#departments';
    }

    window.dispatchEvent(
      new CustomEvent('aurelia:neural-trace', {
        detail: {
          symptom: targetSpecialist,
          targetSelector,
        },
      })
    );

    // Match preset answers or synthesize smart clinical response
    setTimeout(() => {
      const match = PRESET_QUERIES.find((p) => p.q.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(p.q.toLowerCase()));
      const aiReply = match
        ? match.a
        : `Under clinical protocol: All care pathways at Aetheria are individualized to your personal genomic twin. Would you like me to connect you directly with a faculty coordinator?`;

      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiReply }
      ]);
      audioManager.playHeartbeat(0.06);
    }, 450);
  };

  return (
    <aside aria-label="AI Health Assistant" className="fixed bottom-7 right-7 z-50 select-none">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            layoutId="ai-health-orb-container"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="w-[90vw] max-w-sm sm:max-w-md h-[520px] rounded-[2.5rem] bg-[#080B1A]/95 text-white backdrop-blur-2xl border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,240,255,0.25),0_0_0_1px_rgba(123,92,250,0.3)] flex flex-col overflow-hidden"
          >
            {/* HUD Header */}
            <div className="p-5 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-[#0E1530] to-violet-950/30 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#00F0FF] to-[#7B5CFA] p-0.5 flex items-center justify-center shadow-[0_0_15px_#00F0FF]">
                  <div className="w-full h-full bg-[#080B1A] rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#00F0FF] animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                    <h4 className="font-mono text-xs font-black tracking-wider text-[#00F0FF]">
                      AETHERIA CLINICAL AI
                    </h4>
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono">
                    LLM-v4.2 // ENCRYPTED ENCLAVE
                  </p>
                </div>
              </div>

              <button
                onClick={handleToggle}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] text-white rounded-br-none shadow-md'
                        : 'bg-[#10172E] text-gray-200 border border-cyan-500/20 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Preset Quick Questions */}
              {messages.length < 3 && (
                <div className="pt-2 space-y-1.5">
                  <span className="font-mono text-[9px] font-bold text-cyan-400/70 uppercase tracking-widest block">
                    Quick Clinical Inquiries:
                  </span>
                  {PRESET_QUERIES.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(preset.q)}
                      className="w-full text-left p-2 rounded-xl text-[11px] font-medium text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 transition-all block truncate"
                    >
                      ✦ {preset.q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Input & Booking Action */}
            <div className="p-3 border-t border-cyan-500/20 bg-[#080B1A]/80 space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about symptoms, protocols, doctors..."
                  className="flex-1 bg-[#10172E] text-white placeholder-gray-500 text-xs px-3.5 py-2.5 rounded-xl border border-cyan-500/25 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#2F80ED] text-[#080B1A] font-bold hover:scale-105 transition-transform"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenBooking) onOpenBooking();
                }}
                className="w-full py-1.5 rounded-lg text-[11px] font-bold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launch Diagnostic Booking Wizard</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            layoutId="ai-health-orb-container"
            onClick={handleToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="cursor-pointer relative group flex items-center justify-center"
            title="Aetheria AI Clinical Assistant"
          >
            {/* Pulsing Breathing Living Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F0FF] via-[#7B5CFA] to-[#00F0FF] blur-xl opacity-75 animate-orb-breathe" />

            {/* Glowing Orb Sphere */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#00F0FF] via-[#2F80ED] to-[#7B5CFA] p-[2px] shadow-[0_0_25px_rgba(0,240,255,0.7),0_0_50px_rgba(123,92,250,0.5)]">
              <div className="w-full h-full rounded-full bg-[#080B1A] flex items-center justify-center relative overflow-hidden">
                <Sparkles className="w-6 h-6 text-[#00F0FF] group-hover:rotate-12 transition-transform duration-300" />
                {/* Micro rotating ring */}
                <div className="absolute inset-1 rounded-full border border-cyan-400/30 border-dashed animate-radar-sweep" />
              </div>
            </div>

            {/* Hover Tooltip Pill */}
            <div className="absolute right-16 px-3 py-1.5 rounded-full bg-[#080B1A]/90 text-[#00F0FF] font-mono text-[10px] font-bold tracking-wider whitespace-nowrap backdrop-blur-md border border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.3)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              AI CLINICAL COPILOT // LIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
