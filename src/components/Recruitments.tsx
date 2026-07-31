import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Upload, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { createApplication, uploadFile } from '../lib/db';

const DOMAINS = {
  'TECH': ['Hardware', 'Software'],
  'NON TECH': ['Content Writing', 'Content Creation', 'Editor', 'Designer', 'Events and Ops', 'Marketing'],
};

const STEPS = ['Personal Info', 'Domains', 'Details'];

export default function Recruitments() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    prn: '',
    email: '',
    phone: '',
    branch: '',
    year: '',
    domains: [] as string[],
    interests: '',
    experience: '',
    why: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [domainOpen, setDomainOpen] = useState(false);

  const handleDomainToggle = (domain: string) => {
    setForm(prev => ({
      ...prev,
      domains: prev.domains.includes(domain)
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain],
    }));
  };

  const canProceed = () => {
    if (step === 0) return form.name && form.prn && form.email && form.phone && form.branch && form.year;
    if (step === 1) return form.domains.length > 0;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;
    setSubmitting(true);
    try {
      let resume_url = '';
      if (resume) {
        const path = `${Date.now()}_${resume.name}`;
        resume_url = await uploadFile('resumes', path, resume);
      }
      await createApplication({ ...form, resume_url });
      setSubmitted(true);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  const inputClass = "w-full bg-zinc-50 border border-zinc-200 focus:border-iris-purple rounded-lg px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 outline-none transition-colors font-[Inter,sans-serif]";

  return (
    <section id="recruitments" className="relative min-h-screen py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Animated purple glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, -50, 0], y: [0, -80, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[5%] right-[-10%] w-[700px] h-[700px] rounded-full bg-purple-600/30 blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -80, 60, 0], y: [0, 60, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/25 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, 50, -70, 0], y: [0, -50, 70, 0], scale: [1, 1.2, 0.85, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 60, 0], y: [0, 70, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[30%] w-[400px] h-[400px] rounded-full bg-fuchsia-500/15 blur-[100px]"
        />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-funnel font-bold text-5xl sm:text-6xl text-white tracking-tight mb-2">
            Join IRIS
          </h2>
          <p className="text-gray-400 text-sm font-sans">
            Fill out the form below and we'll get back to you.
          </p>
        </motion.div>

        {/* Step indicator - outside the form */}
        {!submitted && (
          <div className="flex items-center gap-2 mb-6 px-1">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    i < step ? 'bg-iris-purple text-white' :
                    i === step ? 'bg-iris-purple text-white' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${
                    i <= step ? 'text-white' : 'text-zinc-600'
                  }`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px ${i < step ? 'bg-iris-purple' : 'bg-zinc-800'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-10 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
              <Check className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-funnel font-bold text-2xl text-zinc-900 mb-2">Application Submitted!</h3>
            <p className="text-zinc-500 text-sm font-sans">We'll review your application and get back to you soon.</p>
          </motion.div>
        ) : (
          <>
            {/* White form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className={inputClass}
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">PRN *</label>
                        <input
                          type="text"
                          required
                          value={form.prn}
                          onChange={e => setForm({ ...form, prn: e.target.value })}
                          className={inputClass}
                          placeholder="PRN Number"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className={inputClass}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className={inputClass}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Branch *</label>
                        <input
                          type="text"
                          required
                          value={form.branch}
                          onChange={e => setForm({ ...form, branch: e.target.value })}
                          className={inputClass}
                          placeholder="e.g. Computer Science"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Current Year *</label>
                        <select
                          required
                          value={form.year}
                          onChange={e => setForm({ ...form, year: e.target.value })}
                          className={inputClass + ' appearance-none'}
                        >
                          <option value="" disabled>Choose your year</option>
                          <option value="FE">FE (First Year)</option>
                          <option value="SE">SE (Second Year)</option>
                          <option value="TE">TE (Third Year)</option>
                          <option value="BE">BE (Fourth Year)</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-5"
                    >
                      <div className="flex flex-col gap-1.5 relative">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Select Domain(s) *</label>
                        <div
                          onClick={() => setDomainOpen(!domainOpen)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm font-[Inter,sans-serif] cursor-pointer flex items-center justify-between"
                        >
                          <span className={form.domains.length ? 'text-zinc-900' : 'text-zinc-400'}>
                            {form.domains.length ? form.domains.join(', ') : 'Select...'}
                          </span>
                          <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform ${domainOpen ? 'rotate-90' : ''}`} />
                        </div>

                        {domainOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                            {Object.entries(DOMAINS).map(([group, items]) => (
                              <div key={group}>
                                <div className="px-4 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50 border-b border-zinc-100">
                                  {group}
                                </div>
                                {items.map(domain => (
                                  <div
                                    key={domain}
                                    onClick={() => handleDomainToggle(domain)}
                                    className="px-4 py-2.5 text-sm font-[Inter,sans-serif] cursor-pointer hover:bg-zinc-50 flex items-center justify-between"
                                  >
                                    <span className={form.domains.includes(domain) ? 'text-iris-purple font-medium' : 'text-zinc-700'}>
                                      {domain}
                                    </span>
                                    {form.domains.includes(domain) && <Check className="w-4 h-4 text-iris-purple" />}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Resume or CV (Optional)</label>
                        <label className="flex items-center gap-3 bg-zinc-50 border border-dashed border-zinc-300 hover:border-iris-purple/50 rounded-lg px-4 py-4 cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-zinc-400" />
                          <span className="text-sm text-zinc-500 font-[Inter,sans-serif]">{resume ? resume.name : 'No file chosen'}</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={e => setResume(e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">What are your areas of interest? (Optional)</label>
                        <textarea
                          rows={2}
                          value={form.interests}
                          onChange={e => setForm({ ...form, interests: e.target.value })}
                          className={inputClass + ' resize-none'}
                          placeholder="AI, Robotics, Web Dev..."
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Any past experiences in your area of interest? (Optional)</label>
                        <textarea
                          rows={2}
                          value={form.experience}
                          onChange={e => setForm({ ...form, experience: e.target.value })}
                          className={inputClass + ' resize-none'}
                          placeholder="Projects, internships, competitions..."
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-zinc-500 font-medium font-[Inter,sans-serif]">Why do you want to join IRIS and how will you contribute? (Optional)</label>
                        <textarea
                          rows={3}
                          value={form.why}
                          onChange={e => setForm({ ...form, why: e.target.value })}
                          className={inputClass + ' resize-none'}
                          placeholder="Tell us what excites you about IRIS..."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Navigation - outside the form */}
            <div className="flex items-center justify-between mt-5">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              ) : <div />}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => canProceed() && setStep(s => s + 1)}
                  disabled={!canProceed()}
                  className="flex items-center justify-center gap-1.5 bg-iris-purple hover:bg-iris-purple/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm px-10 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit as any}
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 bg-iris-purple hover:bg-iris-purple/90 disabled:opacity-50 text-white font-medium text-sm px-10 py-3 rounded-xl transition-all cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
