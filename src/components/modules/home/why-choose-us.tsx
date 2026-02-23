import { BadgeCheck, ShieldCheck, Zap, Clock3 } from "lucide-react";
import { motion } from "framer-motion"; // Optional: Animation walata

const POINTS = [
  {
    title: "Verified Sellers",
    description: "Each seller profile is reviewed to keep listings reliable.",
    icon: BadgeCheck,
    accent: "from-blue-500 to-cyan-400",
  },
  {
    title: "Secure Messaging",
    description: "Connect with sellers privately before sharing personal details.",
    icon: ShieldCheck,
    accent: "from-emerald-500 to-teal-400",
  },
  {
    title: "Fast Listing Flow",
    description: "Create and publish your vehicle listing in a few minutes.",
    icon: Zap,
    accent: "from-orange-500 to-yellow-400",
  },
  {
    title: "Always Up-to-date",
    description: "Daily updates keep new cars and pricing insights fresh.",
    icon: Clock3,
    accent: "from-purple-500 to-pink-400",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-white text-slate-900 border-t border-slate-200/60 overflow-hidden">
      {/* Background Ambient styling (Subtle for light mode) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-md pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50/50 blur-[120px] rounded-md pointer-events-none" />

      <div className="container-width px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Choose Us?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
          {POINTS.map((point) => (
            <div
              key={point.title}
              className="group relative bg-white border border-slate-200 rounded-md p-10 flex flex-col items-start transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden"
            >
              {/* Icon */}
              <div className="mb-10 text-blue-600 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-indigo-600">
                <point.icon className="h-14 w-14 stroke-[1.5]" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                {point.title}
              </h3>
              <p className="text-slate-500 text-base leading-relaxed">
                {point.description}
              </p>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}