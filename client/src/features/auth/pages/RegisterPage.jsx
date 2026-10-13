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
  User,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { setCredentials } from '@/features/auth/authSlice';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service to create an account.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newUser = {
        id: 'usr-' + Date.now(),
        name,
        email,
        role: 'customer',
      };
      dispatch(
        setCredentials({
          user: newUser,
          accessToken: 'mock-jwt-token-' + Date.now(),
        })
      );
      navigate('/');
    }, 900);
  };

  return (
    <div className="min-h-screen flex bg-[#faf7f2]">
      {/* Left Column: Brand & Lifestyle Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0b3b2c] overflow-hidden text-white flex-col justify-between p-12 xl:p-16">
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

        {/* Center: Editorial Perks */}
        <div className="relative z-10 max-w-lg space-y-5">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#dce7e2]">
            Member Privileges
          </span>
          <h2 className="font-serif text-3xl xl:text-4xl font-bold leading-tight text-white">
            Unlock Seamless Style &amp; Exclusive Member Perks
          </h2>

          <div className="space-y-3 text-sm text-[#dce7e2] pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#cf7a3a] shrink-0 mt-0.5" />
              <span>Early access to limited footwear drops and seasonal private sales</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#cf7a3a] shrink-0 mt-0.5" />
              <span>Fast one-click checkout with saved addresses and measurement profiles</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#cf7a3a] shrink-0 mt-0.5" />
              <span>Complimentary express delivery and priority concierge support</span>
            </div>
          </div>
        </div>

        {/* Bottom: Guarantee */}
        <div className="relative z-10 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-[#dce7e2]">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-[#cf7a3a]" />
            <span>Free Express Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-[#cf7a3a]" />
            <span>Easy 30-Day Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#cf7a3a]" />
            <span>Ethically Certified</span>
          </div>
        </div>
      </div>

      {/* Right Column: Register Form */}
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
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#0b3b2c] hover:underline">
              Sign In
            </Link>
          </span>
        </div>

        {/* Center Container */}
        <div className="mx-auto w-full max-w-md py-6 space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-serif text-3xl font-bold text-[#14211d]">Create an Account</h1>
            <p className="text-xs sm:text-sm text-[#596b63]">
              Join Glome today for exclusive rewards and fast personalized shopping.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sohail Shabbir"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none transition-all"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
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

              {/* Strength Meter */}
              {password && (
                <div className="pt-2 space-y-1">
                  <div className="flex h-1.5 w-full rounded-full bg-gray-200 overflow-hidden gap-1">
                    <div
                      className={`h-full rounded-full transition-all ${
                        strength >= 1
                          ? strength === 1
                            ? 'bg-rose-500 w-1/4'
                            : strength === 2
                              ? 'bg-amber-500 w-2/4'
                              : strength === 3
                                ? 'bg-emerald-500 w-3/4'
                                : 'bg-emerald-600 w-full'
                          : 'w-0'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500">
                    Strength:{' '}
                    {strength <= 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#14211d] mb-1.5">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#0b3b2c] focus:ring-[#0b3b2c] mt-0.5"
              />
              <label htmlFor="terms" className="text-xs text-[#596b63] leading-relaxed cursor-pointer">
                I agree to Glome&apos;s{' '}
                <Link to="/terms" className="underline font-semibold text-[#14211d]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="underline font-semibold text-[#14211d]">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span>Creating your account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="pt-4 text-center text-[11px] text-[#708077]">
          &copy; {new Date().getFullYear()} Glome Online Mall. All rights reserved.
        </div>
      </div>
    </div>
  );
}
