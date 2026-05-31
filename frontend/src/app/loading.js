export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream/80 backdrop-blur-sm">
      <div className="relative">
        {/* Bouncing Ice Cream */}
        <div className="text-6xl animate-bounce drop-shadow-xl relative z-10">
          🍦
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full animate-pulse" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-primary font-[family-name:var(--font-heading)] tracking-wide">
        Scooping up something sweet...
      </h2>
      <p className="text-sm text-text-secondary mt-1">
        Please wait a moment
      </p>
    </div>
  );
}
