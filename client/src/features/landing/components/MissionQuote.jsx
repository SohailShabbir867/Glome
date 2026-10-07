import { Quote } from 'lucide-react';

export default function MissionQuote() {
  return (
    <section className="bg-[#faf7f2] border-y border-[#e8e4db] py-14 sm:py-18 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-4 text-[#cf7a3a]/40">
          <Quote className="h-8 w-8 rotate-180" />
        </div>
        <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#14211d] leading-relaxed">
          &ldquo;Our mission is to make timeless style and handcrafted footwear effortless for
          everyone &mdash; sustainably made, priced honestly, and built to last a lifetime.&rdquo;
        </blockquote>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#cf7a3a]">
          <span>&mdash; The Glome Philosophy &mdash;</span>
        </div>
      </div>
    </section>
  );
}
