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
    <section className="py-14 sm:py-18 bg-[#0a111e] text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-full max-w-4xl bg-emerald-500/10 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>JOIN THE CLUB</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Get 15% Off Your First Order
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Subscribe to our newsletter for exclusive discounts, new season drop alerts, and VIP
          private sales.
        </p>

        {subscribed ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 px-6 py-3 text-sm font-semibold text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span>Thank you for subscribing! Check your inbox for your 15% code.</span>
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
              className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-gray-400 focus:border-emerald-400 focus:bg-white/10 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-98"
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
