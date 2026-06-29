import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { linkedInRecommendation } from "#constants/recommendation";

const RecommendationToast = ({ onClose, topOffset = "52px" }) => {
  const [visible, setVisible] = useState(false);
  const { author, date, quote, profileUrl } = linkedInRecommendation;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: topOffset,
        right: "16px",
        left: topOffset === "52px" ? undefined : "16px",
        zIndex: 99999,
        width: topOffset === "52px" ? "340px" : "auto",
        maxWidth: "420px",
        marginLeft: topOffset === "52px" ? undefined : "auto",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
      }}
    >
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
        <div className="bg-[#0A66C2] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
            <span className="text-white text-xs font-semibold">
              LinkedIn Recommendation
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close recommendation"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={author.image}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#0A66C2]"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-12 h-12 rounded-full bg-[#0A66C2] text-white text-sm font-bold items-center justify-center border-2 border-[#0A66C2]"
                style={{ display: "none" }}
              >
                {author.initials}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                {author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-tight line-clamp-2">
                {author.title}
              </p>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">
                {date}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-zinc-700" />

          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>

          <a
            href={profileUrl}
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
