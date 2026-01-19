import { WPMedia } from "@/app/types";

export function FrontPagePreview({ media }: { media: WPMedia | null }) {
  if (!media) return null;

  const pdfUrl = media.source_url;

  return (
    <div className="bg-white border border-gray-200 p-4 shadow-sm flex flex-col items-center">
      <div className="text-center mb-4">
        <h2 className="text-xl font-merriweather font-black uppercase tracking-tight">
          Today's Paper
        </h2>
        <p className="text-[10px] font-raleway font-bold text-gray-500 uppercase tracking-widest mt-1">
          {new Date(media.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full aspect-[1/1.4] block group overflow-hidden border border-gray-300 shadow-md hover:shadow-xl transition-shadow bg-gray-50"
      >
        {/* We embed the PDF directly. The #toolbar=0 hides the PDF controls */}
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          className="w-full h-full pointer-events-none"
          title="Front Page Preview"
          loading="lazy"
        />

        {/* Overlay to make it feel like a button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <div className="bg-black text-white px-4 py-2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
            Open Full PDF
          </div>
        </div>
      </a>

      <div className="w-full flex flex-col gap-2 mt-4">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-black text-white text-center py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          View Full Screen
        </a>
        <a
          href={pdfUrl}
          download
          className="w-full border border-gray-300 bg-white text-black text-center py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
