export function PageLoader({ label = "Initializing SynapseCRM…" }) {
  return (
    <div className="min-h-screen w-full grid place-items-center bg-neutral-950">
      <div className="relative w-[420px] max-w-[92vw] overflow-hidden rounded-[28px] border border-neutral-800 bg-neutral-950/80 p-8 shadow-2xl">
        {/* Ambient animated blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl animate-[float_5s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl animate-[float_6s_ease-in-out_infinite]" />

        {/* Top subtle shine */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />

        <div className="relative flex flex-col items-center">
          {/* Premium spinner */}
          <div className="relative h-20 w-20">
            {/* conic ring */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,theme(colors.indigo.400),theme(colors.cyan.300),theme(colors.purple.400),theme(colors.indigo.400))] animate-spin [animation-duration:1.2s]" />
            {/* ring cutout */}
            <div className="absolute inset-[6px] rounded-full bg-neutral-950" />
            {/* inner pulse */}
            <div className="absolute inset-[18px] rounded-full bg-neutral-900 border border-neutral-800 shadow-inner animate-pulse" />
            {/* tiny dot orbit */}
            <div className="absolute inset-0 animate-spin [animation-duration:1.2s]">
              <div className="absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-neutral-100 shadow-[0_0_18px_rgba(255,255,255,0.35)]" />
            </div>
          </div>

          {/* Brand text */}
          <div className="mt-6 text-center">
            <div className="text-3xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent animate-[shimmer_2.2s_linear_infinite] [background-size:200%_100%]">
                SynapseCRM
              </span>
            </div>
            <div className="mt-2 text-sm text-neutral-400">{label}</div>
          </div>

          {/* Progress sweep */}
          <div className="mt-6 w-full">
            <div className="h-2 w-full overflow-hidden rounded-full border border-neutral-800 bg-neutral-900">
              <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-indigo-300 via-cyan-200 to-purple-300 animate-[loader_1.25s_ease-in-out_infinite]" />
            </div>

            {/* little status dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 animate-bounce [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 animate-bounce [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 animate-bounce" />
            </div>
          </div>
        </div>

        {/* keyframes */}
        <style>{`
          @keyframes loader {
            0% { transform: translateX(-120%); opacity: .65; }
            60% { opacity: 1; }
            100% { transform: translateX(320%); opacity: .65; }
          }
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          @keyframes float {
            0%,100% { transform: translate(0,0); }
            50% { transform: translate(18px, 14px); }
          }
        `}</style>
      </div>
    </div>
  );
}
