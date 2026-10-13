import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { setCredentials } from '@/features/auth/authSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);

    // Mock authentication with persistent user session
    setTimeout(() => {
      setLoading(false);
      const mockUser = {
        id: 'usr-1',
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: 'customer',
      };
      dispatch(
        setCredentials({
          user: mockUser,
          accessToken: 'mock-jwt-token-' + Date.now(),
        })
      );
      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-[#faf7f2]">
      {/* Left Column: Brand & Lifestyle Showcase (Hidden on small mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0b3b2c] overflow-hidden text-white flex-col justify-between p-12 xl:p-16">
        {/* Background photo with overlay */}
        <img
          src="/images/auth-hero.jpg"
          alt="Glome luxury collection"
          className="absolute inset-0 h-full w-full object-cover opacity-35 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06261b] via-[#0b3b2c]/85 to-[#0b3b2c]/75 pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0b3b2c] shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                GLOME
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#dce7e2] font-semibold mt-0.5">
                Online Mall
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Editorial Quote */}
        <div className="relative z-10 max-w-lg space-y-4">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#dce7e2]">
            Timeless Wardrobe Essentials
          </span>
          <h2 className="font-serif text-3xl xl:text-4xl font-bold leading-tight text-white">
            &ldquo;Style is a way to say who you are without having to speak.&rdquo;
          </h2>
          <p className="text-sm text-[#dce7e2] leading-relaxed">
            Join over 50,000 discerning shoppers who trust Glome for curated footwear, artisanal
            apparel, and elevated lifestyle essentials.
          </p>
        </div>

        {/* Bottom: Perks Bar */}
        <div className="relative z-10 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-[#dce7e2]">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-[#cf7a3a]" />
            <span>Free Shipping &gt; $50</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-[#cf7a3a]" />
            <span>30-Day Easy Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#cf7a3a]" />
            <span>100% Genuine</span>
          </div>
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 xl:p-16 overflow-y-auto">
        {/* Top: Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xs font-semibold text-[#596b63] hover:text-[#0b3b2c] flex items-center gap-1 transition-colors"
          >
            &larr; Back to store
          </Link>

          <span className="text-xs text-[#708077]">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-bold text-[#0b3b2c] hover:underline">
              Sign Up
            </Link>
          </span>
        </div>

        {/* Center Form Container */}
        <div className="mx-auto w-full max-w-md py-8 space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold text-[#14211d]">Welcome Back</h1>
            <p className="text-xs sm:text-sm text-[#596b63]">
              Sign in to manage your bag, track orders, and view member pricing.
            </p>
          </div>

          {/* Social Google Login Button */}
          <div>
            <button
              type="button"
              onClick={() => {
                dispatch(
                  setCredentials({
                    user: { id: 'usr-google', name: 'Google User', email: 'user@gmail.com' },
                    accessToken: 'google-token-123',
                  })
                );
                navigate('/');
              }}
              className="w-full flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3 px-4 text-xs sm:text-sm font-semibold text-[#14211d] shadow-2xs hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.27-2.09 3.645-5.17 3.645-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="w-full border-t border-gray-200" />
            <span className="relative bg-[#faf7f2] px-3 text-xs text-gray-400 uppercase font-medium">
              or sign in with email
            </span>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#14211d]">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-[#0b3b2c] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-xs sm:text-sm text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 text-xs text-[#596b63] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#0b3b2c] focus:ring-[#0b3b2c]"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="pt-4 text-center text-[11px] text-[#708077]">
          Protected by 256-bit SSL encryption. By signing in, you agree to Glome&apos;s{' '}
          <Link to="/terms" className="underline hover:text-[#0b3b2c]">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline hover:text-[#0b3b2c]">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
