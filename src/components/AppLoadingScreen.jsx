const shimmerKeyframes = `
@keyframes portfolio-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes portfolio-pulse {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
}
`;

const shimmerStyle = {
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.04) 100%)",
  backgroundSize: "200% 100%",
  animation: "portfolio-shimmer 1.6s ease-in-out infinite",
};

const DesktopSkeleton = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col bg-[#1a1a1a]">
    <div className="flex h-7 items-center justify-between border-b border-white/10 px-4">
      <div
        className="h-2.5 w-28 rounded-full"
        style={shimmerStyle}
        aria-hidden="true"
      />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="size-2.5 rounded-full bg-white/10"
            style={{ animation: "portfolio-pulse 1.4s ease-in-out infinite" }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>

    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
      <div
        className="h-4 w-48 max-w-[70vw] rounded-full"
        style={shimmerStyle}
        aria-hidden="true"
      />
      <div
        className="h-16 w-72 max-w-[85vw] rounded-2xl"
        style={shimmerStyle}
        aria-hidden="true"
      />
      <p
        className="text-sm font-medium tracking-wide text-white/40"
        style={{ animation: "portfolio-pulse 1.8s ease-in-out infinite" }}
      >
        Loading portfolio…
      </p>
    </div>

    <div className="flex justify-center gap-3 pb-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="size-11 rounded-2xl bg-white/8"
          style={{
            ...shimmerStyle,
            animationDelay: `${i * 0.08}s`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  </div>
);

const MobileSkeleton = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col bg-black">
    <div className="flex items-center justify-between px-6 pt-3 pb-1">
      <div className="h-4 w-10 rounded bg-white/15" aria-hidden="true" />
      <div className="flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-3 w-3 rounded-sm bg-white/15" aria-hidden="true" />
        ))}
      </div>
    </div>

    <div className="flex flex-1 flex-col px-6 pt-8">
      <div
        className="mb-2 h-7 w-56 rounded-lg"
        style={shimmerStyle}
        aria-hidden="true"
      />
      <div
        className="mb-10 h-4 w-40 rounded-lg"
        style={shimmerStyle}
        aria-hidden="true"
      />

      <div className="grid grid-cols-3 gap-6 mb-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className="size-[60px] rounded-[14px]"
              style={shimmerStyle}
              aria-hidden="true"
            />
            <div className="h-2 w-12 rounded bg-white/10" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-center gap-5 px-6 pb-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="size-14 rounded-2xl bg-white/8"
          style={shimmerStyle}
          aria-hidden="true"
        />
      ))}
    </div>

    <p
      className="pb-4 text-center text-xs font-medium text-white/35"
      style={{ animation: "portfolio-pulse 1.8s ease-in-out infinite" }}
    >
      Loading portfolio…
    </p>
  </div>
);

const AppLoadingScreen = ({ variant = "desktop" }) => (
  <>
    <style>{`
      ${shimmerKeyframes}
      @media (prefers-reduced-motion: reduce) {
        [style*="portfolio-shimmer"], [style*="portfolio-pulse"] {
          animation: none !important;
        }
      }
    `}</style>
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Abdu Alim portfolio"
    >
      {variant === "mobile" ? <MobileSkeleton /> : <DesktopSkeleton />}
    </div>
  </>
);

export default AppLoadingScreen;
