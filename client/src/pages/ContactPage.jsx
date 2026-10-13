import { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Order Inquiry', message: '' });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f2ea] via-[#f3ebe0] to-[#eae1d2] py-14 sm:py-18 border-b border-[#e5dcce]">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b3b2c]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#0b3b2c]">
            <Sparkles className="h-3.5 w-3.5" />
            Concierge &amp; Customer Care
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#14211d]">
            Get In <span className="text-[#0b3b2c] italic font-normal">Touch</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#596b63] leading-relaxed">
            We&apos;d love to hear from you! Whether you have an inquiry about fit, your order, or
            custom sizing, our dedicated team is here to assist.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Contact Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b3b2c]">
                  Reach Out Directly
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14211d]">
                  Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-[#596b63]">
                  Our boutique concierge responds to all inquiries within 24 hours.
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-4 pt-2">
                {/* Location */}
                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b3b2c]/10 text-[#0b3b2c]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
                      Our Location
                    </h3>
                    <p className="text-xs sm:text-sm text-[#596b63] mt-0.5">
                      123 Fashion Street, Gulberg III, Lahore, Pakistan
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b3b2c]/10 text-[#0b3b2c]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
                      Email Us
                    </h3>
                    <a
                      href="mailto:support@glome.com"
                      className="text-xs sm:text-sm font-semibold text-[#0b3b2c] hover:underline mt-0.5 block"
                    >
                      support@glome.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b3b2c]/10 text-[#0b3b2c]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
                      Call Us
                    </h3>
                    <a
                      href="tel:+923001234567"
                      className="text-xs sm:text-sm font-semibold text-[#0b3b2c] hover:underline mt-0.5 block"
                    >
                      +92 300 123 4567
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b3b2c]/10 text-[#0b3b2c]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
                      Working Hours
                    </h3>
                    <p className="text-xs text-[#596b63] mt-0.5 leading-relaxed">
                      Mon – Sat: 9:00 AM – 9:00 PM <br />
                      Sunday: 10:00 AM – 6:00 PM PKT
                    </p>
                  </div>
                </div>
              </div>

              {/* Local Boutique Photo Card */}
              <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 shadow-xs mt-4">
                <img
                  src="/images/contact-support.jpg"
                  alt="Glome boutique interior"
                  className="h-44 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">
                    Flagship Store &amp; Showroom • Lahore
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Message Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#14211d]">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-[#596b63] mt-1">
                    Fill out the form below and we will get back to you promptly.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-3"
                  >
                    <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                    <h3 className="font-serif text-xl font-bold text-emerald-950">
                      Message Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                      Thank you for contacting Glome. One of our concierge specialists will review
                      your note and respond via email shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b3b2c] underline pt-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sohail Shabbir"
                        className="w-full rounded-xl border border-gray-200 bg-[#fbf9f5] px-4 py-2.5 text-xs sm:text-sm text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-gray-200 bg-[#fbf9f5] px-4 py-2.5 text-xs sm:text-sm text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-[#fbf9f5] px-4 py-2.5 text-xs sm:text-sm text-[#14211d] focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Order Inquiry">Order Inquiry &amp; Tracking</option>
                        <option value="Product Fit">Size &amp; Fit Recommendation</option>
                        <option value="Returns">Returns &amp; Exchanges</option>
                        <option value="Collaboration">Wholesale / Collaboration</option>
                        <option value="Feedback">General Feedback</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you today? Please share your question or order number..."
                        className="w-full rounded-xl border border-gray-200 bg-[#fbf9f5] px-4 py-3 text-xs sm:text-sm text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] py-3.5 px-6 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
