import { useState } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0b3b2c] text-white relative overflow-hidden border-t border-[#144e3b]">
      {/* Decorative gradient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-full max-w-4xl bg-[#124e3b]/50 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#d4a373] mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>JOIN THE GLOME CIRCLE</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Enjoy 15% Off Your First Order
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#dce7e2] max-w-xl mx-auto leading-relaxed">
          Be the first to hear about private seasonal drops, artisanal shoe restocks, and ethical
          craft stories.
        </p>

        {subscribed ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-[#d4a373]">
            <CheckCircle2 className="h-5 w-5" />
            <span>Thank you for joining! Your 15% welcome code is on its way.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-[#dce7e2]/70 focus:border-[#cf7a3a] focus:bg-white/15 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#cf7a3a] hover:bg-[#b8672e] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all duration-200 active:scale-98"
            >
              <span>Subscribe</span>
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
