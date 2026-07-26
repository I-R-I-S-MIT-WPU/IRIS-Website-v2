import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Users, ChevronRight, X, Sparkles, CheckCircle, Ticket } from 'lucide-react';
import { Event, INITIAL_EVENTS } from '../types';

export default function Events() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
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
      {/* Background Glowing Spotlight Blobs matching the reference image precisely using exact color codes */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#030205] overflow-hidden">
        {/* Base soft dark ambient backdrop using #2C195C */}
        <div className="absolute top-[10%] left-[5%] w-[90%] h-[80%] rounded-full bg-[#2C195C] opacity-90 blur-[150px] pointer-events-none" />
        
        {/* Mid-tone purple structures using #5630A7 */}
        <div className="absolute top-[20%] left-[20%] w-[60%] h-[55%] rounded-full bg-[#5630A7] opacity-80 blur-[130px] pointer-events-none" />
        
        {/* Bright violet spotlights using #7449DA */}
        <div className="absolute top-[25%] left-[25%] w-[45%] h-[40%] rounded-full bg-[#7449DA] opacity-85 blur-[110px] pointer-events-none" />
        
        {/* Lavender highlights using #A696EF */}
        <div className="absolute top-[30%] left-[30%] w-[35%] h-[30%] rounded-full bg-[#A696EF] opacity-75 blur-[90px] pointer-events-none" />
        
        {/* Bright central mist using #DDDAFA at exactly 66.67% opacity */}
        <div className="absolute top-[35%] left-[35%] w-[25%] h-[20%] rounded-full bg-[#DDDAFA]/65 blur-[70px] pointer-events-none" />

        {/* Soft edge radial vignette overlay to keep bounds elegantly darkened */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_95%)] opacity-95 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Block */}
        <div className="text-center mb-16">
          <motion.h2
            id="events-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-hanson font-bold text-4xl sm:text-5xl md:text-6xl tracking-[0.06em] text-white uppercase"
          >
            OUR EVENTS
          </motion.h2>
          <div className="w-16 h-[2px] bg-iris-purple mx-auto mt-4" />
        </div>

        {/* Timeline Stack matching screenshot style */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6 relative">
          {/* Vertical timeline connector line */}
          <div className="absolute left-[20px] sm:left-[32px] top-4 bottom-4 w-[2px] bg-white/5 pointer-events-none" />

          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              id={`event-row-${event.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => handleRegisterClick(event)}
              className="group bg-iris-card border border-iris-border rounded-xl p-5 sm:p-7 flex items-center gap-4 sm:gap-6 hover:border-iris-purple/40 hover:shadow-[0_2px_20px_rgba(144,97,249,0.08)] transition-all duration-300 cursor-pointer relative z-10 text-left"
            >
              {/* Left timeline circle dot indicator */}
              <div className="flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-white/5 bg-zinc-950/80 flex items-center justify-center group-hover:border-iris-purple/50 group-hover:shadow-[0_0_12px_rgba(144,97,249,0.3)] transition-all">
                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-iris-purple" />
              </div>

              {/* Event Info Details */}
              <div className="flex-grow min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <h3 className="font-display font-semibold text-base sm:text-xl text-white group-hover:text-iris-purple transition-colors leading-snug">
                    {event.title}
                  </h3>
                  <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-md sm:self-start whitespace-nowrap">
                    Seats: {event.spotsLeft > 0 ? `${event.spotsLeft} Left` : 'FULLY BOOKED'}
                  </span>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans line-clamp-2">
                  {event.description}
                </p>

                {/* Sub Metadata parameters */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-gray-500 border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-600" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-600" />
                    <span>{event.speaker}</span>
                  </div>
                </div>
              </div>

              {/* Action arrow button on right */}
              <div className="flex-shrink-0 p-2 text-gray-600 group-hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
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
