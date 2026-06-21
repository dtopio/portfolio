export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute -top-48 left-1/2 h-144 w-xl -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
      <div className="absolute top-1/3 -left-40 h-112 w-md rounded-full bg-sky-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-120 w-120 rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
