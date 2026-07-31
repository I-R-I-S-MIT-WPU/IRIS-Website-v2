import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Users, ChevronRight, X, Sparkles, CheckCircle, Ticket } from 'lucide-react';

import { Event, INITIAL_EVENTS } from '../types';
import { getEvents } from '../lib/db';

export default function Events() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);

  useEffect(() => {
    getEvents(true).then((data: any[]) => {
      if (data?.length) {
        setEvents(data.map(e => ({
          id: e.id,
          title: e.title,
          description: e.description,
          date: e.date,
          time: e.time,
          location: e.location,
          speaker: e.speaker,
          spotsLeft: e.spots_left,
        })));
      }
    }).catch(() => {});
  }, []);
  const [registeringEvent, setRegisteringEvent] = useState<Event | null>(null);
  const [ticket, setTicket] = useState<{
    eventName: string;
    ticketId: string;
    name: string;
    email: string;
    cluster: string;
    gateCode: string;
  } | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cluster, setCluster] = useState('Software');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterClick = (event: Event) => {
    setRegisteringEvent(event);
    setTicket(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    
    // Simulate API registration delay
    setTimeout(() => {
      // Decrement spots left for that event
      setEvents(prev =>
        prev.map(evt =>
          evt.id === registeringEvent?.id
            ? { ...evt, spotsLeft: Math.max(0, evt.spotsLeft - 1) }
            : evt
        )
      );

      // Generate a high-fidelity mock ticket receipt
      const generatedTicketId = `IRIS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const generatedGateCode = `GATE-${String.fromCharCode(65 + Math.floor(Math.random() * 4))}-${Math.floor(10 + Math.random() * 90)}`;
      
      setTicket({
        eventName: registeringEvent?.title || '',
        ticketId: generatedTicketId,
        name,
        email,
        cluster,
        gateCode: generatedGateCode
      });
      
      setIsSubmitting(false);

      // Reset form fields
      setName('');
      setEmail('');
      setCluster('Software');
    }, 1200);
  };

  return (
    <section id="events" className="relative py-24 px-6 lg:px-12 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[-15%] w-[700px] h-[700px] rounded-full bg-purple-600/30 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-500/20 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="absolute top-[20%] left-[40%] w-[400px] h-[400px] rounded-full bg-iris-purple/15 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-iris-purple text-xs font-semibold uppercase tracking-widest mb-4 font-sans">Upcoming</p>
          <h2 className="font-funnel font-bold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight">
            Events
          </h2>
        </motion.div>

        {/* Timeline - one sided */}
        <div className="relative pl-8 sm:pl-12 md:pl-16">
          {/* Vertical line */}
          <div className="absolute left-3 sm:left-5 md:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-iris-purple/50 via-white/10 to-transparent" />

          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              id={`event-row-${event.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative mb-14 last:mb-0"
            >
              {/* Timeline dot + connector */}
              <div className="absolute -left-8 sm:-left-12 md:-left-16 top-8 flex items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-iris-purple shadow-[0_0_10px_rgba(144,97,249,0.5)] z-10" />
                <div className="w-5 sm:w-9 md:w-13 h-px bg-iris-purple/30" />
              </div>

              {/* Date label */}
              <div className="mb-3">
                <span className="text-iris-purple text-xs font-semibold uppercase tracking-wider font-sans">{event.date}</span>
              </div>

              {/* Card */}
              <div
                onClick={() => handleRegisterClick(event)}
                className="group bg-white rounded-2xl p-7 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h3 className="font-funnel font-bold text-2xl sm:text-3xl text-zinc-900 group-hover:text-iris-purple transition-colors leading-tight">
                    {event.title}
                  </h3>
                  <span className="shrink-0 text-[11px] font-semibold text-iris-purple bg-iris-purple/10 border border-iris-purple/20 px-3 py-1 rounded-lg uppercase tracking-wide">
                    {event.spotsLeft > 0 ? `${event.spotsLeft} spots left` : 'Fully Booked'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-sans mb-6">
                  {event.description}
                </p>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 py-5 border-y border-zinc-100">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-iris-purple mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mb-0.5">Time</p>
                      <p className="text-zinc-900 text-sm font-sans">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-iris-purple mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mb-0.5">Venue</p>
                      <p className="text-zinc-900 text-sm font-sans">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-iris-purple mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mb-0.5">Speaker</p>
                      <p className="text-zinc-900 text-sm font-sans">{event.speaker}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-500 text-xs font-sans">{event.date}</span>
                  </div>
                  <button className="flex items-center gap-2 bg-zinc-900 hover:bg-iris-purple text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                    Register Now
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {registeringEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRegisteringEvent(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-iris-purple/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto"
            >
              <button
                id="close-events-modal"
                onClick={() => setRegisteringEvent(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!ticket ? (
                /* Registration Input Form */
                <div className="text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-iris-purple" />
                    <span className="font-mono text-[9px] text-iris-purple font-bold uppercase tracking-widest">GATEWAY_ENTRY // REGISTRATION</span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-2 leading-tight">
                    {registeringEvent.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                    Join the waitlist or reserve your seed slot in this research cluster session. Verify your details below to generate an entry gatepass.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                    {/* Name input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-name-field" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Candidate Name</label>
                      <input
                        id="reg-name-field"
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-zinc-900 border border-white/5 focus:border-iris-purple/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none w-full transition-colors font-sans"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-email-field" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Secure Email Address</label>
                      <input
                        id="reg-email-field"
                        type="email"
                        required
                        placeholder="name@organization.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-zinc-900 border border-white/5 focus:border-iris-purple/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none w-full transition-colors font-sans"
                      />
                    </div>

                    {/* Cluster Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-cluster-select" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Preferred Cluster Alignment</label>
                      <select
                        id="reg-cluster-select"
                        value={cluster}
                        onChange={(e) => setCluster(e.target.value)}
                        className="bg-zinc-900 border border-white/5 focus:border-iris-purple/40 rounded-xl px-4 py-3 text-white outline-none w-full transition-colors font-sans"
                      >
                        <option value="Software">Software & Embedded AI</option>
                        <option value="Hardware">Hardware & Robotics Fabrication</option>
                        <option value="Avionics">Flight Mechanics & Swarms</option>
                        <option value="Philosophy">Technology Ethics & Philosophy</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="reg-submit-btn"
                      type="submit"
                      disabled={isSubmitting || registeringEvent.spotsLeft <= 0}
                      className="w-full flex items-center justify-center gap-2 bg-iris-purple hover:bg-iris-purple/90 text-white font-semibold py-3.5 rounded-xl transition-all cursor-pointer shadow-[0_4px_15px_rgba(144,97,249,0.3)] disabled:opacity-50 disabled:cursor-not-allowed font-sans mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Gatepass...</span>
                        </>
                      ) : registeringEvent.spotsLeft > 0 ? (
                        <span>Generate Entry pass</span>
                      ) : (
                        <span>Fully Booked</span>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Ticket Receipt Display */
                <div className="text-center font-sans">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-1 uppercase tracking-wider">Registration Secured</h3>
                  <p className="text-xs text-gray-400 font-sans mb-6">Your slot has been registered in the database core.</p>

                  {/* Digital Ticket Frame */}
                  <div className="bg-zinc-900 border border-iris-purple/20 rounded-xl p-5 text-left font-mono text-xs relative overflow-hidden">
                    {/* Left & Right custom ticket punch cuts */}
                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-950 border-r border-iris-purple/20" />
                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-950 border-l border-iris-purple/20" />

                    <div className="border-b border-white/5 pb-3 mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Ticket className="w-4 h-4 text-iris-purple" />
                        <span className="text-[10px] text-gray-400 tracking-widest font-semibold uppercase">I.R.I.S. OFFICIAL PASS</span>
                      </div>
                      <span className="text-emerald-400 font-bold uppercase text-[9px]">CONFIRMED</span>
                    </div>

                    <div className="space-y-2 text-gray-400 pb-3 mb-3 border-b border-white/5">
                      <div>
                        <span className="text-[9px] text-gray-500 block">EVENT SCHEDULE:</span>
                        <span className="text-white text-xs font-semibold">{ticket.eventName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 block">CANDIDATE:</span>
                        <span className="text-white font-medium">{ticket.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] text-gray-500 block">CLUSTER ALIGN:</span>
                          <span className="text-white">{ticket.cluster}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 block">GATE CODE:</span>
                          <span className="text-iris-purple font-bold">{ticket.gateCode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-gray-500 block">TICKET ID:</span>
                        <span className="text-white text-[10px] font-bold">{ticket.ticketId}</span>
                      </div>
                      <span className="text-[8px] text-zinc-600 select-none">#IRIS_CORE_SECURE_HASH</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                    <button
                      id="pass-download-btn"
                      onClick={() => alert('Entry pass has been saved to your offline cache.')}
                      className="flex-1 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase py-2.5 rounded-full transition-colors cursor-pointer"
                    >
                      Download Pass
                    </button>
                    <button
                      id="pass-finish-btn"
                      onClick={() => setRegisteringEvent(null)}
                      className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-white/5 text-gray-300 text-xs font-bold uppercase py-2.5 rounded-full transition-colors cursor-pointer"
                    >
                      Close Gateway
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
