export function SubscribeBox() {
  return (
    <div className="bg-accent text-white p-8 rounded-sm">
      <h3 className="text-2xl font-merriweather font-black mb-4 uppercase tracking-tight">
        Stay Connected
      </h3>
      <p className="text-white/70 font-raleway text-sm font-bold mb-6 leading-relaxed">
        Get the latest news and community updates delivered straight to
        your inbox every Thursday.
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Your email address"
          className="bg-white/10 border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors font-raleway font-bold placeholder:text-white/50 text-white"
        />
        <button className="bg-accent-gold text-white py-3 font-black uppercase tracking-widest text-[13px] hover:bg-accent-gold-hover transition-colors font-raleway">
          Subscribe Free
        </button>
      </div>
    </div>
  );
}
