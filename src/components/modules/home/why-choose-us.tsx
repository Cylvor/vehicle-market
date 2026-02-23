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
    <section className="relative overflow-hidden py-24 bg-[#0a0a0a] text-white">
      {/* Background Glows - Deep Premium Look */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-md" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-md" />

      <div className="container px-6 mx-auto max-w-7xl relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              Premium Experience
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">CHOOSE US?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {POINTS.map((point, i) => (
            <div
              key={point.title}
              className="group relative p-[1px] rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Border Gradient - Hover wenakota paththu wenawa */}
              <div className={`absolute inset-0 bg-gradient-to-br ${point.accent} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative h-full bg-[#121212] rounded-[31px] p-8 flex flex-col items-start">
                {/* Icon Glass Container */}
                <div className="mb-8 relative">
                    <div className={`absolute inset-0 blur-xl opacity-20 bg-gradient-to-r ${point.accent}`} />
                    <div className="relative h-14 w-14 rounded-md bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:border-white/20 transition-colors">
                        <point.icon className="h-7 w-7 text-white" />
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                  {point.title}
                </h3>
                <p className="text-gray-400 text-[15px] leading-relaxed group-hover:text-gray-300 transition-colors">
                  {point.description}
                </p>

                {/* Bottom Decorative Line */}
                <div className={`mt-auto pt-6 w-0 group-hover:w-full h-[2px] bg-gradient-to-r ${point.accent} transition-all duration-700`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}