import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, FileText, CheckCircle2, X, Mail, Send, Award, Compass } from 'lucide-react';

export default function JoinUs() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    experience: 'Beginner',
    interests: [] as string[],
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);

  const interestOptions = ['Embedded AI', 'Robotics Hardware', 'Autonomous UAVs', 'Spatial Computing', 'Systems Programming'];

  const handleInterestToggle = (interest: string) => {
    setAppForm(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setShowSuccessMessage(`Email ${subscribeEmail} has been added to our research dispatch log!`);
      setSubscribeEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.name || !appForm.email || !appForm.reason) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setShowSuccessMessage(`Thank you, ${appForm.name}! Your application has been logged into our candidate queue.`);
      setAppForm({ name: '', email: '', experience: 'Beginner', interests: [], reason: '' });
      setIsSubmitting(false);
    }, 1400);
  };

  const closeNotifications = () => {
    setShowSuccessMessage(null);
    setIsSubscribing(false);
    setIsApplying(false);
  };

  return (
    <section id="join-us-section" className="relative py-20 px-6 lg:px-12 bg-iris-dark">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Main CTA card - wide, thin, light purple gradient */}
        <motion.div
          id="join-now-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-white via-[#f0ebff] to-[#e4dcff] rounded-3xl py-10 px-8 sm:px-16 text-center relative overflow-hidden w-full"
        >
          {/* Central contents */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Giant Heading - Funnel Display */}
            <h3 className="font-funnel text-5xl sm:text-6xl md:text-7xl text-black tracking-tight leading-tight mb-4">
              JOIN <span className="font-bold">IRIS</span><br />NOW!
            </h3>

            {/* Subtext description */}
            <p className="text-zinc-700 text-sm leading-relaxed mb-8 max-w-md font-sans">
              We would love to connect with you & get your ideas into the club, Click below for more information
            </p>

            {/* Buttons with arrows */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Contact Us button - outlined */}
              <button
                id="subscribe-cta-btn"
                onClick={() => { setIsSubscribing(true); setIsApplying(false); }}
                className="group flex items-center justify-center gap-3 bg-transparent hover:bg-zinc-100 text-black border-2 border-zinc-900 px-10 py-3.5 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer"
              >
                Contact Us
                <span className="text-lg">›</span>
              </button>

              {/* Join Us Now button - filled dark */}
              <button
                id="apply-cta-btn"
                onClick={() => { setIsApplying(true); setIsSubscribing(false); }}
                className="group flex items-center justify-center gap-3 bg-zinc-950 hover:bg-zinc-800 text-white px-10 py-3.5 rounded-xl text-base font-medium transition-all duration-300 cursor-pointer"
              >
                Join Us Now
                <span className="text-lg">›</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* POPUP CONTAINER MODALS */}
      <AnimatePresence>
        {(isSubscribing || isApplying || showSuccessMessage) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeNotifications}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-950 border border-iris-purple/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-left overflow-y-auto max-h-[92vh]"
            >
              <button
                id="close-cta-modal"
                onClick={closeNotifications}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {showSuccessMessage ? (
                /* Success Notification screen */
                <div className="text-center font-sans py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2 uppercase">Core Log Updated</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">{showSuccessMessage}</p>
                  <button
                    id="cta-success-btn"
                    onClick={closeNotifications}
                    className="w-full bg-iris-purple hover:bg-iris-purple/85 text-white text-xs font-bold uppercase py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Return
                  </button>
                </div>
              ) : isSubscribing ? (
                /* Subscription Input form */
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-4 h-4 text-iris-purple" />
                    <span className="font-mono text-[9px] text-iris-purple font-bold uppercase tracking-widest">SUBSCRIBE_DISPATCH</span>
                  </div>
                  <h4 className="font-display font-bold text-xl text-white mb-1.5 uppercase">Dispatch Registry</h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed mb-5">
                    Register your endpoint to receive weekly laboratory dispatches, hardware blueprints, and research progress reports.
                  </p>

                  <form onSubmit={handleSubscribeSubmit} className="space-y-4 font-sans text-sm">
                    <input
                      id="sub-email-field"
                      type="email"
                      required
                      placeholder="Enter active email address"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      className="bg-zinc-900 border border-white/5 focus:border-iris-purple/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none w-full transition-colors"
                    />
                    <button
                      id="sub-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-iris-purple hover:bg-iris-purple/90 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? 'Registering...' : 'Subscribe To Logs'}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ) : (
                /* Full Candidate Application form */
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Compass className="w-4 h-4 text-iris-purple" />
                    <span className="font-mono text-[9px] text-iris-purple font-bold uppercase tracking-widest">CORE_RECRUITMENT_PORTAL</span>
                  </div>
                  <h4 className="font-display font-bold text-xl text-white mb-1.5 uppercase">Apply To I.R.I.S.</h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed mb-5">
                    We invite ambitious thinkers. Specify your primary cluster interest and experience alignment to initiate our review protocol.
                  </p>

                  <form onSubmit={handleApplySubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="app-name-field" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Your Name</label>
                      <input
                        id="app-name-field"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={appForm.name}
                        onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                        className="bg-zinc-900 border border-white/5 focus:border-iris-purple/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="app-email-field" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Secure Email</label>
                      <input
                        id="app-email-field"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={appForm.email}
                        onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                        className="bg-zinc-900 border border-white/5 focus:border-iris-purple/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 outline-none"
                      />
                    </div>

                    {/* Experience Level */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="app-exp-select" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Self-Assessed Experience</label>
                      <select
                        id="app-exp-select"
                        value={appForm.experience}
                        onChange={(e) => setAppForm({ ...appForm, experience: e.target.value })}
                        className="bg-zinc-900 border border-white/5 focus:border-iris-purple/40 rounded-xl px-4 py-2.5 text-white outline-none"
                      >
                        <option value="Beginner">Level 1 - Enthusiast / Learner</option>
                        <option value="Intermediate">Level 2 - Practical Builder</option>
                        <option value="Expert">Level 3 - Systems / Core Engineer</option>
                      </select>
                    </div>

                    {/* Interests */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Cluster Interests (Select all)</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {interestOptions.map((opt) => {
                          const selected = appForm.interests.includes(opt);
                          return (
                            <button
                              key={opt}
                              id={`app-interest-btn-${opt.toLowerCase().replace(/\s+/g, '-')}`}
                              type="button"
                              onClick={() => handleInterestToggle(opt)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                                selected
                                  ? 'bg-iris-purple/15 text-iris-purple border-iris-purple/40'
                                  : 'bg-zinc-900 text-gray-400 border-white/5 hover:text-white'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Why IRIS */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="app-reason-field" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Core Motivations</label>
                      <textarea
                        id="app-reason-field"
                        required
                        rows={3}
                        placeholder="Briefly share what you aim to build with us..."
                        value={appForm.reason}
                        onChange={(e) => setAppForm({ ...appForm, reason: e.target.value })}
                        className="bg-zinc-900 border border-white/5 focus:border-iris-purple/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 outline-none resize-none font-sans"
                      />
                    </div>

                    {/* Submit application */}
                    <button
                      id="app-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-iris-purple hover:bg-iris-purple/90 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 mt-4"
                    >
                      <Award className="w-4 h-4" />
                      {isSubmitting ? 'Submitting File...' : 'Submit Official Candidacy'}
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
