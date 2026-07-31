import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Users, ChevronRight, X, Sparkles, CheckCircle, Ticket } from 'lucide-react';
import { INITIAL_EVENTS } from '../types';
import { getEvents } from '../lib/db';

interface EventRow {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  spots_left: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents(true).then((data: EventRow[]) => {
      if (data?.length) {
        setEvents(data as any);
      } else {
        setEvents(INITIAL_EVENTS.map(e => ({ ...e, spots_left: e.spotsLeft })));
      }
    }).catch(() => {
      setEvents(INITIAL_EVENTS.map(e => ({ ...e, spots_left: e.spotsLeft })));
    });
  }, []);
  const [registeringEvent, setRegisteringEvent] = useState<Event | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticket, setTicket] = useState<{ eventName: string; ticketId: string; name: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setEvents(prev => prev.map(evt => evt.id === registeringEvent?.id ? { ...evt, spotsLeft: Math.max(0, evt.spotsLeft - 1) } : evt));
      setTicket({ eventName: registeringEvent?.title || '', ticketId: `IRIS-${Math.floor(1000 + Math.random() * 9000)}`, name });
      setIsSubmitting(false);
      setName('');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="relative min-h-screen py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-8%] w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[130px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-3 font-sans">What's happening</p>
          <h1 className="font-funnel font-bold text-6xl sm:text-7xl text-white tracking-tight mb-4">Events</h1>
          <p className="text-gray-400 text-base font-sans max-w-2xl">
            Workshops, hackathons, talks, and more. Register to save your spot.
          </p>
        </motion.div>

        {/* Events list */}
        <div className="space-y-6">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-2xl p-7 sm:p-8 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-funnel font-bold text-2xl text-zinc-900 mb-1">{event.title}</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">{event.description}</p>
                </div>
                <span className="shrink-0 text-[11px] font-semibold text-iris-purple bg-iris-purple/10 border border-iris-purple/20 px-3 py-1 rounded-lg uppercase">
                  {((event as any).spots_left ?? (event as any).spotsLeft) > 0 ? `${(event as any).spots_left ?? (event as any).spotsLeft} spots` : 'Full'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-zinc-100 mb-5">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <Calendar className="w-4 h-4 text-iris-purple" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <MapPin className="w-4 h-4 text-iris-purple" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <Users className="w-4 h-4 text-iris-purple" />
                  <span>{event.speaker}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{event.time}</span>
                </div>
                <button
                  onClick={() => { setRegisteringEvent(event); setTicket(null); }}
                  className="flex items-center gap-2 bg-zinc-900 hover:bg-iris-purple text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
                >
                  Register <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {registeringEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRegisteringEvent(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-8 z-10"
            >
              <button onClick={() => setRegisteringEvent(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>

              {ticket ? (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">You're registered!</h3>
                  <p className="text-gray-400 text-sm mb-4">{ticket.eventName}</p>
                  <div className="bg-zinc-900 rounded-xl p-4 text-left text-sm space-y-2">
                    <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-white">{ticket.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Ticket ID</span><span className="text-iris-purple font-mono">{ticket.ticketId}</span></div>
                  </div>
                  <button onClick={() => setRegisteringEvent(null)} className="mt-6 w-full bg-iris-purple text-white py-2.5 rounded-xl text-sm font-medium cursor-pointer">
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">{registeringEvent.title}</h3>
                  <p className="text-gray-500 text-xs mb-6">{registeringEvent.date} • {registeringEvent.location}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full bg-zinc-900 border border-white/10 focus:border-iris-purple rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full bg-zinc-900 border border-white/10 focus:border-iris-purple rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-iris-purple hover:bg-iris-purple/90 disabled:opacity-50 text-white py-3 rounded-xl text-sm font-medium cursor-pointer"
                    >
                      {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
