import { useEffect, useState } from "react";
import { X } from "lucide-react";

const RecommendationToast = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // slight delay so the animation feels natural
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // wait for fade out before unmounting
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "52px", // just below the navbar
        right: "16px",
        zIndex: 99999,
        width: "340px",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
      }}
    >
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
        
        {/* LinkedIn-style header */}
        <div className="bg-[#0A66C2] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
            <span className="text-white text-xs font-semibold">LinkedIn Recommendation</span>
          </div>
          <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Card body */}
        <div className="p-4 space-y-3">
          
          {/* Profile row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src="/images/josh.jpg"
                alt="Josh Schumacher"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#0A66C2]"
                onError={(e) => {
                  // fallback to initials avatar if image not found
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Initials fallback */}
              <div
                className="w-12 h-12 rounded-full bg-[#0A66C2] text-white text-sm font-bold items-center justify-center border-2 border-[#0A66C2]"
                style={{ display: "none" }}
              >
                JS
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                Josh Schumacher
              </p>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-tight line-clamp-2">
                Co-Founder & CTO at Envia | Ex-Snap Engineering Leader
              </p>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">
                February 2, 2026 · Managed Abdu Alim directly
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-zinc-700" />

          {/* Recommendation text */}
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            "It was a pleasure working with Abdu at Envia. He made a significant impact by
            co-designing our RevenueCat integration for payments, handling the full
            end-to-end lifecycle alongside a senior engineer. He is an engineer who doesn't
            just stick to what he knows — he actively seeks out opportunities to learn, which
            he proved by successfully taking on mobile app development tasks outside of his
            primary backend focus. He completes his work efficiently and brings a positive,
            ambitious energy to the team. I'm excited to see the impact he makes in his
            future roles!"
          </p>

          {/* LinkedIn link */}
          <a
            href="https://www.linkedin.com/in/arlikhozhaev/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs text-[#0A66C2] dark:text-blue-400 font-semibold hover:underline pt-1"
          >
            View on LinkedIn →
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecommendationToast;
